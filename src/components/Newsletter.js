import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterSection = styled.section`
  position: relative;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, 
    ${props => props.theme.primary}15 0%, 
    ${props => props.theme.surface} 25%, 
    ${props => props.theme.background} 75%, 
    ${props => props.theme.primary}10 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, ${props => props.theme.primary}20 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, ${props => props.theme.primary}15 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, ${props => props.theme.surface}30 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const NewsletterContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const NewsletterCard = styled(motion.div)`
  background: ${props => props.theme.surface};
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.theme.primary}40;
  border-radius: 20px;
  padding: 2.5rem 3rem;
  text-align: center;
  box-shadow: 
    0 25px 50px -12px ${props => props.theme.shadow},
    0 0 0 1px ${props => props.theme.primary}20,
    inset 0 1px 0 ${props => props.theme.primary}30;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.gradient};
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => props.theme.primary}08 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const NewsletterIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
  box-shadow: 0 10px 30px ${props => props.theme.primary}40;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: ${props => props.theme.gradient};
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.3;
  }
`;

const NewsletterTitle = styled(motion.h2)`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
  position: relative;

  background: linear-gradient(135deg, ${props => props.theme.text} 0%, ${props => props.theme.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const NewsletterSubtitle = styled(motion.p)`
  font-size: 1rem;
  color: ${props => props.theme.primary};
  font-weight: 600;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NewsletterText = styled(motion.p)`
  color: ${props => props.theme.textSecondary};
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }
`;

const NewsletterForm = styled(motion.form)`
  display: flex;
  gap: 1rem;
  max-width: 450px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const NewsletterInput = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid ${props => props.theme.primary}30;
  border-radius: 12px;
  background: ${props => props.theme.background}80;
  backdrop-filter: blur(10px);
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 
      0 0 0 3px ${props => props.theme.primary}20,
      0 8px 20px ${props => props.theme.shadow};
    background: ${props => props.theme.background};
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const NewsletterButton = styled(motion.button)`
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px ${props => props.theme.primary}40;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px ${props => props.theme.primary}50;
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: 0 8px 20px ${props => props.theme.primary}40;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 1rem 1.5rem;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const BenefitsList = styled(motion.div)`
  display: none;
  
  @media (min-width: 1024px) {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.primary}10;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.primary}20;
  transition: all 0.3s ease;
  font-size: 0.85rem;

  &:hover {
    background: ${props => props.theme.primary}15;
    border-color: ${props => props.theme.primary}30;
    transform: translateY(-1px);
  }
`;

const BenefitIcon = styled.div`
  font-size: 1rem;
  flex-shrink: 0;
`;

const BenefitText = styled.span`
  color: ${props => props.theme.text};
  font-weight: 500;
  font-size: 0.85rem;
  white-space: nowrap;
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate newsletter signup
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1500);
  };

  const benefits = [
    { icon: '🎉', text: 'Exclusive Events' },
    { icon: '🍸', text: 'Special Offers' },
    { icon: '📰', text: 'Latest Updates' },
    { icon: '🎵', text: 'Live Music News' }
  ];

  return (
    <NewsletterSection>
      <NewsletterContainer>
        <NewsletterCard
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <NewsletterIcon
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            ✉️
          </NewsletterIcon>

          <NewsletterTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Stay Connected
          </NewsletterTitle>

          <NewsletterSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join the Aristo Experience
          </NewsletterSubtitle>

          <NewsletterText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Be the first to know about our exclusive events, special cocktail offers, 
            live music performances, and behind-the-scenes updates from Aristo Bar.
          </NewsletterText>

          <NewsletterForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <InputWrapper>
              <NewsletterInput
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputWrapper>
            <NewsletterButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
            </NewsletterButton>
          </NewsletterForm>

          <BenefitsList
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <BenefitIcon>{benefit.icon}</BenefitIcon>
                <BenefitText>{benefit.text}</BenefitText>
              </BenefitItem>
            ))}
          </BenefitsList>

          <AnimatePresence>
            {showSuccess && (
              <SuccessMessage
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                🎉 Welcome to the Aristo family! Check your email for confirmation.
              </SuccessMessage>
            )}
          </AnimatePresence>
        </NewsletterCard>
      </NewsletterContainer>
    </NewsletterSection>
  );
};

export default Newsletter; 