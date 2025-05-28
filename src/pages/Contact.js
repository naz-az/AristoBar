import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: ${props => props.theme.background};
`;

const ContactHeader = styled.section`
  text-align: center;
  padding: 3rem 2rem;
  background: ${props => props.theme.surface};
`;

const ContactTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const ContactSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const MapSection = styled(motion.div)`
  margin-top: 2rem;
  margin-bottom: -1rem;
`;

const MapContainer = styled.div`
  background: ${props => props.theme.surface};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
  height: 400px;
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 50px ${props => props.theme.shadow};
  }

  transition: all 0.3s ease;
`;

const InteractiveMap = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  filter: hue-rotate(15deg) saturate(0.8);
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfoSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
`;

const InfoCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  flex: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled(motion.div)`
  background: ${props => props.theme.surface};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 200px;

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
    transform: translateY(-5px);
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

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 20px ${props => props.theme.primary}33;

  svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  font-weight: 700;
`;

const InfoText = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const InfoLink = styled.a`
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const SocialCard = styled(InfoCard)`
  text-align: center;
  margin-top: 4rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a)`
  width: 55px;
  height: 55px;
  background: ${props => props.theme.surface};
  border: 2px solid ${props => props.theme.primary}33;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px ${props => props.theme.shadow};

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
    box-shadow: 0 15px 30px ${props => props.theme.shadow};
  }

  &:hover::before {
    transform: scale(1);
  }

  svg {
    position: relative;
    z-index: 2;
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
`;

const ContactFormSection = styled(motion.div)`
  background: ${props => props.theme.surface};
  padding: 3rem;
  border-radius: 25px;
  box-shadow: 0 15px 40px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
  position: relative;
  overflow: hidden;
  height: fit-content;

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

  &:hover::before {
    opacity: 0.02;
  }

  * {
    position: relative;
    z-index: 2;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
  text-align: center;
  font-weight: 700;
`;

const FormSubtitle = styled.p`
  color: ${props => props.theme.textSecondary};
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  color: ${props => props.theme.text};
  font-weight: 600;
  font-size: 0.95rem;
`;

const FormInput = styled.input`
  padding: 1.2rem;
  border: 2px solid ${props => props.theme.primary}33;
  border-radius: 15px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 4px ${props => props.theme.primary}22;
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

const FormTextarea = styled.textarea`
  padding: 1.2rem;
  border: 2px solid ${props => props.theme.primary}33;
  border-radius: 15px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 1rem;
  min-height: 140px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 4px ${props => props.theme.primary}22;
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

const FormButton = styled(motion.button)`
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px ${props => props.theme.primary}33;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px ${props => props.theme.primary}44;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  margin-top: 1.5rem;
  box-shadow: 0 10px 25px rgba(76, 175, 80, 0.3);
`;

// Icon Components
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: LocationIcon,
      title: 'Our Location',
      text: '27, Jln Mesui, Bukit Bintang\n50200 Kuala Lumpur\nWilayah Persekutuan Kuala Lumpur',
      link: null
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      text: '+60 3-2110 0973',
      link: 'tel:+60321100973'
    },
    {
      icon: EmailIcon,
      title: 'Email Us',
      text: 'info@aristobar.com\nreservations@aristobar.com',
      link: 'mailto:info@aristobar.com'
    },
    {
      icon: ClockIcon,
      title: 'Opening Hours',
      text: 'Mon-Thu: 5:00 PM - 12:00 AM\nFri-Sat: 4:00 PM - 2:00 AM\nSun: 4:00 PM - 11:00 PM',
      link: null
    }
  ];

  const socialLinks = [
    { icon: FacebookIcon, url: 'https://facebook.com/aristobar', label: 'Facebook', platform: 'facebook' },
    { icon: InstagramIcon, url: 'https://instagram.com/aristobar', label: 'Instagram', platform: 'instagram' },
    { icon: TwitterIcon, url: 'https://twitter.com/aristobar', label: 'Twitter', platform: 'twitter' },
    { icon: YouTubeIcon, url: 'https://youtube.com/aristobar', label: 'YouTube', platform: 'youtube' },
    { icon: TikTokIcon, url: 'https://tiktok.com/@aristobar', label: 'TikTok', platform: 'tiktok' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <ContactContainer>
      <ContactHeader>
        <ContactTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </ContactTitle>
        <ContactSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Get in touch with us for reservations, events, or any inquiries. We'd love to hear from you!
        </ContactSubtitle>
      </ContactHeader>

      <ContactContent>
        <MainContent>
          <ContactInfoSection
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <InfoCardsGrid>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <InfoCard
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <InfoIcon>
                      <IconComponent />
                    </InfoIcon>
                    <InfoTitle>{info.title}</InfoTitle>
                    {info.text.split('\n').map((line, idx) => (
                      <InfoText key={idx}>
                        {info.link && idx === 0 ? (
                          <InfoLink href={info.link}>{line}</InfoLink>
                        ) : (
                          line
                        )}
                      </InfoText>
                    ))}
                  </InfoCard>
                );
              })}
            </InfoCardsGrid>
          </ContactInfoSection>

          <ContactFormSection
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FormTitle>Send us a Message</FormTitle>
            <FormSubtitle>We'll get back to you within 24 hours</FormSubtitle>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="name">Full Name *</FormLabel>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="email">Email Address *</FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <FormInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+60 3-2110 0973"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="subject">Subject *</FormLabel>
                  <FormInput
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this regarding?"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel htmlFor="message">Message *</FormLabel>
                <FormTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </FormGroup>

              <FormButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </FormButton>

              {showSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  Thank you for your message! We'll get back to you soon.
                </SuccessMessage>
              )}
            </Form>
          </ContactFormSection>
        </MainContent>

        <MapSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MapContainer>
            <InteractiveMap
              src="https://maps.google.com/maps?q=27,+Jln+Mesui,+Bukit+Bintang,+50200+Kuala+Lumpur,+Wilayah+Persekutuan+Kuala+Lumpur&output=embed"
              title="Aristo Bar Location - 27, Jln Mesui, Bukit Bintang, Kuala Lumpur"
              allowFullScreen
            />
          </MapContainer>
        </MapSection>

        <SocialCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <InfoIcon>
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </InfoIcon>
          <InfoTitle>Follow Us</InfoTitle>
          <InfoText>Stay connected with us on social media for updates and exclusive events</InfoText>
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
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                >
                  <IconComponent />
                </SocialLink>
              );
            })}
          </SocialLinks>
        </SocialCard>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact; 