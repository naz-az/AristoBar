import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const MenuContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: ${props => props.theme.background};
`;

const MenuHeader = styled.section`
  text-align: center;
  padding: 3rem 2rem;
  background: ${props => props.theme.surface};
`;

const MenuTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
`;

const MenuSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const MenuContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const TabNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid ${props => props.theme.primary}33;
  // overflow-x: auto;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.5rem;
    justify-items: center;
    max-width: 400px;
    margin: 0 auto 3rem auto;
  }
`;

const Tab = styled(motion.button)`
  padding: 1rem 2rem;
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.primary : props.theme.textSecondary};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.theme.primary};
    transform: scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.3s ease;
  }
`;

const MenuGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MenuItem = styled(motion.div)`
  background: ${props => props.theme.surface};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px ${props => props.theme.shadow};
  border: 1px solid ${props => props.theme.primary}22;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px ${props => props.theme.shadow};
  }
`;

const ItemImage = styled(motion.div)`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${props => props.theme.primary}11,
      transparent 50%,
      ${props => props.theme.primary}08
    );
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 0.3;
  }
`;

const ItemContent = styled.div`
  padding: 2rem;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ItemName = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.text};
  margin-bottom: 0.5rem;
  flex: 1;
`;

const ItemPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  margin-left: 1rem;
`;

const ItemDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const ItemIngredients = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Ingredient = styled.span`
  background: ${props => props.theme.primary}22;
  color: ${props => props.theme.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const SpecialBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.gradient};
  color: white;
  padding: 0.3rem 0.8rem;
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
  max-width: 600px;
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

const ModalBody = styled.div`
  padding: 2rem;
  padding-top: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.text};
  margin: 0;
  flex: 1;
`;

const ModalPrice = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  margin-left: 1rem;
`;

const ModalDescription = styled.p`
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

const ModalIngredients = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
`;

const ModalIngredient = styled(motion.div)`
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

const Menu = () => {
  const [activeTab, setActiveTab] = useState('cocktails');
  const [selectedItem, setSelectedItem] = useState(null);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const tabs = [
    { id: 'cocktails', label: 'Signature Cocktails' },
    { id: 'wines', label: 'Wines' },
    { id: 'beers', label: 'Craft Beers' },
    { id: 'nonalcoholic', label: 'Non-Alcoholic' }
  ];

  const menuData = {
    cocktails: [
      {
        name: 'Aristo Martini',
        price: '$16',
        description: 'Our signature martini with premium gin, dry vermouth, and a twist of lemon',
        ingredients: ['Premium Gin', 'Dry Vermouth', 'Lemon Twist', 'Olives'],
        special: 'Signature',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Golden Hour',
        price: '$14',
        description: 'Bourbon whiskey with honey syrup, fresh lemon, and a hint of thyme',
        ingredients: ['Bourbon', 'Honey Syrup', 'Fresh Lemon', 'Thyme'],
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Urban Sunset',
        price: '$15',
        description: 'Tequila blanco with fresh grapefruit, lime, and jalapeño',
        ingredients: ['Tequila Blanco', 'Grapefruit', 'Lime', 'Jalapeño'],
        image: 'https://plus.unsplash.com/premium_photo-1679075335396-c374c482dfdd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Midnight in Paris',
        price: '$17',
        description: 'Cognac with blackberry liqueur, lemon juice, and champagne',
        ingredients: ['Cognac', 'Blackberry Liqueur', 'Lemon', 'Champagne'],
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Smoky Manhattan',
        price: '$16',
        description: 'Rye whiskey with sweet vermouth and a touch of mezcal',
        ingredients: ['Rye Whiskey', 'Sweet Vermouth', 'Mezcal', 'Cherry'],
        image: 'https://images.unsplash.com/photo-1586734565046-d83481ba20aa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Garden Gimlet',
        price: '$13',
        description: 'Gin with elderflower liqueur, cucumber, and fresh basil',
        ingredients: ['Gin', 'Elderflower', 'Cucumber', 'Basil'],
        image: 'https://images.unsplash.com/photo-1657313666513-70770d329ef4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ],
    wines: [
      {
        name: 'Château Margaux 2015',
        price: '$25',
        description: 'Full-bodied Bordeaux with notes of dark fruit and oak',
        ingredients: ['Cabernet Sauvignon', 'Merlot', 'Petit Verdot'],
        special: 'Premium',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Sancerre Loire Valley',
        price: '$12',
        description: 'Crisp Sauvignon Blanc with citrus and mineral notes',
        ingredients: ['Sauvignon Blanc'],
        image: 'https://images.unsplash.com/photo-1737692584305-f63b02984ac2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Barolo Piedmont',
        price: '$18',
        description: 'Complex Nebbiolo with cherry, rose, and earthy undertones',
        ingredients: ['Nebbiolo'],
        image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Champagne Dom Pérignon',
        price: '$35',
        description: 'Prestigious champagne with fine bubbles and elegant complexity',
        ingredients: ['Chardonnay', 'Pinot Noir'],
        special: 'Luxury',
        image: 'https://images.unsplash.com/photo-1580657264608-44775e61c0a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ],
    beers: [
      {
        name: 'Aristo IPA',
        price: '$8',
        description: 'Our house-brewed IPA with citrus hops and caramel malt',
        ingredients: ['Citrus Hops', 'Caramel Malt', 'Cascade Hops'],
        special: 'House Brew',
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Belgian Tripel',
        price: '$9',
        description: 'Traditional Belgian ale with spicy and fruity notes',
        ingredients: ['Belgian Yeast', 'Pilsner Malt', 'Coriander'],
        image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Stout Porter',
        price: '$7',
        description: 'Rich and creamy stout with chocolate and coffee notes',
        ingredients: ['Roasted Barley', 'Chocolate Malt', 'Coffee'],
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Wheat Beer',
        price: '$6',
        description: 'Light and refreshing wheat beer with orange peel',
        ingredients: ['Wheat', 'Orange Peel', 'Coriander'],
        image: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?w=500&h=300&fit=crop&auto=format'
      }
    ],
    nonalcoholic: [
      {
        name: 'Virgin Mojito',
        price: '$8',
        description: 'Fresh mint, lime, and soda water with a touch of sweetness',
        ingredients: ['Fresh Mint', 'Lime', 'Soda Water', 'Simple Syrup'],
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Cucumber Cooler',
        price: '$7',
        description: 'Refreshing blend of cucumber, lime, and sparkling water',
        ingredients: ['Cucumber', 'Lime', 'Sparkling Water', 'Mint'],
        image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Ginger Fizz',
        price: '$6',
        description: 'Spicy ginger beer with fresh lemon and herbs',
        ingredients: ['Ginger Beer', 'Fresh Lemon', 'Thyme', 'Honey'],
        image: 'https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=500&h=300&fit=crop&auto=format'
      },
      {
        name: 'Berry Lemonade',
        price: '$7',
        description: 'House-made lemonade with mixed berries and mint',
        ingredients: ['Mixed Berries', 'Fresh Lemon', 'Mint', 'Agave'],
        image: 'https://images.unsplash.com/photo-1685156330898-88eb2fdd66aa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ]
  };

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
    <MenuContainer>
      <MenuHeader>
        <MenuTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Menu
        </MenuTitle>
        <MenuSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover our carefully curated selection of premium cocktails, wines, and craft beverages
        </MenuSubtitle>
      </MenuHeader>

      <MenuContent>
        <TabNavigation>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </Tab>
          ))}
        </TabNavigation>

        <AnimatePresence mode="wait">
          <MenuGrid
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {menuData[activeTab].map((item, index) => (
              <MenuItem
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={() => handleItemClick(item)}
              >
                {item.special && <SpecialBadge>{item.special}</SpecialBadge>}
                <ItemImage
                  imageUrl={item.image}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <ItemContent>
                  <ItemHeader>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>{item.price}</ItemPrice>
                  </ItemHeader>
                  <ItemDescription>{item.description}</ItemDescription>
                  <ItemIngredients>
                    {item.ingredients.map((ingredient, idx) => (
                      <Ingredient key={idx}>{ingredient}</Ingredient>
                    ))}
                  </ItemIngredients>
                </ItemContent>
              </MenuItem>
            ))}
          </MenuGrid>
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
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
                
                {selectedItem.special && (
                  <SpecialBadge style={{ top: '1rem', left: '1rem', right: 'auto' }}>
                    {selectedItem.special}
                  </SpecialBadge>
                )}
                
                <ModalImage
                  imageUrl={selectedItem.image}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
                <ModalBody>
                  <ModalHeader>
                    <ModalTitle>{selectedItem.name}</ModalTitle>
                    <ModalPrice>{selectedItem.price}</ModalPrice>
                  </ModalHeader>
                  
                  <ModalDescription>{selectedItem.description}</ModalDescription>
                  
                  <IngredientsSection>
                    <IngredientsTitle>Ingredients</IngredientsTitle>
                    <ModalIngredients>
                      {selectedItem.ingredients.map((ingredient, idx) => (
                        <ModalIngredient
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {ingredient}
                        </ModalIngredient>
                      ))}
                    </ModalIngredients>
                  </IngredientsSection>
                  
                  <ActionButtons>
                    <ActionButton
                      className="primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Order Now
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
      </MenuContent>
    </MenuContainer>
  );
};

export default Menu; 