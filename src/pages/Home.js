import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
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
  background-position: center 80%;
  background-repeat: no-repeat;
  
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
  color: ${props => props.theme.primary};
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #ffffff;
  margin-bottom: 2rem;
  font-weight: 300;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const HeroTagline = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: #f0f0f0;
  margin-bottom: 3rem;
  font-style: italic;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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

  &:hover {
    color: ${props => props.theme.background};
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }

  &:hover::before {
    left: 0;
  }
`;

// New Gallery Section
const GallerySection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.background};
`;

const GalleryContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px ${props => props.theme.shadow};

  &:nth-child(1) {
    grid-column: span 2;
    height: 350px;
    
    @media (max-width: 768px) {
      grid-column: span 1;
      height: 250px;
    }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${GalleryItem}:hover & {
    opacity: 1;
  }
  
  ${GalleryItem}:hover ${GalleryImage} {
    transform: scale(1.1);
  }
`;

const GalleryText = styled.div`
  color: white;
`;

const GalleryTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const GalleryDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
`;

// Featured Cocktails Section
const FeaturedCocktailsSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.surface};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80') center/cover;
    opacity: 0.05;
    z-index: 0;
  }
`;

const CocktailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const CocktailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ViewMoreButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const ViewMoreLink = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.gradient};
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px ${props => props.theme.primary}33;
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }

  /* The &::after block has been removed */
  /* The &:hover::after block has been removed */

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 30px ${props => props.theme.primary}44;
    border-color: ${props => props.theme.primary}66;
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${props => props.theme.primary}33;
    border-radius: 50%;
    animation: float 3s ease-in-out infinite;
  }
  
  &::before {
    top: -10px;
    left: -15px;
    animation-delay: 0s;
  }
  
  &::after {
    bottom: -10px;
    right: -15px;
    animation-delay: 1.5s;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
    50% { transform: translateY(-5px) scale(1.2); opacity: 1; }
  }
`;

const CocktailCard = styled(motion.div)`
  background: ${props => props.theme.background};
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 15px 40px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px ${props => props.theme.shadow};
  }
`;

const CocktailImage = styled.div`
  height: 200px;
  background: url(${props => props.image}) center/cover;
  position: relative;
`;

const CocktailPrice = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const CocktailContent = styled.div`
  padding: 1.5rem;
`;

const CocktailName = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CocktailDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const CocktailIngredients = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const IngredientTag = styled.span`
  background: ${props => props.theme.primary}22;
  color: ${props => props.theme.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, ${props => props.theme.background} 0%, ${props => props.theme.surface} 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '“';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80') center/cover;
    opacity: 0.03;
    z-index: 0;
  }
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const CarouselWrapper = styled.div`
  position: relative;
  margin-top: 3rem;
  background: ${props => props.theme.surface};
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 60px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
  
  @media (max-width: 768px) {
    padding-bottom: 4rem;
  }
`;

const TestimonialsCarousel = styled.div`
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateX(-${props => props.activeIndex * 100}%);
  
  &:hover {
    transition-duration: 1.2s;
  }
`;

const TestimonialSlide = styled(motion.div)`
  min-width: 100%;
  padding: 4rem 3rem;
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;
  
  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1.5rem;
    gap: 2rem;
    align-items: center;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;
  position: relative;
  
  @media (max-width: 968px) {
    order: 2;
  }
  
  &::before {
    content: '“';
    position: absolute;
    top: -22px;
    left: -22px;
    font-size: 6rem;
    color: ${props => props.theme.primary};
    font-family: 'Playfair Display', serif;
    line-height: 1;
    opacity: 0.3;
    
    @media (max-width: 968px) {
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 4rem;
    }
  }
`;

const TestimonialText = styled.p`
  color: ${props => props.theme.text};
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  font-style: italic;
  position: relative;
  z-index: 2;
  margin-left: 20px;
  
  @media (max-width: 968px) {
    margin-left: 0;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }
`;

const TestimonialMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 968px) {
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1rem;
  }
`;

const AuthorAvatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: url(${props => props.image}) center/cover;
  border: 3px solid ${props => props.theme.primary};
  box-shadow: 0 8px 25px ${props => props.theme.primary}33;
  flex-shrink: 0;
  
  @media (max-width: 968px) {
    width: 80px;
    height: 80px;
  }
`;

const AuthorInfo = styled.div`
  flex: 1;
  
  @media (max-width: 968px) {
    text-align: center;
    flex: none;
  }
`;

const AuthorName = styled.h4`
  color: ${props => props.theme.text};
  font-weight: 700;
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
  
  @media (max-width: 968px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const AuthorRole = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 968px) {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.2rem;
  
  @media (max-width: 968px) {
    justify-content: center;
    gap: 0.3rem;
  }
`;

const Star = styled.span`
  color: #ffc107;
  font-size: 1.1rem;
  filter: drop-shadow(0 2px 4px rgba(255, 193, 7, 0.3));
`;

const TestimonialVisual = styled.div`
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  border-radius: 20px;
  background: url(${props => props.image}) center/cover;
  box-shadow: 0 15px 40px ${props => props.theme.shadow};
  border: 3px solid ${props => props.theme.primary}22;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '“';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.gradient};
    opacity: 0.1;
  }
  
  @media (max-width: 968px) {
    width: 250px;
    height: 250px;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const CarouselControls = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  align-items: center;
  z-index: 10;
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const CarouselDot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? props.theme.primary : props.theme.textSecondary}44;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: ${props => props.theme.primary};
    transform: scale(1.2);
  }
  
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 2px solid ${props.theme.primary}44;
      border-radius: 50%;
    }
  `}
`;

const ViewMoreText = styled.span`
  position: relative;
  z-index: 2;
`;

const NavigationButton = styled(motion.button)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.primary}44;
  background: ${props => props.theme.surface}ee;
  color: ${props => props.theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    border-color: ${props => props.theme.primary};
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${props => props.theme.primary}22;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.gradient};
  transform-origin: left;
`;

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.surface};
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.text};
  font-family: 'Playfair Display', serif;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.background};
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.gradient};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.theme.shadow};
  }

  &:hover::before {
    opacity: 0.05;
  }

  * {
    position: relative;
    z-index: 2;
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: ${props => props.theme.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 25px ${props => props.theme.primary}33;
  
  svg {
    width: 32px;
    height: 32px;
    fill: white;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
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
  cursor: pointer;
  z-index: 3;
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

// Modal Components for Cocktails
const CocktailModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const CocktailModalContent = styled(motion.div)`
  background: ${props => props.theme.surface};
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.primary}33;
  position: relative;
`;

const CocktailModalCloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.background};
  border: 2px solid ${props => props.theme.primary}33;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    transform: rotate(90deg);
  }
`;

const CocktailModalImage = styled(motion.div)`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      180deg,
      transparent,
      ${props => props.theme.surface}cc
    );
  }
`;

const CocktailModalPrice = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${props => props.theme.gradient};
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.1rem;
  z-index: 2;
  box-shadow: 0 8px 25px ${props => props.theme.primary}44;
`;

const CocktailModalBody = styled.div`
  padding: 2rem;
  padding-top: 1rem;
`;

const CocktailModalHeader = styled.div`
  margin-bottom: 2rem;
`;

const CocktailModalTitle = styled.h2`
  font-size: 2.2rem;
  color: ${props => props.theme.text};
  margin: 0 0 1rem 0;
  line-height: 1.2;
  font-family: 'Playfair Display', serif;
`;

const CocktailModalDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const IngredientsSection = styled.div`
  margin-bottom: 2rem;
`;

const IngredientsTitle = styled.h3`
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const CocktailModalIngredients = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
`;

const CocktailModalIngredient = styled(motion.div)`
  background: ${props => props.theme.primary}22;
  color: ${props => props.theme.primary};
  padding: 0.8rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  border: 1px solid ${props => props.theme.primary}33;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;

  &:hover {
    background: ${props => props.theme.primary}33;
    transform: translateY(-2px);
  }
`;

const CocktailActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const CocktailActionButton = styled(motion.button)`
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: ${props => props.theme.gradient};
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px ${props => props.theme.primary}44;
    }
  }

  &.secondary {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    border: 2px solid ${props => props.theme.primary}33;
    
    &:hover {
      background: ${props => props.theme.primary}11;
      border-color: ${props => props.theme.primary}66;
    }
  }
`;

const CocktailInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${props => props.theme.background};
  border-radius: 15px;
  border: 1px solid ${props => props.theme.primary}22;
`;

const InfoItem = styled.div`
  text-align: center;
`;

const InfoLabel = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const InfoValue = styled.div`
  color: ${props => props.theme.text};
  font-size: 1.1rem;
  font-weight: 600;
`;

const Home = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length);
      }, 5000); // Change slide every 5 seconds
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedCocktail(null);
      }
    };

    if (selectedCocktail) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCocktail]);

  const handleDotClick = (index) => {
    setActiveTestimonial(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000); // Resume auto-play after 3 seconds
  };

  const handlePrevious = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  const handleNext = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  const handleMouseEnter = () => {
    setIsPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  const handleCocktailClick = (cocktail) => {
    setSelectedCocktail(cocktail);
  };

  const handleCloseCocktailModal = () => {
    setSelectedCocktail(null);
  };

  const handleCocktailOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseCocktailModal();
    }
  };

  // Gallery items with real Unsplash images
  const galleryItems = [
    {
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      title: 'Elegant Interior',
      description: 'Sophisticated ambiance perfect for any occasion'
    },
    {
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      title: 'Craft Cocktails',
      description: 'Expertly mixed with premium ingredients'
    },
    {
      image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Live Music',
      description: 'Intimate performances every weekend'
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Fine Dining',
      description: 'Gourmet dishes paired with exceptional drinks'
    }
  ];

  // Featured cocktails with images
  const featuredCocktails = [
    {
      name: 'Golden Aristocrat',
      description: 'Premium whiskey blend with honey, citrus, and aromatic bitters',
      price: 'RM 45',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      ingredients: ['Premium Whiskey', 'Honey', 'Citrus', 'Bitters']
    },
    {
      name: 'Midnight Elixir',
      description: 'Dark rum infused with exotic spices and tropical fruits',
      price: 'RM 38',
      image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1086&q=80',
      ingredients: ['Dark Rum', 'Exotic Spices', 'Tropical Fruits', 'Lime']
    },
    {
      name: 'Crystal Garden',
      description: 'Refreshing gin cocktail with cucumber, elderflower, and mint',
      price: 'RM 35',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      ingredients: ['Premium Gin', 'Cucumber', 'Elderflower', 'Fresh Mint']
    }
  ];

  // Testimonials with additional visual content
  const testimonials = [
    {
      text: "Absolutely stunning atmosphere and the best cocktails in KL. The staff is incredibly knowledgeable and the service is impeccable. Every detail is crafted to perfection, from the ambiance to the presentation of each drink. A must-visit destination for anyone who appreciates fine craftsmanship!",
      author: "Sarah Chen",
      role: "Food & Beverage Critic",
      avatar: "https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      visual: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      rating: 5
    },
    {
      text: "The perfect spot for a sophisticated evening out. The cocktails are works of art and the ambiance is unmatched. Every visit feels like a special occasion, with impeccable service and an atmosphere that strikes the perfect balance between elegance and warmth. Highly recommended for special celebrations.",
      author: "Marcus Wong",
      role: "Business Executive",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      visual: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      rating: 5
    },
    {
      text: "Every visit to Aristo is a memorable experience. The attention to detail is exceptional and the cocktail menu is constantly evolving with new creative combinations. The mixologists are true artists, and the live music creates the perfect backdrop for an unforgettable evening. This place sets the standard for luxury bars.",
      author: "Elena Rodriguez",
      role: "Lifestyle Blogger",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      visual: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 5
    }
  ];

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M6 2L4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L18 2H6ZM7.2 4H16.8L18.2 8H5.8L7.2 4ZM6 10H18V20H6V10ZM8 12V14H16V12H8Z"/>
          <path d="M9 16L11 18L15 14"/>
        </svg>
      ),
      title: 'Craft Cocktails',
      description: 'Expertly crafted cocktails using premium spirits and fresh ingredients sourced from around the world.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M3 9V7H21V9H20V16H21V18H18V20H6V18H3V16H4V9H3ZM6 9V16H18V9H6ZM8 11H16V13H8V11Z"/>
          <circle cx="7" cy="5" r="2"/>
          <circle cx="12" cy="5" r="2"/>
          <circle cx="17" cy="5" r="2"/>
          <path d="M9 14H15L14 16H10L9 14Z"/>
        </svg>
      ),
      title: 'Live Music',
      description: 'Enjoy intimate live performances from talented local and international artists every weekend.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M2 21V19H4V8H2V6H6V19H8V17H10V19H12V8H14V19H16V17H18V19H20V8H22V6H18V19H20V21H2Z"/>
          <rect x="4" y="10" width="2" height="2"/>
          <rect x="4" y="13" width="2" height="2"/>
          <rect x="4" y="16" width="2" height="2"/>
          <rect x="12" y="10" width="2" height="2"/>
          <rect x="12" y="13" width="2" height="2"/>
          <rect x="18" y="10" width="2" height="2"/>
          <rect x="18" y="13" width="2" height="2"/>
          <rect x="18" y="16" width="2" height="2"/>
        </svg>
      ),
      title: 'Urban Atmosphere',
      description: 'Modern, sophisticated ambiance in the heart of Kuala Lumpur\'s vibrant Bukit Bintang district.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <circle cx="12" cy="4" r="2"/>
          <path d="M15.89 8.11C15.5 7.72 14.83 7.72 14.44 8.11L12 10.59L9.56 8.11C9.17 7.72 8.5 7.72 8.11 8.11C7.72 8.5 7.72 9.17 8.11 9.56L10.59 12L8.11 14.44C7.72 14.83 7.72 15.5 8.11 15.89C8.5 16.28 9.17 16.28 9.56 15.89L12 13.41L14.44 15.89C14.83 16.28 15.5 16.28 15.89 15.89C16.28 15.5 16.28 14.83 15.89 14.44L13.41 12L15.89 9.56C16.28 9.17 16.28 8.5 15.89 8.11Z"/>
          <path d="M12 20C16.42 20 20 16.42 20 12H22C22 17.52 17.52 22 12 22S2 17.52 2 12H4C4 16.42 7.58 20 12 20Z"/>
          <rect x="6" y="16" width="12" height="2"/>
        </svg>
      ),
      title: 'Expert Mixologists',
      description: 'Our award-winning mixologists create unique experiences with every handcrafted cocktail.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M7 2V4H17V2H19V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H5V2H7ZM4 8V20H20V8H4ZM6 10H8V12H6V10ZM10 10H12V12H10V10ZM14 10H16V12H14V10ZM6 14H8V16H6V14ZM10 14H12V16H10V14ZM14 14H16V16H14V14Z"/>
          <circle cx="18" cy="6" r="1"/>
          <path d="M16 18H18V20H16V18Z"/>
        </svg>
      ),
      title: 'Premium Spirits',
      description: 'Extensive collection of rare and premium spirits from renowned distilleries worldwide.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M5 13L9 7L15 12L22 6V17C22 18.1 21.1 19 20 19H4C2.9 19 2 18.1 2 17V5C2 3.9 2.9 3 4 3H20C21.1 3 22 3.9 22 5V6L15 12L9 7L5 13Z"/>
          <circle cx="7.5" cy="8.5" r="1.5"/>
          <path d="M12 20L16 16H20L22 18V22H2V20L6 16H8L12 20Z"/>
        </svg>
      ),
      title: 'Private Events',
      description: 'Exclusive venue hire for corporate events, celebrations, and intimate gatherings.'
    }
  ];

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

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewMoreClick = () => {
    navigate('/menu');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
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
          <HeroSubtitle variants={itemVariants}>
            Where Sophistication Meets Urban Energy
          </HeroSubtitle>
          <HeroTagline variants={itemVariants}>
            "Experience the finest cocktails in an atmosphere of refined elegance"
          </HeroTagline>
          <CTAButtons variants={itemVariants}>
            <CTAButton to="/menu" primary>
              View Menu
            </CTAButton>
            <CTAButton to="/contact">
              Reserve Table
            </CTAButton>
          </CTAButtons>
        </HeroContent>
        
        <ScrollIndicator onClick={scrollToFeatures}>
          <ScrollText>Discover More</ScrollText>
          <ScrollArrow
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </ScrollIndicator>
      </HeroSection>

      {/* <GallerySection>
        <GalleryContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Experience Aristo
          </SectionTitle>
          
          <GalleryGrid>
            {galleryItems.map((item, index) => (
              <GalleryItem
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <GalleryImage src={item.image} alt={item.title} />
                <GalleryOverlay>
                  <GalleryText>
                    <GalleryTitle>{item.title}</GalleryTitle>
                    <GalleryDescription>{item.description}</GalleryDescription>
                  </GalleryText>
                </GalleryOverlay>
              </GalleryItem>
            ))}
          </GalleryGrid>
        </GalleryContainer>
      </GallerySection> */}

      <FeaturedCocktailsSection>
        <CocktailsContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Beverages
          </SectionTitle>
          
          <CocktailsGrid>
            {featuredCocktails.map((cocktail, index) => (
              <CocktailCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ cursor: 'pointer' }}
                onClick={() => handleCocktailClick(cocktail)}
              >
                <CocktailImage image={cocktail.image}>
                  <CocktailPrice>{cocktail.price}</CocktailPrice>
                </CocktailImage>
                <CocktailContent>
                  <CocktailName>{cocktail.name}</CocktailName>
                  <CocktailDescription>{cocktail.description}</CocktailDescription>
                  <CocktailIngredients>
                    {cocktail.ingredients.map((ingredient, idx) => (
                      <IngredientTag key={idx}>{ingredient}</IngredientTag>
                    ))}
                  </CocktailIngredients>
                </CocktailContent>
              </CocktailCard>
            ))}
          </CocktailsGrid>
          <motion.div
            style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ViewMoreLink 
              onClick={handleViewMoreClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FloatingElements />
              <motion.div
                style={{
                  width: '16px',
                  height: '16px',
                  border: '1px solid white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                →
              </motion.div>
              <ViewMoreText>View Full Menu</ViewMoreText>
            </ViewMoreLink>
          </motion.div>
        </CocktailsContainer>

        {/* Cocktail Modal */}
        <AnimatePresence>
          {selectedCocktail && (
            <CocktailModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCocktailOverlayClick}
            >
              <CocktailModalContent
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <CocktailModalCloseButton
                  onClick={handleCloseCocktailModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </CocktailModalCloseButton>
                
                <CocktailModalImage
                  imageUrl={selectedCocktail.image}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <CocktailModalPrice>{selectedCocktail.price}</CocktailModalPrice>
                </CocktailModalImage>
                
                <CocktailModalBody>
                  <CocktailModalHeader>
                    <CocktailModalTitle>{selectedCocktail.name}</CocktailModalTitle>
                  </CocktailModalHeader>
                  
                  <CocktailModalDescription>{selectedCocktail.description}</CocktailModalDescription>
                  
                  <CocktailInfo>
                    <InfoItem>
                      <InfoLabel>Price</InfoLabel>
                      <InfoValue>{selectedCocktail.price}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Category</InfoLabel>
                      <InfoValue>Premium Cocktail</InfoValue>
                    </InfoItem>
                  </CocktailInfo>
                  
                  <IngredientsSection>
                    <IngredientsTitle>Premium Ingredients</IngredientsTitle>
                    <CocktailModalIngredients>
                      {selectedCocktail.ingredients.map((ingredient, idx) => (
                        <CocktailModalIngredient
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {ingredient}
                        </CocktailModalIngredient>
                      ))}
                    </CocktailModalIngredients>
                  </IngredientsSection>
                  
                  <CocktailActionButtons>
                    <CocktailActionButton
                      className="primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/menu')}
                    >
                      Order Now
                    </CocktailActionButton>
                    <CocktailActionButton
                      className="secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCloseCocktailModal}
                    >
                      Close
                    </CocktailActionButton>
                  </CocktailActionButtons>
                </CocktailModalBody>
              </CocktailModalContent>
            </CocktailModalOverlay>
          )}
        </AnimatePresence>
      </FeaturedCocktailsSection>

      <TestimonialsSection>
        <TestimonialsContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What Our Guests Say
          </SectionTitle>
          
          <CarouselWrapper
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <TestimonialsCarousel activeIndex={activeTestimonial}>
              {testimonials.map((testimonial, index) => (
                <TestimonialSlide
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <TestimonialContent>
                    <TestimonialText>{testimonial.text}</TestimonialText>
                    <TestimonialMeta>
                      <AuthorAvatar image={testimonial.avatar} />
                      <AuthorInfo>
                        <AuthorName>{testimonial.author}</AuthorName>
                        <AuthorRole>{testimonial.role}</AuthorRole>
                        <StarRating>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i}>★</Star>
                          ))}
                        </StarRating>
                      </AuthorInfo>
                    </TestimonialMeta>
                  </TestimonialContent>
                  <TestimonialVisual image={testimonial.visual} />
                </TestimonialSlide>
              ))}
            </TestimonialsCarousel>
            
            <CarouselControls>
              <NavigationButton
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ←
              </NavigationButton>
              
              <CarouselDots>
                {testimonials.map((_, index) => (
                  <CarouselDot
                    key={index}
                    active={index === activeTestimonial}
                    onClick={() => handleDotClick(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </CarouselDots>
              
              <NavigationButton
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                →
              </NavigationButton>
            </CarouselControls>
            
            <ProgressBar>
              <ProgressFill
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isPlaying ? 1 : 0 }}
                transition={{ 
                  duration: isPlaying ? 5 : 0, 
                  ease: "linear",
                  repeat: isPlaying ? Infinity : 0
                }}
                key={`${activeTestimonial}-${isPlaying}`}
              />
            </ProgressBar>
          </CarouselWrapper>
        </TestimonialsContainer>
      </TestimonialsSection>

      <FeaturesSection id="features" ref={ref}>
        <FeaturesContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Why Choose Aristo?
          </SectionTitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                variants={{
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.6, 
                      delay: index * 0.1 
                    } 
                  }
                }}
                whileHover={{ scale: 1.05 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home; 