"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [active, setActive] = useState('home');

  const handleClick = (page) => {
    setActive(page);
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link 
          href="/login/portal" 
          style={active === 'home' ? { ...styles.menuItem, ...styles.activeMenuItem } : styles.menuItem} 
          onClick={() => handleClick('home')}
        >
          Home
        </Link>
        <Link 
          href="/about" 
          style={active === 'about' ? { ...styles.menuItem, ...styles.activeMenuItem } : styles.menuItem} 
          onClick={() => handleClick('about')}
        >
          About
        </Link>
      </nav>
      <div style={styles.heading}>
      <h1 style={styles.amed}>False Exchange</h1>
      </div>

      <div style={styles.imageContainer}>
        <Image 
          src="/image/logo.png"
          alt="Logo" 
          width={80} 
          height={80} 
        />
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '10%',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  headingText: {
    color: 'black',
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  menuItem: {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '18px',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  },
  activeMenuItem: {
    color: '#ff0000',
    backgroundColor: '#e0e0e0',
    fontSize: '20px',
    padding: '12px 16px',
  },
  heading: {
    flexGrow: 1,
    textAlign: 'center',
  },
  imageContainer: {
    padding: '50px',
    width: '80px',
    height: '80px',
  },

    amed: {
        color: 'black',
    },
};

export default Header;
