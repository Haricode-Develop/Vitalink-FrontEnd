// IngresarPaciente.jsx
import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    Container,
    Title,
    Tabs,
    Tab,
    TabPanel,
    FormWrapper,
    Indicator,
    MobileMenuButton,
    MobileDropdown,
    MobileDropdownItem,
    DesktopTabsContainer
} from './IngresarPacienteStyle';
import { FaClipboardList, FaTimes } from 'react-icons/fa';
import FichaColumnaLumbar from '../Fichas/FichaColumnaLumbar/FichaColumnaLumbar';
import FichaColumnaToracica from '../Fichas/FichaColumnaToracica/FichaColumnaToracica';
import FichaColumnaCervical from '../Fichas/FichaColumnaCervical/FichaColumnaCervical';
import FichaExtremidadesSuperiores from '../Fichas/FichaExtremidadesSuperiores/FichaExtremidadesSuperiores';
import { toast, ToastContainer } from 'react-toastify';
import FichaExtremidadesInferiores from "../Fichas/FichaExtremidadesInferiores/FichaExtremidadesInferiores";
import ActivityFeed from "../../components/Feed/FeedActividad";
import {AuthContext} from "../../context/AuthContext";

const IngresarPaciente = () => {
    const { userData } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('columnaLumbar');
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabsRef = useRef({});
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [resetBodyMap, setResetBodyMap] = useState(false);
    const [visibleTab, setVisibleTab] = useState('columnaLumbar');

    const updateIndicator = (tabName) => {
        if (tabsRef.current && tabName) {
            const tab = tabsRef.current[tabName];
            if (tab) {
                setIndicatorStyle({
                    width: tab.offsetWidth,
                    transform: `translateX(${tab.offsetLeft}px)`,
                });
            }
        } else {

            const defaultTabName = "columnaLumbar";
            if (tabsRef.current && tabsRef.current[defaultTabName]) {
                const defaultTab = tabsRef.current[defaultTabName];
                setIndicatorStyle({
                    width: defaultTab.offsetWidth,
                    transform: `translateX(${defaultTab.offsetLeft}px)`,
                });
            }
        }
    };
    useEffect(() => {
        updateIndicator(activeTab);
    }, [activeTab]);
    const getTransformStyle = (tabName) => {
        const order = {
            columnaLumbar: 0,
            columnaToracica: 1,
            columnaCervical: 2,
            extremidadesSuperiores: 3,
        };

        const activeIndex = order[activeTab];
        const tabIndex = order[tabName];
        const translateX = (tabIndex - activeIndex) * 100;
        return { transform: `translateX(${translateX}%)` };
    };
    const toTitleCase = (str) => {
        return str
            .replace(/([A-Z])/g, ' $1') // inserta un espacio antes de las mayúsculas
            .replace(/^./, (char) => char.toUpperCase()) // convierte la primera letra en mayúscula
            .trim();
    };
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        updateIndicator(tabName);
        setDropdownVisible(false);
        setResetBodyMap(true);
        setVisibleTab(tabName);
    };

    useEffect(() => {
        if (resetBodyMap) {
            setResetBodyMap(false);
        }
    }, [resetBodyMap]);
    const isMobile = () => window.innerWidth <= 768;

    return (
        <Container>
            <MobileMenuButton onClick={() => setDropdownVisible(!isDropdownVisible)}>
                {isDropdownVisible ? <FaTimes size={24} /> : <FaClipboardList size={24} />}
            </MobileMenuButton>
            {isDropdownVisible && (
                <MobileDropdown>
                    {['columnaLumbar', 'columnaToracica', 'columnaCervical', 'extremidadesSuperiores', 'extremidadesInferiores'].map((tabName) => (
                        <MobileDropdownItem
                            key={tabName}
                            onClick={() => handleTabClick(tabName)}
                            active={activeTab === tabName}
                        >
                            {toTitleCase(tabName)}
                        </MobileDropdownItem>
                    ))}
                </MobileDropdown>
            )}
            <ToastContainer />
            <Title>Ingresar Paciente</Title>
            {!isMobile() &&(
                <Tabs ref={tabsRef} isMobile={isDropdownVisible} className={"pacienteIngresoSecciones"}>
                    {['columnaLumbar', 'columnaToracica', 'columnaCervical', 'extremidadesSuperiores', 'extremidadesInferiores'].map((tabName) => (
                        <Tab
                            key={tabName}
                            onClick={() => handleTabClick(tabName)}
                            active={activeTab === tabName}
                            isMobile={isDropdownVisible}
                        >
                            {toTitleCase(tabName)}
                        </Tab>
                    ))}
                    {!isDropdownVisible && <Indicator style={indicatorStyle} />}
                </Tabs>
            )}

            <FormWrapper>
                {activeTab === 'columnaLumbar' && visibleTab === 'columnaLumbar' && (
                    <TabPanel active><FichaColumnaLumbar resetBodyMap={resetBodyMap}/></TabPanel>
                )}
                {activeTab === 'columnaToracica' && visibleTab === 'columnaToracica' && (
                    <TabPanel active><FichaColumnaToracica resetBodyMap={resetBodyMap}/></TabPanel>
                )}
                {activeTab === 'columnaCervical' && visibleTab === 'columnaCervical' && (
                    <TabPanel active={activeTab === 'columnaCervical'}><FichaColumnaCervical key={"fichaColumnaCervical"}/></TabPanel>

                )}
                {activeTab === 'extremidadesSuperiores' && visibleTab === 'extremidadesSuperiores' && (
                    <TabPanel active={activeTab === 'extremidadesSuperiores'}><FichaExtremidadesSuperiores key={"fichaExtremidadesSuperiores"}/></TabPanel>

                )}

                {activeTab === 'extremidadesInferiores' && visibleTab === 'extremidadesInferiores' && (
                <TabPanel active={activeTab === 'extremidadesInferiores'}><FichaExtremidadesInferiores key={"extremidadesInferiores"} /></TabPanel>
                )}
            </FormWrapper>

        </Container>

    );
};





export default IngresarPaciente;
