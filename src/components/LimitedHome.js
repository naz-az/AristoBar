import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '../assets/0.jpg';

const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 100%
  ), url(${heroImage});
  background-size: cover;
  background-position: 39.0% 80%;
  background-repeat: no-repeat;
  
  @media (max-width: 768px) {
    background-position: 47.5% 80%;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23d4af37" stop-opacity="0.1"/><stop offset="100%" stop-color="%23d4af37" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/><circle cx="700" cy="800" r="80" fill="url(%23a)"/></svg>') center/cover;
    opacity: 0.3;
    z-index: 1;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  padding: 2rem;
  z-index: 2;
  position: relative;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-family: 'Playfair Display', serif;
  color: rgb(75, 13, 7);
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;



const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  padding: 1rem 2rem;
  border: 2px solid ${props => props.theme.primary};
  background: ${props => props.primary ? props.theme.primary : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.primary ? props.theme.background : '#ffffff'};
  text-decoration: none;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  pointer-events: none;
  opacity: 0.7;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.primary};
    transition: left 0.3s ease;
    z-index: -1;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  z-index: 3;
  pointer-events: none;
  opacity: 0.7;
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const ScrollArrow = styled(motion.div)`
  width: 2px;
  height: 30px;
  background: #ffffff;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -3px;
    width: 8px;
    height: 8px;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(45deg);
  }
`;

const LimitedHome = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <HeroTitle variants={itemVariants}>
            Aristo KL
          </HeroTitle>
          <CTAButtons variants={itemVariants}>
            <CTAButton to="/menu" primary>
              View Menu
            </CTAButton>
            <CTAButton to="/contact">
              Reserve Table
            </CTAButton>
          </CTAButtons>
        </HeroContent>
        
        <ScrollIndicator>
          <ScrollText>Discover More</ScrollText>
          <ScrollArrow
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </ScrollIndicator>
      </HeroSection>
    </HomeContainer>
  );
};

export default LimitedHome;