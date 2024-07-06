import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ContactSection = styled.section`
  position: relative;
  padding: 4rem 2rem;
  background-color: var(--blanco);
  animation: ${fadeIn} 1s ease-in;
  border-bottom: 2px solid #eee;
  z-index: 1; /* Changed z-index to ensure inputs are clickable */
`;

export const ContactHeader = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: var(--negro);
  margin-bottom: 2rem;
  animation: ${slideIn} 1s ease-in;
`;

export const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ContactForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${slideIn} 1s ease-in;
  z-index: 2; /* Ensure the form is above other elements */
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  font-size: 1.2rem;
  color: var(--negro);
`;

export const FormInput = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-color: var(--celeste);
    outline: none;
  }
`;

export const FormTextarea = styled.textarea`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-color: var(--celeste);
    outline: none;
  }
`;

export const FormButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  color: var(--blanco);
  background-color: var(--celeste);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--celeste-rgba);
  }
`;

export const SVGContainer = styled.div`
  position: absolute;
  width: 80%;
  height: 100%;
  z-index: -1;
  overflow: hidden;

  svg {
    position: absolute;
    width: 300px;
    height: 300px;
    opacity: 0.8;
  }

  svg:nth-of-type(2) {
    top: 50%;
    left: 10%;

    @media (max-width: 768px) {
      top: 30%!important;
    }
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  animation: ${slideIn} 1s ease-in;
  z-index: 2;
  video {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;