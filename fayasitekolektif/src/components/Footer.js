// src/components/Footer.js
import Link from 'next/link';

const Footer = () => {
  const contactDetails = {
    facebook: '#',
    instagram: '#',
    twitter: '#',
    youtube: '#',
    address: '123 Main St, Anytown, USA',
    phone: '123-456-7890',
    contactEmail: 'info@example.com'
  };

  return (
    <footer className="footer">
      <div className="footer-flex">
        <div>
          <li><Link href="/about">Contact</Link></li>
          <li><Link href="/about">About us</Link></li>
          <li><Link href="#">Newsletter</Link></li>
        </div>
        <div>
          <li>Impressum</li>
          <li>Datenshutz</li>
          <li>Privacy Policy</li>
        </div>
      </div>
      <div className="footer-socials">
        <a href={contactDetails.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href={contactDetails.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={contactDetails.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href={contactDetails.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
      </div>
      <div className="footer-flex">
        <div>
          <p>Address</p>
          <p>{contactDetails.address}</p>
        </div>
        <div>
          <p>Contact</p>
          <p>T: {contactDetails.phone}</p>
          <p>@: {contactDetails.contactEmail}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
