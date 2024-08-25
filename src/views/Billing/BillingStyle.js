import styled from 'styled-components';

export const BillingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px;
  min-height: 100vh;
`;

export const BillingTitle = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5em;
`;

export const BillingForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const BillingSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const BillingLabel = styled.label`
  margin-bottom: 8px;
  color: #555;
  font-weight: bold;
`;

export const BillingInput = styled.input`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  color: #333;
  background-color: #f0f0f0;

  &:focus {
    border-color: #007bff;
    background-color: #fff;
  }
`;

export const BillingSelect = styled.select`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  color: #333;
  background-color: #f0f0f0;
  appearance: none; /* Eliminar la flecha por defecto */
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><polygon fill="#555" points="5,7 10,12 15,7"/></svg>'); /* Flecha personalizada */
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px 12px;

  &:focus {
    border-color: #007bff;
    background-color: #fff;
  }
`;

export const BillingButton = styled.button`
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  font-size: 1.2em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  .money-icon {
    font-size: 1.5em;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const BillingError = styled.div`
  color: #d9534f;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const CreditCardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

export const CreditCard3D = styled.div`
  width: 350px;
  height: 200px;
  background: linear-gradient(135deg, #0372FF 0%, #97FFE4 100%);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  position: relative;
  backface-visibility: hidden;

  &:hover {
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3);
  }

  .glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 70%);
    transition: transform 0.5s ease;
    transform: translate(-50%, -50%) scale(0);
  }

  &:hover .glow {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

export const CardDetails = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  color: var(--blanco);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const CardNumber = styled.div`
  font-size: 1.2em;
  letter-spacing: 2px;
  word-spacing: 4px;
  margin-bottom: 15px;
  text-align: left;
`;

export const CardHolder = styled.div`
  font-size: 0.9em;
  text-transform: uppercase;
  text-align: left;
`;

export const CardExpiry = styled.div`
  font-size: 0.9em;
  text-align: right;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const CardCvc = styled.div`
  font-size: 1.1em;
  position: absolute;
  bottom: 20px;
  right: 60px;
  text-align: right;
`;
