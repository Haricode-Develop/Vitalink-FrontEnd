import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner, FaMoneyBillWave } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import {
    BillingContainer,
    BillingTitle,
    BillingForm,
    BillingInput,
    BillingButton,
    BillingLabel,
    BillingError,
    BillingSection,
    CreditCardContainer,
    CreditCard3D,
    CardDetails,
    CardNumber,
    CardHolder,
    CardExpiry,
    CardCvc,
    BillingSelect
} from './BillingStyle';
import { API_BASE_URL_BILLING_SERVICE, API_BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

// Inicializar Stripe con la clave pública
const stripePromise = loadStripe('pk_test_51Pp2jVP8m7371eZyB3dTDowrN8UCjKdrpla1DaqbOtubHf7Dogb6ukjTKBfUDAaBy81ViLhErdI3KZH7C1MROmgV00epg4sLn6');

const BillingFormComponent = () => {
    const stripe = useStripe();
    const { userData } = useContext(AuthContext);
    const elements = useElements();
    const location = useLocation(); // Usar useLocation en lugar de useNavigate
    const selectedPlan = location.state?.plan || {}; // Asegurar que recibimos el plan

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('+502');  // Iniciar con +502
    const [institutionName, setInstitutionName] = useState('');
    const [institutionAddress, setInstitutionAddress] = useState('');
    const [institutionPhone, setInstitutionPhone] = useState('');
    const [sedeName, setSedeName] = useState('');
    const [sedeAddress, setSedeAddress] = useState('');
    const [zip, setZip] = useState('');
    const [error, setError] = useState(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [institutions, setInstitutions] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Cargar las instituciones cuando el componente se monta
    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/general/instituciones`);
                const data = await response.json();
                setInstitutions(data);
            } catch (error) {
                console.error('Error fetching institutions:', error);
            }
        };

        fetchInstitutions();
    }, []);

    const handleInstitutionChange = async (e) => {
        const selectedInstitution = institutions.find(inst => inst.ID_INSTITUCION === parseInt(e.target.value));
        if (selectedInstitution) {
            setInstitutionName(selectedInstitution.NOMBRE);
            setInstitutionAddress(selectedInstitution.DIRECCION || '');
            setInstitutionPhone(selectedInstitution.TELEFONO || '');

            try {
                const response = await fetch(`${API_BASE_URL}/general/instituciones/${selectedInstitution.ID_INSTITUCION}/sedes`);
                const data = await response.json();
                setSedes(data);
            } catch (error) {
                console.error('Error fetching sedes:', error);
            }
        } else {
            setInstitutionName(e.target.value); // Si el usuario está escribiendo manualmente
            setSedes([]); // Resetear las sedes si la institución es escrita manualmente
        }
    };

    const handleSedeChange = (e) => {
        const selectedSede = sedes.find(sede => sede.ID_SEDE === parseInt(e.target.value));
        if (selectedSede) {
            setSedeName(selectedSede.NOMBRE);
            setSedeAddress(selectedSede.DIRECCION || '');
        } else {
            setSedeName(e.target.value); // Si el usuario está escribiendo manualmente
        }
    };

    const handleInputChange = (event) => {
        setError(event.error ? event.error.message : null);
    };

    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const x = (offsetY / e.target.offsetHeight) * 30 - 15;
        const y = (offsetX / e.target.offsetWidth) * 30 - 15;
        setRotation({ x, y });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError('Stripe.js has not loaded yet. Please try again later.');
            return;
        }

        setLoading(true); // Iniciar el estado de carga

        const cardNumberElement = elements.getElement(CardNumberElement);

        if (!cardNumberElement) {
            setError('Card details are not correctly loaded. Please try again.');
            setLoading(false); // Detener el estado de carga si hay un error
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumberElement,
                billing_details: {
                    email: email,
                    name: name,
                    address: {
                        line1: institutionAddress,
                        postal_code: zip,
                    },
                    phone: phone, // Añadir el número de teléfono
                },
            });

            if (error) {
                setError(error.message);
                setLoading(false); // Detener el estado de carga si hay un error
                return;
            }

            const paymentResponse = await fetch(`${API_BASE_URL_BILLING_SERVICE}/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedPlan.precio * 100, // Convertir a centavos
                    currency: 'usd',
                    description: selectedPlan.titulo,
                    name,
                    lastName,
                    birthdate,
                    email,
                    phone, // Añadir el número de teléfono
                    planId: selectedPlan.id,
                    institutionName,
                    institutionAddress,
                    institutionPhone,
                    sedeName,
                    sedeAddress,
                    paymentMethodId: paymentMethod.id,
                    editedBy: null
                }),
            });

            if (!paymentResponse.ok) {
                const errorData = await paymentResponse.json();
                setError(errorData.error || 'Payment failed');
                setLoading(false); // Detener el estado de carga si hay un error
            } else {
                const paymentData = await paymentResponse.json();
                console.log('Payment successful:', paymentData);

                toast.success('Pago realizado con éxito. Se ha enviado un correo.');

                // Simular un breve retraso para mostrar el icono de éxito
                setTimeout(() => {
                    setLoading(false);
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000); // Esperar 3 segundos antes de redirigir
                }, 1000); // Mostrar el icono de éxito por un segundo
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setError('An unexpected error occurred while processing your payment.');
            setLoading(false); // Detener el estado de carga si hay un error
        }
    };

    return (
        <>
            <Navbar />
            <BillingContainer>
                <BillingTitle>Procesar Pago</BillingTitle>
                <CreditCardContainer onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    <CreditCard3D style={{
                        transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`
                    }}>
                        <CardDetails>
                            <CardNumber>1234 5678 9012 3456</CardNumber>
                            <CardHolder>JOHN DOE</CardHolder>
                            <CardExpiry>12/25</CardExpiry>
                            <CardCvc>123</CardCvc>
                        </CardDetails>
                    </CreditCard3D>
                </CreditCardContainer>
                <BillingForm onSubmit={handleSubmit}>
                    <BillingSection>
                        <BillingLabel>Correo Electrónico</BillingLabel>
                        <BillingInput
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <BillingLabel>Nombre</BillingLabel>
                        <BillingInput
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <BillingLabel>Apellido</BillingLabel>
                        <BillingInput
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <BillingLabel>Fecha de Nacimiento</BillingLabel>
                        <BillingInput
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                        />
                        <BillingLabel>Teléfono</BillingLabel>
                        <PhoneInput
                            international
                            defaultCountry="GT"
                            value={phone}
                            onChange={setPhone}
                            required
                        />
                    </BillingSection>
                    <BillingSection>
                        <BillingLabel>Institución</BillingLabel>
                        <BillingInput
                            type="text"
                            value={institutionName}
                            onChange={handleInstitutionChange}
                            placeholder="Escribe el nombre de la institución o selecciónala"
                            required
                            list="institution-list"
                        />
                        <datalist id="institution-list">
                            {institutions.map(institution => (
                                <option key={institution.ID_INSTITUCION} value={institution.NOMBRE} />
                            ))}
                        </datalist>
                        <BillingLabel>Sede (Opcional)</BillingLabel>
                        <BillingInput
                            type="text"
                            value={sedeName}
                            onChange={handleSedeChange}
                            placeholder="Escribe el nombre de la sede o selecciónala"
                            list="sede-list"
                        />
                        <datalist id="sede-list">
                            {sedes.map(sede => (
                                <option key={sede.ID_SEDE} value={sede.NOMBRE} />
                            ))}
                        </datalist>
                        <BillingLabel>Dirección de la Institución</BillingLabel>
                        <BillingInput
                            type="text"
                            value={institutionAddress}
                            onChange={(e) => setInstitutionAddress(e.target.value)}
                            required
                        />
                        <BillingLabel>Teléfono de la Institución</BillingLabel>
                        <BillingInput
                            type="text"
                            value={institutionPhone}
                            onChange={(e) => setInstitutionPhone(e.target.value)}
                            required
                        />
                        <BillingLabel>Dirección de la Sede (Opcional)</BillingLabel>
                        <BillingInput
                            type="text"
                            value={sedeAddress}
                            onChange={(e) => setSedeAddress(e.target.value)}
                        />
                        <BillingLabel>Código Postal</BillingLabel>
                        <BillingInput
                            type="text"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                        />
                    </BillingSection>

                    {/* Aquí se agregan los elementos de la tarjeta */}
                    <BillingSection>
                        <BillingLabel>Número de Tarjeta</BillingLabel>
                        <CardNumberElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                            onChange={handleInputChange}
                        />
                    </BillingSection>
                    <BillingSection>
                        <BillingLabel>Fecha de Expiración</BillingLabel>
                        <CardExpiryElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                            onChange={handleInputChange}
                        />
                    </BillingSection>
                    <BillingSection>
                        <BillingLabel>CVC</BillingLabel>
                        <CardCvcElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                            onChange={handleInputChange}
                        />
                    </BillingSection>

                    {error && <BillingError>{error}</BillingError>}
                    <BillingButton type="submit" disabled={!stripe || loading}>
                        {loading ? (
                            <FaSpinner className="spinner" />
                        ) : (
                            <>{loading === false ? "Pagar $" + selectedPlan.precio : <FaMoneyBillWave className="money-icon" />}</>
                        )}
                    </BillingButton>
                </BillingForm>
            </BillingContainer>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </>
    );
};

const Billing = () => {
    return (
        <Elements stripe={stripePromise}>
            <BillingFormComponent />
        </Elements>
    );
};

export default Billing;
