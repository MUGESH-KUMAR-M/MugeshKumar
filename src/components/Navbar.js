import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    padding: scrolled ? '0.8rem 0' : '1.5rem 0',
    backgroundColor: scrolled ? 'rgba(18, 18, 18, 0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  };

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#64ffda',
    textDecoration: 'none',
    letterSpacing: '1px',
  };

  const hamburgerStyle = {
    display: isMobile ? 'block' : 'none',
    cursor: 'pointer',
  };

  const navLinksStyle = {
    display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flexDirection: isMobile ? 'column' : 'row',
    position: isMobile ? 'absolute' : 'static',
    top: isMobile ? '100%' : 'auto',
    right: 0,
    backgroundColor: isMobile ? 'rgba(18, 18, 18, 0.95)' : 'transparent',
    width: isMobile ? '100%' : 'auto',
    padding: isMobile ? '1rem 0' : 0,
    boxShadow: isMobile ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
    textAlign: isMobile ? 'center' : 'left',
  };

  const navItemStyle = {
    margin: isMobile ? '0.5rem 0' : '0 1rem',
  };

  const navLinkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '0.5rem',
    transition: 'color 0.3s ease',
    display: 'block',
  };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <a href="/" style={logoStyle}>MK</a>
        
        {/* Mobile menu toggle */}
        <div 
          style={hamburgerStyle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="#64ffda" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6H21" stroke="#64ffda" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 18H21" stroke="#64ffda" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Navigation links */}
        <ul style={navLinksStyle}>
          {navItems.map((item, index) => (
            <motion.li 
              key={index} 
              style={navItemStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href={item.path} 
                style={navLinkStyle}
                onMouseOver={(e) => e.target.style.color = '#64ffda'}
                onMouseOut={(e) => e.target.style.color = '#ffffff'}
                onClick={() => isMobile && setMenuOpen(false)}
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
