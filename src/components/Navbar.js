import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${props => props.scrolled 
    ? `${props.theme.background}ee` 
    : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
  border-bottom: ${props => props.scrolled 
    ? `1px solid ${props.theme.primary}33` 
    : 'none'};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: ${props => props.theme.text};
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled.button`
  background: ${props => props.theme.surface};
  border: 2px solid ${props => props.theme.primary};
  border-radius: 50px;
  width: 50px;
  height: 26px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ThemeToggleThumb = styled(motion.div)`
  width: 18px;
  height: 18px;
  background: ${props => props.theme.primary};
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${props => props.isDark ? '28px' : '2px'};
  transition: left 0.3s ease;
`;

const MobileThemeToggle = styled(ThemeToggle)`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuLine = styled(motion.div)`
  width: 25px;
  height: 3px;
  background: ${props => props.theme.text};
  border-radius: 2px;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: ${props => props.theme.background};
  border-bottom: 1px solid ${props => props.theme.primary}33;
  backdrop-filter: blur(10px);
  padding: 2rem;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  color: ${props => props.theme.text};
  font-weight: 500;
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.surface};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  const menuLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (i) => ({
      rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
      y: i === 0 ? 7 : i === 2 ? -7 : 0,
      opacity: i === 1 ? 0 : 1,
    }),
  };

  return (
    <>
      <NavbarContainer
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContent>
          <Logo to="/">Aristo</Logo>
          
          <NavLinks>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                active={location.pathname === item.path}
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle onClick={toggleTheme}>
              <ThemeToggleThumb isDark={isDarkMode} />
            </ThemeToggle>
          </NavLinks>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MobileThemeToggle onClick={toggleTheme}>
              <ThemeToggleThumb isDark={isDarkMode} />
            </MobileThemeToggle>
            
            <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {[0, 1, 2].map((i) => (
                <MenuLine
                  key={i}
                  custom={i}
                  variants={menuLineVariants}
                  animate={mobileMenuOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </MobileMenuButton>
          </div>
        </NavContent>
      </NavbarContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 