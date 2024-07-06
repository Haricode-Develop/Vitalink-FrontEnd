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

export const AboutSection = styled.section`
  position: relative;
  padding: 4rem 2rem;
  background-color: var(--blanco);
  animation: ${fadeIn} 1s ease-in;
  border-bottom: 2px solid #eee;
  z-index: -2;
`;

export const AboutHeader = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: var(--negro);
  margin-bottom: 2rem;
  animation: ${slideIn} 1s ease-in;
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const AboutImage = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
  border-radius: 8px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

export const MissionSection = styled.div`
  max-width: 600px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const MissionHeader = styled.h2`
  font-size: 2rem;
  color: var(--celeste);
  margin-bottom: 1rem;
`;

export const MissionContent = styled.div`
  font-size: 1.2rem;
  color: var(--negro);
`;

export const ObjectivesSection = styled.section`
  position: relative;
  padding: 4rem 2rem;
  background-color: var(--celeste-claro);
  text-align: center;
  border-bottom: 2px solid #eee;
`;

export const ObjectivesHeader = styled.h2`
  font-size: 2.5rem;
  color: var(--negro);
  margin-bottom: 2rem;
  animation: ${slideIn} 1s ease-in;
`;

export const ObjectiveList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

export const ObjectiveCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 200px;
  text-align: left;
  animation: ${fadeIn} 0.5s ease-in;

  @media (min-width: 768px) {
    max-width: 250px;
  }
`;

export const ObjectiveCardIcon = styled.div`
  margin-bottom: 1rem;
`;

export const ObjectiveCardTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--celeste);
  margin-bottom: 0.5rem;
`;

export const ObjectiveCardText = styled.p`
  font-size: 1rem;
  color: var(--negro);
`;

export const WhySection = styled.section`
  padding: 4rem 2rem;
  background-color: var(--celeste);
  color: var(--blanco);
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: var(--blanco);
    margin-bottom: 2rem;
  }
`;

export const WhyHeader = styled.h2`
  font-size: 2.5rem;
  color: var(--blanco);
  margin-bottom: 2rem;
  animation: ${slideIn} 1s ease-in;
`;

export const WhyContent = styled.div`
  font-size: 1.2rem;
  color: var(--blanco);
  text-align: left;
  max-width: 800px;
  margin: 0 auto;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--blanco);

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

export const AdditionalInfoSection = styled.section`
  padding: 4rem 2rem;
  background-color: var(--blanco);
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: var(--negro);
    margin-bottom: 2rem;
    animation: ${slideIn} 1s ease-in;
  }
`;

export const AdditionalInfoContent = styled.div`
  font-size: 1.2rem;
  color: var(--negro);
  animation: ${fadeIn} 1s ease-in;

  p {
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
`;

export const TextContainer = styled.div`
  flex: 1;
  text-align: left;
  padding: 0 1rem;

  p {
    margin-bottom: 1rem;
  }
`;

export const VideoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 100%;
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
`;

export const TeamVideo = styled.video`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
`;