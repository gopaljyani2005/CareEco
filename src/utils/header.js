import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link href="/" style={styles.menuItem}>Home</Link>
        <Link href="/about" style={styles.menuItem}>About</Link>
      </nav>

      <div style={styles.heading}>
        <h1>Mock Exchange</h1>
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
}

const styles = {
  header: {
    position: 'fixed', // Makes the header fixed at the top
    top: 0,
    left: 0,
    width: '100%', // Ensures the header spans the entire width of the page
    height:'10%',
    zIndex: 1000, // Ensures the header is above other elements
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow for better visibility
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  menuItem: {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '18px',
  },
  heading: {
    flexGrow: 1,
    textAlign: 'center',
  },
  imageContainer: {
    padding:'50px',
    width: '80px',
    height: '80px',
  },
};

export default Header;
