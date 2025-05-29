import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Floating animation
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

// Pulse animation for attention
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`;

const FloatingContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;

const WhatsAppButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  border-radius: 50%;
  text-decoration: none;
  color: white;
  font-size: 35px;
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
  position: relative;
  overflow: hidden;
  animation: ${float} 3s ease-in-out infinite;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(37, 211, 102, 0.5);
    animation: ${pulse} 1.5s infinite;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.2;
  }
`;

const TooltipContainer = styled(motion.div)`
  position: absolute;
  bottom: 85px;
  right: 0;
  background: ${props => props.theme.background};
  border: 2px solid #25d366;
  border-radius: 15px;
  padding: 12px 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.text};
  max-width: 250px;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 25px;
    border: 8px solid transparent;
    border-top-color: #25d366;
  }

  @media (max-width: 768px) {
    bottom: 75px;
    font-size: 12px;
    padding: 10px 14px;
    max-width: 200px;
  }
`;

// WhatsApp Icon Component
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="35" height="35" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Hide floating button when scrolling (optional)
  useEffect(() => {
    let scrollTimer;
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsVisible(true);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  const handleWhatsAppClick = () => {
    // Convert the phone number to WhatsApp format (remove spaces and dashes, add country code)
    const phoneNumber = '60321100973'; // +60 3-2110 0973 converted to WhatsApp format
    
    const message = encodeURIComponent(
      "Hello Aristo Bar! \n\nI would like to make a reservation for your establishment. Could you please assist me with the booking details and availability?\n\nThank you!"
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <FloatingContainer
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <TooltipContainer
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                Chat with us for reservations!
              </TooltipContainer>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <WhatsAppButton
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleWhatsAppClick();
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <WhatsAppIcon />
          </WhatsAppButton>
        </FloatingContainer>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp; 