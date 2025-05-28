import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: ${props => props.theme.background};
`;

const AboutHeader = styled.section`
  text-align: center;
  padding: 3rem 2rem;
  background: ${props => props.theme.surface};
`;

const AboutTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const AboutSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StorySection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StoryContent = styled(motion.div)`
  padding: 2rem 0;
`;

const StoryTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const StoryText = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  text-align: justify;
`;

const StoryImage = styled(motion.div)`
  width: 100%;
  height: 400px;
  background: url('https://images.unsplash.com/photo-1572947650737-1d38b64e03c3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px ${props => props.theme.shadow};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${props => props.theme.primary}22 0%,
      transparent 50%,
      ${props => props.theme.primary}11 100%
    );
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.7;
  }
`;

const HoursSection = styled.section`
  background: ${props => props.theme.surface};
  padding: 5rem 2rem;
`;

const HoursContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const HoursTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: ${props => props.theme.text};
  margin-bottom: 3rem;
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const HoursCard = styled(motion.div)`
  background: ${props => props.theme.background};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
`;

const HoursCardTitle = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.primary};
  margin-bottom: 1rem;
`;

const HoursCardContent = styled.div`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
`;

const TeamSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: ${props => props.theme.text};
  text-align: center;
  margin-bottom: 3rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled(motion.div)`
  text-align: center;
  background: ${props => props.theme.surface};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.theme.shadow};
  }
`;

const TeamAvatar = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  background: ${props => props.imageUrl 
    ? `url(${props.imageUrl})` 
    : props.theme.gradient};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 10px 25px ${props => props.theme.shadow};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.imageUrl 
      ? 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.1) 100%)' 
      : 'none'};
  }
`;

const TeamName = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
`;

const TeamRole = styled.p`
  color: ${props => props.theme.primary};
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TeamDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  font-size: 0.95rem;
`;

const About = () => {
  const storyRef = useRef(null);
  const hoursRef = useRef(null);
  const teamRef = useRef(null);
  
  const storyInView = useInView(storyRef, { once: true });
  const hoursInView = useInView(hoursRef, { once: true });
  const teamInView = useInView(teamRef, { once: true });

  const hours = [
    {
      title: 'Monday - Thursday',
      content: '5:00 PM - 12:00 AM\nHappy Hour: 5:00 PM - 7:00 PM'
    },
    {
      title: 'Friday - Saturday',
      content: '4:00 PM - 2:00 AM\nLive Music: 9:00 PM - 1:00 AM'
    },
    {
      title: 'Sunday',
      content: '4:00 PM - 11:00 PM\nBrunch: 11:00 AM - 3:00 PM'
    }
  ];

  const team = [
    {
      name: 'Marcus Chen',
      role: 'Head Bartender',
      description: 'Award-winning mixologist with 15 years of experience crafting innovative cocktails.',
      avatar: '👨‍🍳',
      image: 'https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Sofia Rodriguez',
      role: 'Bar Manager',
      description: 'Passionate about creating exceptional guest experiences and curating our wine selection.',
      avatar: '👩‍💼',
      image: 'https://images.unsplash.com/photo-1536180931879-fd2d652efddc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'James Wilson',
      role: 'Sommelier',
      description: 'Certified sommelier specializing in rare wines and perfect food pairings.',
      avatar: '🍷',
      image: 'https://images.unsplash.com/photo-1595347097560-69238724e7bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <AboutContainer>
      <AboutHeader>
        <AboutTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Aristo
        </AboutTitle>
        <AboutSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover the story behind our sophisticated urban bar and the passion that drives us
        </AboutSubtitle>
      </AboutHeader>

      <StorySection ref={storyRef}>
        <StoryGrid>
          <StoryContent
            initial={{ opacity: 0, x: -50 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <StoryTitle>Our Story</StoryTitle>
            <StoryText>
              Founded in 2018, Aristo emerged from a vision to create a sophisticated urban oasis 
              where craft meets culture. Our founders, passionate about both mixology and music, 
              wanted to establish a space that would become the heartbeat of the city's nightlife.
            </StoryText>
            <StoryText>
              Located in the vibrant downtown district, Aristo has become synonymous with 
              exceptional cocktails, curated music, and an atmosphere that perfectly balances 
              elegance with urban energy. Every detail, from our handcrafted cocktails to our 
              carefully selected playlist, is designed to create an unforgettable experience.
            </StoryText>
          </StoryContent>
          
          <StoryImage
            initial={{ opacity: 0, x: 50 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          />
        </StoryGrid>
      </StorySection>

      <HoursSection ref={hoursRef}>
        <HoursContainer>
          <HoursTitle
            initial={{ opacity: 0, y: 30 }}
            animate={hoursInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Hours & Events
          </HoursTitle>
          
          <HoursGrid>
            {hours.map((hour, index) => (
              <HoursCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={hoursInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <HoursCardTitle>{hour.title}</HoursCardTitle>
                <HoursCardContent>
                  {hour.content.split('\n').map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </HoursCardContent>
              </HoursCard>
            ))}
          </HoursGrid>
        </HoursContainer>
      </HoursSection>

      <TeamSection ref={teamRef}>
        <TeamTitle
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </TeamTitle>
        
        <TeamGrid>
          {team.map((member, index) => (
            <TeamMember
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <TeamAvatar imageUrl={member.image}>
                {!member.image && member.avatar}
              </TeamAvatar>
              <TeamName>{member.name}</TeamName>
              <TeamRole>{member.role}</TeamRole>
              <TeamDescription>{member.description}</TeamDescription>
            </TeamMember>
          ))}
        </TeamGrid>
      </TeamSection>
    </AboutContainer>
  );
};

export default About; 