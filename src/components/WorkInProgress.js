import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    135deg,
    ${props => props.theme.background}80 0%,
    ${props => props.theme.surface}80 50%,
    ${props => props.theme.background}80 100%
  );
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-in-out;
  pointer-events: all;
  cursor: not-allowed;
`;

const ContentContainer = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 2rem;
  background: ${props => props.theme.surface};
  border-radius: 20px;
  box-shadow: 0 20px 60px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}20;
  animation: ${float} 3s ease-in-out infinite;
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.accent};
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.surface};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 65%;
  background: ${props => props.theme.gradient};
  border-radius: 2px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const EstimateText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  opacity: 0.8;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.theme.accent};
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
`;

const WorkInProgress = () => {
  const handleOverlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={handleOverlayClick}
      onMouseDown={handleOverlayClick}
      onTouchStart={handleOverlayClick}
    >
      <ContentContainer>
        <Logo>Aristo KL</Logo>
        <Icon>🚧</Icon>
        <Title>Work in Progress</Title>
        <Message>
          We're crafting something amazing for you! Our website is currently under development 
          to bring you the best dining experience. Thank you for your patience.
        </Message>
        <ProgressContainer>
          <ProgressBar />
        </ProgressContainer>
        <EstimateText>Coming Soon</EstimateText>
      </ContentContainer>
    </Overlay>
  );
};

export default WorkInProgress;