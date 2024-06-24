import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaPlus, FaSearch, FaBox, FaPercentage, FaFileAlt, FaAlignLeft, FaDollarSign, FaTag, FaSort, FaSortAlphaDown, FaSortNumericDown, FaCalendarAlt } from 'react-icons/fa';
import { StyledModal } from '../../components/Modal';
import ServiceCard from '../../components/Service/Service';
import Swal from 'sweetalert2';
import currencySymbolMap from 'currency-symbol-map';
import ServiciosPorUsuario from '../../components/ServiciosPorUsuario/ServiciosPorUsuario'; // Importa el componente
import currencyCodes from 'currency-codes';
import {
    Container,
    Header,
    Title,
    SearchContainer,
    Search,
    AddServiceButton,
    Content,
    ListContainer,
    Form,
    Label,
    Input,
    TextArea,
    Select,
    Checkbox,
    CheckboxLabel,
    Button,
    Section,
    Error,
    InputGroup,
    InputIconWrapper,
    IconWrapper,
    ServiceSelection,
    ServiceItem,
    ServiceSearchInput,
    ServiceList,
    ServiceQuantityInput,
    EditPackageButton,
    Footer,
    FilterButton,
    FilterMenuContainer,
    FilterMenuItem, TabBar, TabContent, Tab
} from './GestionServiciosStyle';
import { API_BASE_URL } from "../../utils/config";
import { useSede } from "../../context/SedeContext";

const GestionServicios = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [moneda, setMoneda] = useState('Q'); // Moneda por defecto
    const [nombreMoneda, setNombreMoneda] = useState('Guatemalan Quetzal'); // Nombre de la moneda por defecto
    const [porcentajeImpuesto, setPorcentajeImpuesto] = useState(''); // Estado para el impuesto
    const [oferta, setOferta] = useState(false);
    const [descuento, setDescuento] = useState('');
    const [paquete, setPaquete] = useState(false);
    const [cantidadServicios, setCantidadServicios] = useState({});
    const [error, setError] = useState('');
    const [servicios, setServicios] = useState([]);
    const [paquetes, setPaquetes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editServiceId, setEditServiceId] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [serviceSearchTerm, setServiceSearchTerm] = useState('');
    const [packageModalOpen, setPackageModalOpen] = useState(false);
    const [aplicaCita, setAplicaCita] = useState(false);
    const [sortOrder, setSortOrder] = useState(''); // Filtro de ordenación
    const [filterMenuOpen, setFilterMenuOpen] = useState(false); // Estado para abrir/cerrar menú de filtro
    const [activeTab, setActiveTab] = useState('gestionServicios');

    // Referencia para el botón de añadir servicio y el botón de filtrado
    const addServiceButtonRef = useRef(null);
    const filterButtonRef = useRef(null);
    const filterMenuRef = useRef(null);
    const { idSedeActual } = useSede();

    // Fetch functions
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/gestionDeNegocios/servicios`, {
                params: { idSede: idSedeActual }
            });

            const formattedServices = response.data.map(service => ({
                id: service.ID_SERVICIO,
                titulo: service.TITULO,
                descripcion: service.DESCRIPCION,
                precio: service.PRECIO,
                moneda: service.MONEDA,
                nombreMoneda: service.NOMBRE_MONEDA,
                porcentajeImpuesto: service.PORCENTAJE_IMPUESTO,
                oferta: !!service.OFERTA,
                descuento: service.DESCUENTO,
                aplicaCita: !!service.APLICA_CITA,
                fechaModificacion: moment(service.FECHA_MODIFICACION).format('DD/MM/YYYY') // Formatear fecha con moment
            }));

            setServicios(formattedServices);
        } catch (err) {
            console.error(err);
            setError('Error al obtener los servicios');
        }
    };

    const fetchPaquetes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/gestionDeNegocios/paquetes`, {
                params: { idSede: idSedeActual }
            });

            const formattedPaquetes = response.data.map(paquete => ({
                id: paquete.ID_PAQUETE,
                titulo: paquete.TITULO,
                descripcion: paquete.DESCRIPCION,
                precio: paquete.PRECIO,
                moneda: paquete.MONEDA,
                nombreMoneda: paquete.NOMBRE_MONEDA,
                porcentajeImpuesto: paquete.PORCENTAJE_IMPUESTO,
                fechaModificacion: moment(paquete.FECHA_MODIFICACION).format('DD/MM/YYYY'), // Formatear fecha con moment
                servicios: paquete.servicios.map(servicio => ({
                    idServicio: servicio.idServicio,
                    titulo: servicio.titulo,
                    descripcion: servicio.descripcion,
                    precio: servicio.precio,
                    moneda: servicio.moneda,
                    nombreMoneda: servicio.nombreMoneda,
                    cantidad: servicio.cantidad
                }))
            }));

            setPaquetes(formattedPaquetes);
        } catch (err) {
            console.error(err);
            setError('Error al obtener los paquetes');
        }
    };

    useEffect(() => {
        if (idSedeActual) {
            fetchServices();
            fetchPaquetes();
        }
        document.addEventListener('mousedown', handleClickOutsideFilterMenu);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideFilterMenu);
        };
    }, [idSedeActual]); // Actualizar cuando `idSedeActual` cambie

    const handleClickOutsideFilterMenu = (event) => {
        if (filterMenuRef.current && !filterMenuRef.current.contains(event.target) && !filterButtonRef.current.contains(event.target)) {
            setFilterMenuOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!titulo || !precio) {
            setError('Los campos Título y Precio son obligatorios');
            return;
        }

        const selectedCurrency = getCurrencyOptions().find(option => option.symbol === moneda);

        const nuevoServicio = {
            idSede: idSedeActual,
            titulo,
            descripcion,
            precio,
            moneda: selectedCurrency.symbol,
            nombreMoneda: selectedCurrency.name,
            porcentajeImpuesto,
            oferta,
            descuento,
            paquete,
            aplicaCita: !paquete && aplicaCita,
            servicios: Object.entries(cantidadServicios).map(([idServicio, cantidad]) => ({
                idServicio,
                cantidad
            }))
        };

        try {
            if (editServiceId !== null) {
                if (paquete) {
                    await axios.put(`${API_BASE_URL}/gestionDeNegocios/paquetes/${editServiceId}`, nuevoServicio);
                } else {
                    await axios.put(`${API_BASE_URL}/gestionDeNegocios/servicios/${editServiceId}`, nuevoServicio);
                }
                Swal.fire({
                    title: 'Actualizado',
                    text: 'Servicio actualizado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            } else {
                if (paquete) {
                    await axios.post(`${API_BASE_URL}/gestionDeNegocios/paquetes`, nuevoServicio);
                } else {
                    await axios.post(`${API_BASE_URL}/gestionDeNegocios/servicios`, nuevoServicio);
                }
                Swal.fire({
                    title: 'Creado',
                    text: 'Servicio creado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
            resetForm();
            fetchServices();
            fetchPaquetes();
        } catch (err) {
            console.error(err);
            setError('Error al guardar el servicio');
        }
    };

    const resetForm = () => {
        setTitulo('');
        setDescripcion('');
        setPrecio('');
        setMoneda('Q');
        setNombreMoneda('Guatemalan Quetzal');
        setPorcentajeImpuesto('');
        setOferta(false);
        setDescuento('');
        setPaquete(false);
        setCantidadServicios({});
        setError('');
        setAplicaCita(false);
        setModalOpen(false);
        setEditServiceId(null);
    };

    const handleEdit = (id, isPaquete) => {
        if (isPaquete) {
            const paquete = paquetes.find(paquete => paquete.id === id);
            if (!paquete) return;

            const currencyOption = getCurrencyOptions().find(option => option.name === paquete.nombreMoneda);
            if (!currencyOption) return;

            setTitulo(paquete.titulo);
            setDescripcion(paquete.descripcion);
            setPrecio(paquete.precio);
            setMoneda(currencyOption.symbol);
            setNombreMoneda(paquete.nombreMoneda);
            setPorcentajeImpuesto(paquete.porcentajeImpuesto);
            setPaquete(true);
            setCantidadServicios(paquete.servicios.reduce((acc, { idServicio, cantidad }) => {
                acc[idServicio] = cantidad;
                return acc;
            }, {}));
            setAplicaCita(false);
        } else {
            const servicio = servicios.find(servicio => servicio.id === id);
            if (!servicio) return;

            const currencyOption = getCurrencyOptions().find(option => option.name === servicio.nombreMoneda);
            if (!currencyOption) return;

            setTitulo(servicio.titulo);
            setDescripcion(servicio.descripcion);
            setPrecio(servicio.precio);
            setMoneda(currencyOption.symbol);
            setNombreMoneda(servicio.nombreMoneda);
            setPorcentajeImpuesto(servicio.porcentajeImpuesto);
            setOferta(servicio.oferta);
            setDescuento(servicio.descuento);
            setPaquete(false);
            setCantidadServicios({});
            setAplicaCita(servicio.aplicaCita);
        }
        setModalOpen(true);
        setEditServiceId(id);
    };

    const handleDelete = (id, isPaquete) => {
        setConfirmDelete(true);
        setEditServiceId(id);
        setPaquete(isPaquete);
    };

    const confirmDeleteService = async () => {
        try {
            if (paquete) {
                await axios.delete(`${API_BASE_URL}/gestionDeNegocios/paquetes/${editServiceId}`);
            } else {
                await axios.delete(`${API_BASE_URL}/gestionDeNegocios/servicios/${editServiceId}`);
            }
            Swal.fire({
                title: 'Eliminado',
                text: 'Servicio eliminado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            setConfirmDelete(false);
            fetchServices();
            fetchPaquetes();
        } catch (err) {
            console.error(err);
            setError('Error al eliminar el servicio');
        }
    };

    const cancelDeleteService = () => {
        setConfirmDelete(false);
        setEditServiceId(null);
    };

    const handleServiceChange = (id, value) => {
        setCantidadServicios((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handlePackageEdit = (e) => {
        e.preventDefault();
        setPackageModalOpen(true);
    };

    const handleAddServiceClick = () => {
        resetForm();
        setModalOpen(true);
    };

    const sortServices = (services, order) => {
        if (order === 'title') {
            return [...services].sort((a, b) => a.titulo.localeCompare(b.titulo));
        } else if (order === 'price') {
            return [...services].sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
        } else if (order === 'date') {
            return [...services].sort((a, b) => moment(b.fechaModificacion) - moment(a.fechaModificacion));
        } else {
            return services;
        }
    };

    const sortedIndividualServices = sortServices(
        servicios,
        sortOrder
    );

    const sortedPackageServices = sortServices(
        paquetes,
        sortOrder
    );

    const toggleFilterMenu = () => {
        setFilterMenuOpen(!filterMenuOpen);
    };

    const applySortOrder = (order) => {
        setSortOrder(order);
        setFilterMenuOpen(false);
    };

    const getCurrencyOptions = () => {
        const currencies = currencyCodes.codes();
        return currencies.map(code => {
            const currency = currencyCodes.code(code);
            const symbol = currencySymbolMap(code);
            return {
                code,
                name: currency.currency,
                symbol
            };
        });
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <Container>
            <Header>
                <Title>Servicios</Title>
                {activeTab === 'gestionServicios' && (
                    <>

                        <div style={{ position: 'relative' }}>
                            <AddServiceButton ref={addServiceButtonRef} onClick={handleAddServiceClick}>
                                <FaPlus />
                            </AddServiceButton>
                            <FilterButton ref={filterButtonRef} onClick={toggleFilterMenu}>
                                <FaSort />
                            </FilterButton>
                            {filterMenuOpen && (
                                <FilterMenuContainer ref={filterMenuRef} style={{ top: filterButtonRef.current?.getBoundingClientRect().bottom }}>
                                    <FilterMenuItem
                                        onClick={() => applySortOrder('title')}
                                        active={sortOrder === 'title'}
                                    >
                                        <FaSortAlphaDown /> Título
                                    </FilterMenuItem>
                                    <FilterMenuItem
                                        onClick={() => applySortOrder('price')}
                                        active={sortOrder === 'price'}
                                    >
                                        <FaSortNumericDown /> Precio
                                    </FilterMenuItem>
                                    <FilterMenuItem
                                        onClick={() => applySortOrder('date')}
                                        active={sortOrder === 'date'}
                                    >
                                        <FaCalendarAlt /> Fecha de Modificación
                                    </FilterMenuItem>
                                </FilterMenuContainer>
                            )}
                        </div>
                    </>
                )}
            </Header>
            <TabBar>
                <Tab
                    active={activeTab === 'serviciosPorUsuario'}
                    onClick={() => handleTabChange('serviciosPorUsuario')}
                >
                    Servicios por Usuario
                </Tab>
                <Tab
                    active={activeTab === 'gestionServicios'}
                    onClick={() => handleTabChange('gestionServicios')}
                >
                    Gestión de Servicios
                </Tab>
            </TabBar>
            <TabContent>
                {activeTab === 'serviciosPorUsuario' ? (
                    <ServiciosPorUsuario />
                ) : (
                    <div>
                        <SearchContainer>
                            <FaSearch />
                            <Search
                                type="text"
                                placeholder="Buscar servicio..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </SearchContainer>
                        <Title>Servicios Individuales</Title>
                        <ListContainer>
                            {servicios
                                .filter((servicio) =>
                                    servicio.titulo.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((servicio) => (
                                    <ServiceCard
                                        key={servicio.id}
                                        servicio={servicio}
                                        onEdit={() => handleEdit(servicio.id, false)}
                                        onDelete={() => handleDelete(servicio.id, false)}
                                    />
                                ))}
                        </ListContainer>

                        <Title>Paquetes</Title>
                        <ListContainer>
                            {paquetes
                                .filter((paquete) =>
                                    paquete.titulo.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((paquete) => (
                                    <ServiceCard
                                        key={paquete.id}
                                        servicio={paquete}
                                        onEdit={() => handleEdit(paquete.id, true)}
                                        onDelete={() => handleDelete(paquete.id, true)}
                                    />
                                ))}
                        </ListContainer>
                    </div>
                )}
            </TabContent>
            <StyledModal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                width="800px"
                maxWidth="90%"
                height="70%"
                flexDirection="column"
            >
                <Form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {error && <Error>{error}</Error>}
                    <Section>
                        <Label>
                            <IconWrapper>
                                <FaFileAlt />
                            </IconWrapper>
                            Título del {paquete ? 'Paquete' : 'Servicio'}:
                        </Label>
                        <InputIconWrapper>
                            <Input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                placeholder="Ingrese el título"
                            />
                        </InputIconWrapper>
                    </Section>
                    <Section>
                        <Label>
                            <IconWrapper>
                                <FaAlignLeft />
                            </IconWrapper>
                            Descripción:
                        </Label>
                        <InputIconWrapper>
                            <TextArea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder={`Describa el ${paquete ? 'paquete' : 'servicio'}`}
                            />
                        </InputIconWrapper>
                    </Section>
                    <InputGroup>
                        <Section>
                            <Label>
                                <IconWrapper>
                                    <FaDollarSign />
                                </IconWrapper>
                                Precio:
                            </Label>
                            <InputIconWrapper>
                                <Input
                                    type="number"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    placeholder="Ingrese el precio"
                                />
                            </InputIconWrapper>
                        </Section>
                        <Section>
                            <Label>
                                <IconWrapper>
                                    <FaDollarSign />
                                </IconWrapper>
                                Moneda:
                            </Label>
                            <InputIconWrapper>
                                <Select
                                    value={moneda}
                                    onChange={(e) => {
                                        const selectedOption = getCurrencyOptions().find(option => option.symbol === e.target.value);
                                        setMoneda(selectedOption.symbol);
                                        setNombreMoneda(selectedOption.name);
                                    }}
                                    style={{ paddingRight: '20px' }}
                                >
                                    {getCurrencyOptions().map(({ code, name, symbol }) => (
                                        <option key={code} value={symbol}>
                                            {symbol} - {name} ({code})
                                        </option>
                                    ))}
                                </Select>
                            </InputIconWrapper>
                        </Section>
                        <Section>
                            <Label>
                                <IconWrapper>
                                    <FaTag />
                                </IconWrapper>
                                Impuesto (%):
                            </Label>
                            <InputIconWrapper>
                                <Input
                                    type="number"
                                    value={porcentajeImpuesto}
                                    onChange={(e) => setPorcentajeImpuesto(e.target.value)}
                                    placeholder="Ingrese el porcentaje de impuesto"
                                    step="0.01"
                                />
                            </InputIconWrapper>
                        </Section>
                    </InputGroup>
                    <InputGroup>
                        <Section>
                            <CheckboxLabel>
                                <Checkbox
                                    type="checkbox"
                                    checked={oferta}
                                    onChange={(e) => setOferta(e.target.checked)}
                                />
                                <IconWrapper>
                                    <FaPercentage />
                                </IconWrapper>
                                Aplica a oferta
                            </CheckboxLabel>
                            {oferta && (
                                <InputIconWrapper>
                                    <Input
                                        type="number"
                                        placeholder="Porcentaje de Descuento"
                                        value={descuento}
                                        onChange={(e) => setDescuento(e.target.value)}
                                    />
                                </InputIconWrapper>
                            )}
                        </Section>
                        <Section>
                            <CheckboxLabel>
                                <Checkbox
                                    type="checkbox"
                                    checked={aplicaCita}
                                    onChange={(e) => setAplicaCita(e.target.checked)}
                                    disabled={paquete}
                                />
                                <IconWrapper>
                                    <FaTag />
                                </IconWrapper>
                                Aplica a cita
                            </CheckboxLabel>
                        </Section>
                        <Section>
                            <CheckboxLabel>
                                <Checkbox
                                    type="checkbox"
                                    checked={paquete}
                                    onChange={(e) => {
                                        setPaquete(e.target.checked);
                                        if (e.target.checked) {
                                            setAplicaCita(false);
                                        }
                                    }}
                                />
                                <IconWrapper>
                                    <FaBox />
                                </IconWrapper>
                                Paquete de Servicios
                            </CheckboxLabel>
                            {paquete && (
                                <>
                                    <EditPackageButton onClick={handlePackageEdit}>
                                        Editar Servicios del Paquete
                                    </EditPackageButton>
                                </>
                            )}
                        </Section>
                    </InputGroup>
                    <Footer>
                        <Button type="submit">Guardar {paquete ? 'Paquete' : 'Servicio'}</Button>
                    </Footer>
                </Form>
            </StyledModal>
            {confirmDelete && (
                <StyledModal
                    isOpen={confirmDelete}
                    onRequestClose={cancelDeleteService}
                    width="300px"
                    maxWidth="90%"
                >
                    <p>¿Estás seguro que deseas eliminar este {paquete ? 'paquete' : 'servicio'}?</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={confirmDeleteService}>Sí, eliminar</Button>
                        <Button onClick={cancelDeleteService}>Cancelar</Button>
                    </div>
                </StyledModal>
            )}
            {packageModalOpen && (
                <StyledModal
                    isOpen={packageModalOpen}
                    onRequestClose={() => setPackageModalOpen(false)}
                    width="500px"
                    maxWidth="90%"
                    height="70%"
                >
                    <Form>
                        <Section>
                            <ServiceSearchInput
                                type="text"
                                placeholder="Buscar servicio..."
                                value={serviceSearchTerm}
                                onChange={(e) => setServiceSearchTerm(e.target.value)}
                            />
                        </Section>
                        <ServiceSelection style={{ flex: '1 1 auto' }}>
                            <ServiceList>
                                {servicios
                                    .filter((servicio) =>
                                        servicio.titulo.toLowerCase().includes(serviceSearchTerm.toLowerCase()) &&
                                        !servicio.paquete
                                    )
                                    .map((servicio) => (
                                        <ServiceItem key={servicio.id}>
                                            <span>{servicio.titulo}</span>
                                            <ServiceQuantityInput
                                                type="number"
                                                value={cantidadServicios[servicio.id] || 0}
                                                onChange={(e) =>
                                                    handleServiceChange(
                                                        servicio.id,
                                                        parseInt(e.target.value) || 0
                                                    )
                                                }
                                                placeholder="Cantidad"
                                                min="0"
                                            />
                                        </ServiceItem>
                                    ))}
                            </ServiceList>
                        </ServiceSelection>
                        <Footer>
                            <Button
                                type="button"
                                onClick={() => setPackageModalOpen(false)}
                            >
                                Guardar
                            </Button>
                        </Footer>
                    </Form>
                </StyledModal>
            )}
        </Container>
    );
};

export default GestionServicios;
