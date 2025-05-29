import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Theme definitions
const lightTheme = {
  primary: '#d4af37',
  secondary: '#2c1810',
  background: '#ffffff',
  surface: '#f8f8f8',
  text: '#2c1810',
  textSecondary: '#666666',
  accent: '#c9a96e',
  shadow: 'rgba(44, 24, 16, 0.1)',
  gradient: 'linear-gradient(135deg, #d4af37 0%, #c9a96e 100%)',
};

const darkTheme = {
  primary: '#d4af37',
  secondary: '#f8f8f8',
  background: '#1a1a1a',
  surface: '#2a2a2a',
  text: '#ffffff',
  textSecondary: '#cccccc',
  accent: '#c9a96e',
  shadow: 'rgba(0, 0, 0, 0.3)',
  gradient: 'linear-gradient(135deg, #d4af37 0%, #c9a96e 100%)',
};

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.accent};
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${props => props.theme.primary} ${props => props.theme.surface};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeContextValue = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router>
          <ScrollToTop />
          <AppContainer>
            <Navbar />
            <MainContent>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </MainContent>
            <Newsletter />
            <Footer />
            <FloatingWhatsApp />
          </AppContainer>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
