import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: ${props => props.theme.background};
`;

const GalleryHeader = styled.section`
  text-align: center;
  padding: 3rem 2rem;
  background: ${props => props.theme.surface};
`;

const GalleryTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const GallerySubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const GalleryContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
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
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  height: ${props => props.height || '300px'};
  background: ${props => props.theme.gradient};
  box-shadow: 0 10px 30px ${props => props.theme.shadow};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px ${props => props.theme.shadow};
  }
`;

const GalleryImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  
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
      rgba(0,0,0,0.2) 100%
    );
  }
`;

const GalleryOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const GalleryItemTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const GalleryItemDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.4;
`;

const GalleryItemStyled = styled(GalleryItem)`
  &:hover ${GalleryOverlay} {
    opacity: 1;
  }
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const LightboxContent = styled(motion.div)`
  max-width: 90vw;
  max-height: 90vh;
  background: ${props => props.theme.surface};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const LightboxImage = styled.div`
  width: 100%;
  height: 60vh;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${props => props.theme.primary}11 0%,
      transparent 50%,
      rgba(0,0,0,0.1) 100%
    );
  }
`;

const LightboxInfo = styled.div`
  padding: 2rem;
`;

const LightboxTitle = styled.h2`
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const LightboxDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const LightboxTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const LightboxTag = styled.span`
  background: ${props => props.theme.primary}22;
  color: ${props => props.theme.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Interior' },
    { id: 'cocktails', label: 'Cocktails' },
    { id: 'events', label: 'Events' },
    { id: 'atmosphere', label: 'Atmosphere' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Main Bar Area',
      description: 'Our sophisticated main bar featuring premium spirits and elegant lighting.',
      category: 'interior',
      icon: '🍸',
      image: 'https://images.unsplash.com/photo-1572947650737-1d38b64e03c3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      height: '350px',
      tags: ['Interior', 'Bar', 'Lighting']
    },
    {
      id: 2,
      title: 'Signature Cocktails',
      description: 'Expertly crafted cocktails using the finest ingredients and creative presentation.',
      category: 'cocktails',
      icon: '🍹',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      height: '280px',
      tags: ['Cocktails', 'Mixology', 'Premium']
    },
    {
      id: 3,
      title: 'Live Jazz Performance',
      description: 'Intimate live music sessions that create the perfect ambiance for your evening.',
      category: 'events',
      icon: '🎷',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      height: '400px',
      tags: ['Live Music', 'Jazz', 'Entertainment']
    },
    {
      id: 4,
      title: 'VIP Lounge',
      description: 'Exclusive seating area with premium service and sophisticated atmosphere.',
      category: 'interior',
      icon: '🛋️',
      image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      height: '320px',
      tags: ['VIP', 'Lounge', 'Exclusive']
    },
    {
      id: 5,
      title: 'Evening Atmosphere',
      description: 'The warm, inviting glow of Aristo during peak evening hours.',
      category: 'atmosphere',
      icon: '🌃',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      height: '300px',
      tags: ['Evening', 'Ambiance', 'Lighting']
    },
    {
      id: 6,
      title: 'Wine Collection',
      description: 'Our carefully curated selection of rare and premium wines from around the world.',
      category: 'cocktails',
      icon: '🍷',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      height: '360px',
      tags: ['Wine', 'Collection', 'Premium']
    },
    {
      id: 7,
      title: 'Private Event Setup',
      description: 'Customized arrangements for private events and corporate gatherings.',
      category: 'events',
      icon: '🎉',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      height: '290px',
      tags: ['Private Events', 'Corporate', 'Setup']
    },
    {
      id: 8,
      title: 'Outdoor Terrace',
      description: 'Our beautiful outdoor terrace offering city views and fresh air dining.',
      category: 'interior',
      icon: '🌆',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      height: '380px',
      tags: ['Outdoor', 'Terrace', 'City Views']
    },
    {
      id: 9,
      title: 'Bartender at Work',
      description: 'Our skilled bartenders crafting perfect cocktails with precision and artistry.',
      category: 'atmosphere',
      icon: '👨‍🍳',
      image: 'https://images.unsplash.com/photo-1438557068880-c5f474830377?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      height: '340px',
      tags: ['Bartender', 'Craftsmanship', 'Skill']
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

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
    <GalleryContainer>
      <GalleryHeader>
        <GalleryTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Gallery
        </GalleryTitle>
        <GallerySubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore the sophisticated atmosphere and elegant details that make Aristo unique
        </GallerySubtitle>
      </GalleryHeader>

      <GalleryContent>
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
          <GalleryGrid
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredItems.map((item) => (
              <GalleryItemStyled
                key={item.id}
                height={item.height}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(item)}
                layout
              >
                <GalleryImage imageUrl={item.image} />
                <GalleryOverlay>
                  <GalleryItemTitle>{item.title}</GalleryItemTitle>
                  <GalleryItemDescription>{item.description}</GalleryItemDescription>
                </GalleryOverlay>
              </GalleryItemStyled>
            ))}
          </GalleryGrid>
        </AnimatePresence>
      </GalleryContent>

      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <LightboxContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </CloseButton>
              
              <LightboxImage imageUrl={selectedImage.image} />
              
              <LightboxInfo>
                <LightboxTitle>{selectedImage.title}</LightboxTitle>
                <LightboxDescription>{selectedImage.description}</LightboxDescription>
                <LightboxTags>
                  {selectedImage.tags.map((tag, index) => (
                    <LightboxTag key={index}>{tag}</LightboxTag>
                  ))}
                </LightboxTags>
              </LightboxInfo>
            </LightboxContent>
          </Lightbox>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default Gallery; 