import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const EventsContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: ${props => props.theme.background};
`;

const EventsHeader = styled.section`
  text-align: center;
  padding: 3rem 2rem;
  background: ${props => props.theme.surface};
`;

const EventsTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const EventsSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const EventsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    gap: 0.8rem;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
  }
`;

const FilterTab = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: 2px solid ${props => props.theme.primary};
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    max-width: 90%;
    text-align: center;
    padding: 0.8rem 1rem;
  }
`;

const EventsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const EventCard = styled(motion.div)`
  background: ${props => props.theme.surface};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.theme.shadow};
  }
`;

const EventImage = styled.div`
  height: 200px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${props => props.theme.primary}33 0%,
      transparent 50%,
      rgba(0,0,0,0.3) 100%
    );
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.7;
  }
`;

const EventContent = styled.div`
  padding: 2rem;
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DateBox = styled.div`
  background: ${props => props.theme.primary};
  color: white;
  padding: 0.5rem;
  border-radius: 10px;
  text-align: center;
  min-width: 60px;
`;

const DateDay = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
`;

const DateMonth = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const EventTime = styled.div`
  color: ${props => props.theme.textSecondary};
  font-weight: 500;
`;

const EventTitle = styled.h3`
  font-size: 1.4rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
`;

const EventDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const EventTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const EventTag = styled.span`
  background: ${props => props.theme.primary}22;
  color: ${props => props.theme.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const EventPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;

const BookButton = styled(motion.button)`
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px ${props => props.theme.shadow};
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.gradient};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

// Modal Components
const ModalOverlay = styled(motion.div)`
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

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.surface};
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.primary}33;
  position: relative;
`;

const CloseButton = styled(motion.button)`
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

const ModalImage = styled(motion.div)`
  width: 100%;
  height: 350px;
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

const ModalBody = styled.div`
  padding: 2rem;
  padding-top: 1rem;
`;

const ModalHeader = styled.div`
  margin-bottom: 2rem;
`;

const ModalDateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ModalDateBox = styled.div`
  background: ${props => props.theme.gradient};
  color: white;
  padding: 1rem;
  border-radius: 15px;
  text-align: center;
  min-width: 80px;
`;

const ModalDateDay = styled.div`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
`;

const ModalDateMonth = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.2rem;
`;

const ModalTimeInfo = styled.div`
  flex: 1;
`;

const ModalTime = styled.div`
  color: ${props => props.theme.textSecondary};
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ModalPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;

const ModalTitle = styled.h2`
  font-size: 2.2rem;
  color: ${props => props.theme.text};
  margin: 0 0 1rem 0;
  line-height: 1.2;
`;

const ModalDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const TagsSection = styled.div`
  margin-bottom: 2rem;
`;

const TagsTitle = styled.h3`
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const ModalTag = styled(motion.div)`
  background: ${props => props.theme.primary}22;
  color: ${props => props.theme.primary};
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid ${props => props.theme.primary}33;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.theme.primary}33;
    transform: translateY(-2px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled(motion.button)`
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

const EventIcon = styled.div`
  font-size: 2rem;
  margin-left: 1rem;
`;

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
      }
    };

    if (selectedEvent) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'music', label: 'Live Music' },
    { id: 'special', label: 'Special Events' },
    { id: 'private', label: 'Private Events' }
  ];

  const events = [
    {
      id: 1,
      title: 'Jazz Night with Sarah Mitchell',
      description: 'Experience an intimate evening of smooth jazz with renowned vocalist Sarah Mitchell and her quartet.',
      date: { day: '15', month: 'Jun' },
      time: '9:00 PM - 12:00 AM',
      price: '$25',
      category: 'music',
      tags: ['Jazz', 'Live Music', 'Vocalist'],
      icon: '🎷',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop&auto=format&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Cocktail Masterclass',
      description: 'Learn the art of mixology with our head bartender. Create three signature cocktails and enjoy them!',
      date: { day: '18', month: 'Jun' },
      time: '7:00 PM - 9:00 PM',
      price: '$45',
      category: 'special',
      tags: ['Cocktails', 'Workshop', 'Interactive'],
      icon: '🍸',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      title: 'Acoustic Sessions',
      description: 'Unplugged performances by local indie artists in an intimate setting.',
      date: { day: '22', month: 'Jun' },
      time: '8:00 PM - 11:00 PM',
      price: '$15',
      category: 'music',
      tags: ['Acoustic', 'Indie', 'Local Artists'],
      icon: '🎸',
      image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=500&h=300&fit=crop&auto=format&q=80'
    },
    {
      id: 4,
      title: 'Wine Tasting Evening',
      description: 'Explore rare wines from around the world with our sommelier. Includes cheese pairings.',
      date: { day: '25', month: 'Jun' },
      time: '6:30 PM - 8:30 PM',
      price: '$55',
      category: 'special',
      tags: ['Wine', 'Tasting', 'Sommelier'],
      icon: '🍷',
      image: 'https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 5,
      title: 'Corporate Event Space',
      description: 'Host your next corporate event in our sophisticated space. Customizable packages available.',
      date: { day: '28', month: 'Jun' },
      time: 'Flexible',
      price: 'Contact',
      category: 'private',
      tags: ['Corporate', 'Private', 'Customizable'],
      icon: '🏢',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=300&fit=crop&auto=format&q=80'
    },
    {
      id: 6,
      title: 'Latin Night',
      description: 'Dance the night away with live Latin music, specialty cocktails, and vibrant atmosphere.',
      date: { day: '30', month: 'Jun' },
      time: '9:00 PM - 2:00 AM',
      price: '$20',
      category: 'music',
      tags: ['Latin', 'Dance', 'Live Music'],
      icon: '💃',
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500&h=300&fit=crop&auto=format&q=80',
      featured: true
    }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.category === activeFilter);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <EventsContainer>
      <EventsHeader>
        <EventsTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Events & Entertainment
        </EventsTitle>
        <EventsSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join us for unforgettable nights of music, cocktails, and sophisticated entertainment
        </EventsSubtitle>
      </EventsHeader>

      <EventsContent>
        <FilterTabs>
          {filters.map((filter) => (
            <FilterTab
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>

        <AnimatePresence mode="wait">
          <EventsGrid
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
                style={{ cursor: 'pointer' }}
                onClick={() => handleEventClick(event)}
              >
                {event.featured && <FeaturedBadge>Featured</FeaturedBadge>}
                
                <EventImage imageUrl={event.image} />
                
                <EventContent>
                  <EventDate>
                    <DateBox>
                      <DateDay>{event.date.day}</DateDay>
                      <DateMonth>{event.date.month}</DateMonth>
                    </DateBox>
                    <EventTime>{event.time}</EventTime>
                  </EventDate>
                  
                  <EventTitle>{event.title}</EventTitle>
                  <EventDescription>{event.description}</EventDescription>
                  
                  <EventTags>
                    {event.tags.map((tag, index) => (
                      <EventTag key={index}>{tag}</EventTag>
                    ))}
                  </EventTags>
                  
                  <EventPrice>
                    <Price>{event.price}</Price>
                    <BookButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle booking logic here
                      }}
                    >
                      {event.price === 'Contact' ? 'Inquire' : 'Book Now'}
                    </BookButton>
                  </EventPrice>
                </EventContent>
              </EventCard>
            ))}
          </EventsGrid>
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleOverlayClick}
            >
              <ModalContent
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
                <CloseButton
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </CloseButton>
                
                {selectedEvent.featured && (
                  <FeaturedBadge style={{ top: '1rem', left: '1rem', right: 'auto' }}>
                    Featured
                  </FeaturedBadge>
                )}
                
                <ModalImage
                  imageUrl={selectedEvent.image}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
                <ModalBody>
                  <ModalHeader>
                    <ModalDateSection>
                      <ModalDateBox>
                        <ModalDateDay>{selectedEvent.date.day}</ModalDateDay>
                        <ModalDateMonth>{selectedEvent.date.month}</ModalDateMonth>
                      </ModalDateBox>
                      <ModalTimeInfo>
                        <ModalTime>{selectedEvent.time}</ModalTime>
                        <ModalPrice>{selectedEvent.price}</ModalPrice>
                      </ModalTimeInfo>
                      <EventIcon>{selectedEvent.icon}</EventIcon>
                    </ModalDateSection>
                    
                    <ModalTitle>{selectedEvent.title}</ModalTitle>
                  </ModalHeader>
                  
                  <ModalDescription>{selectedEvent.description}</ModalDescription>
                  
                  <TagsSection>
                    <TagsTitle>Event Details</TagsTitle>
                    <ModalTags>
                      {selectedEvent.tags.map((tag, idx) => (
                        <ModalTag
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tag}
                        </ModalTag>
                      ))}
                    </ModalTags>
                  </TagsSection>
                  
                  <ActionButtons>
                    <ActionButton
                      className="primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {selectedEvent.price === 'Contact' ? 'Inquire Now' : 'Book Event'}
                    </ActionButton>
                    <ActionButton
                      className="secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCloseModal}
                    >
                      Close
                    </ActionButton>
                  </ActionButtons>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </EventsContent>
    </EventsContainer>
  );
};

export default Events;