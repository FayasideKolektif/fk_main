import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import '@/styles/module.footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <ul>
          <li><Link href="/about">Contact</Link></li>
          <li><Link href="/about">About us</Link></li>
          <li><Link href="#">Newsletter</Link></li>
        </ul>
        <ul className="legal-links">
          <li>Impressum</li>
          <li>Datenschutz</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className="footer-column">
        <h3>Follow Us</h3>
        <div className="footer-socials">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Facebook size={18} />
            <span>Facebook</span>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Instagram size={18} />
            <span>Instagram</span>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Twitter size={18} />
            <span>Twitter</span>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Youtube size={18} />
            <span>YouTube</span>
          </a>
        </div>
      </div>

      <div className="footer-column">
        <div className="address">
          <h3>Address</h3>
          <div className="info">
            <MapPin size={20} />
            <p>123 Main St, Anytown, USA</p>
          </div>
        </div>
        <div className="contact">
          <h3>Contact</h3>
          <div className="info">
            <Phone size={18} />
            <p>123-456-7890</p>
          </div>
          <div className="info">
            <Mail size={18} />
            <p>info@example.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
