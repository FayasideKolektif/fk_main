// src/components/Header.js
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const Toggle = () => {
    const toggle = document.getElementById('navlinks');
    const xbar = document.getElementById('x');
    const ham = document.getElementById('ham');

    if (toggle.style.display === '' || toggle.style.display === 'none') {
      toggle.style.display = 'flex';
      xbar.style.display = 'block';
      ham.style.display = 'none';
    } else {
      toggle.style.display = 'none';
      xbar.style.display = 'none';
      ham.style.display = 'block';
    }
  };

  return (
    <nav className="nav">
      <div className="logo">
        <Link href="/">
            <Image src="/images/logo_c.png" alt="Logo" width={90} height={90} />
        </Link>
      </div>
      <ul className="navlinks" id="navlinks">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/podcast">Podcast</Link></li>
        <li><Link href="/events">Events</Link></li>
        <li><Link href="/exhibitions">Exhibition</Link></li>
        <li><a href="https://shop.defayasitekolektif.org/catalogue/" target="_blank" rel="noopener noreferrer">Shop</a></li>
        <li><Link href="/about">About</Link></li>
        <li><a href="/donate" target="_blank" rel="noopener noreferrer" className="donate-button">Donate</a></li>
      </ul>
      <div className="hamburger-lines">
        <Image src="/icons/burger.png" alt="Menu"  id="ham" width={35} height={35} />
        <Image src="/icons/x.png" alt="Close"  id="x" width={25} height={25} />
      </div>
    </nav>
  );
};

export default Header;
