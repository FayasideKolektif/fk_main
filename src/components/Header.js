'use client'
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect } from 'react';

const Header = () => {
  const toggleMenu = () => {
    const navlinks = document.getElementById('navlinks');
    const xIcon = document.getElementById('x');
    const hamIcon = document.getElementById('ham');

    if (navlinks.style.display === 'none' || navlinks.style.display === '') {
      navlinks.style.display = 'flex';
      xIcon.style.display = 'block';
      hamIcon.style.display = 'none';
    } else {
      navlinks.style.display = 'none';
      xIcon.style.display = 'none';
      hamIcon.style.display = 'block';
    }
  };

  // Close menu when clicking a link
  const closeMenu = () => {
    const navlinks = document.getElementById('navlinks');
    const xIcon = document.getElementById('x');
    const hamIcon = document.getElementById('ham');
    
    navlinks.style.display = 'none';
    xIcon.style.display = 'none';
    hamIcon.style.display = 'block';
  };

  // Initialize menu state on component mount
  useEffect(() => {
    const xIcon = document.getElementById('x');
    const hamIcon = document.getElementById('ham');
    
    if (xIcon && hamIcon) {
      xIcon.style.display = 'none';
      hamIcon.style.display = 'block';
    }
  }, []);

  return (
    <nav className="nav">
      <div className="logo">
        <Link href="/">
          <Image src="/images/logo_c.png" alt="Logo" width={80} height={90} priority />
        </Link>
      </div>
      <ul className="navlinks" id="navlinks">
        <li><Link href="/" onClick={closeMenu}>Home</Link></li>
        <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
        <li><Link href="/exhibitions" onClick={closeMenu}>Exhibition</Link></li>
        <li><a href="https://shop.defayasitekolektif.org/catalogue/" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Shop</a></li>
        <li><Link href="/about" onClick={closeMenu}>About</Link></li>
        <li><a href="/donate" target="_blank" rel="noopener noreferrer" className="donate-button" onClick={closeMenu}>Donate</a></li>
      </ul>
      <div className="hamburger-lines">
        <Image 
          src="/icons/burger.png" 
          alt="Menu" 
          id="ham" 
          width={55} 
          height={45} 
          onClick={toggleMenu}
          style={{ cursor: 'pointer' }}
        />
        <X 
          id="x" 
          size={35} 
          onClick={toggleMenu}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </nav>
  );
};

export default Header;