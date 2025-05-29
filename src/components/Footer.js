import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${props => props.theme.surface} 0%, ${props => props.theme.background} 100%);
  border-top: 1px solid ${props => props.theme.primary}33;
  padding: 3rem 0 1rem;
  margin-top: auto;
  width: 100%;
  overflow-x: hidden;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
  }
`;

const FooterTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: ${props => props.theme.primary};
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 50px;
    height: 2px;
    background: ${props => props.theme.gradient};
  }
`;

const FooterText = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  margin: 0.25rem 0;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: inline-block;
  background: transparent;
  border: 1px solid transparent;
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
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
    transform: scale(0.8);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.gradient};
    opacity: 0;
    filter: blur(15px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;
    transform: scale(1.2);
  }

  &:hover {
    color: white;
    transform: translateY(-2px);
    border-color: ${props => props.theme.primary}44;
    box-shadow: 0 8px 25px ${props => props.theme.shadow};
  }

  &:hover::before {
    opacity: 0.5;
    transform: scale(1);
  }

  &:hover::after {
    opacity: 0.6;
    transform: scale(1);
  }

  span {
    position: relative;
    z-index: 3;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
`;

const ExternalLink = styled.a`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;

  &:hover {
    color: ${props => props.theme.primary};
    transform: translateX(5px);
  }

  &::before {
    content: '→';
    position: absolute;
    left: -20px;
    opacity: 0;
    transition: all 0.3s ease;
    color: ${props => props.theme.primary};
  }

  &:hover::before {
    opacity: 1;
    left: -15px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.surface};
  border: 2px solid ${props => props.theme.primary}33;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  font-size: 1.3rem;
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
    background: ${props => props.platform === 'facebook' ? '#1877f2' : 
                props.platform === 'instagram' ? 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' :
                props.platform === 'twitter' ? '#1da1f2' :
                props.platform === 'x' ? '#000000' : 
                props.platform === 'youtube' ? '#ff0000' :
                props.platform === 'tiktok' ? '#000000' :
                props.theme.gradient};
    transform: scale(0);
    transition: transform 0.3s ease;
    border-radius: 50%;
  }

  &:hover {
    color: white;
    border-color: ${props => props.theme.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 25px ${props => props.theme.shadow};
  }

  &:hover::before {
    opacity: 0.7;
    transform: scale(1);
  }

  svg {
    position: relative;
    z-index: 2;
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

const ContactText = styled.div`
  color: ${props => props.theme.textSecondary};
  line-height: 1.4;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.primary}33;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
`;

const FooterLogo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

// Contact Info Icon Components
const LocationIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
  </svg>
);

// Social Media Icon Components
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    {/* A simplified X logo path. You can replace this with a more accurate one if needed. */}
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const Footer = () => {
  const socialLinks = [
    { icon: FacebookIcon, url: 'https://facebook.com/aristobar', label: 'Facebook', platform: 'facebook' },
    { icon: InstagramIcon, url: 'https://instagram.com/aristobar', label: 'Instagram', platform: 'instagram' },
    // { icon: TwitterIcon, url: 'https://twitter.com/aristobar', label: 'Twitter', platform: 'twitter' },
    { icon: XIcon, url: 'https://x.com/aristobar', label: 'X', platform: 'x' }, 
    { icon: YouTubeIcon, url: 'https://youtube.com/aristobar', label: 'YouTube', platform: 'youtube' },
    { icon: TikTokIcon, url: 'https://tiktok.com/@aristobar', label: 'TikTok', platform: 'tiktok' }
  ];

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/about', label: 'About Us' },
    { to: '/events', label: 'Events' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' }
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/careers', label: 'Careers' }
  ];

  const contactInfo = [
    {
      icon: LocationIcon,
      text: '27, Jln Mesui, Bukit Bintang\n50200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur'
    },
    {
      icon: PhoneIcon,
      text: '+60 3-2110 0973'
    },
    {
      icon: EmailIcon,
      text: 'info@aristobar.com'
    },
    {
      icon: ClockIcon,
      text: 'Mon-Thu: 5PM-12AM\nFri-Sat: 4PM-2AM\nSun: 4PM-11PM'
    }
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FooterTitle>Aristo Bar</FooterTitle>
            <FooterText>
              Where sophistication meets urban energy. Experience the finest cocktails 
              in an atmosphere of refined elegance, complemented by live music and 
              exceptional service.
            </FooterText>
            <SocialLinks>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <SocialLink
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    platform={social.platform}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.label}
                  >
                    <IconComponent />
                  </SocialLink>
                );
              })}
            </SocialLinks>
          </FooterSection>

          <FooterSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ alignItems: 'center', textAlign: 'center' }}
          >
            <FooterTitle>Quick Links</FooterTitle>
            {quickLinks.map((link, index) => (
              <FooterLink key={index} to={link.to}>
                <span>{link.label}</span>
              </FooterLink>
            ))}
          </FooterSection>

          <FooterSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FooterTitle>Contact Info</FooterTitle>
            <ContactInfo>
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <ContactItem
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ContactIcon>
                      <IconComponent />
                    </ContactIcon>
                    <ContactText>
                      {item.text.split('\n').map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </ContactText>
                  </ContactItem>
                );
              })}
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <FooterLogo to="/">Aristo</FooterLogo>
          <LegalLinks>
            {legalLinks.map((link, index) => (
              <ExternalLink 
                key={index} 
                href={link.href}
                onClick={(e) => e.preventDefault()}
              >
                {link.label}
              </ExternalLink>
            ))}
          </LegalLinks>
          <Copyright>
            © {new Date().getFullYear()} Aristo Bar. All rights reserved.
          </Copyright>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;