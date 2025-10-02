import React from 'react';
import { Instagram, Twitter, Facebook, Youtube, Github } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo og beskrivelse */}
        <div className="footer-brand">
          <div className="footer-logo-section">
            <img src="/csrevlogo.png" alt="CSRev Logo" className="footer-logo" />
            <span className="footer-title">CSRev</span>
          </div>
          <p className="footer-description">
            Revolusjonér din CS2-opplevelse med sikker handel og eksklusive skins.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Hjem</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/terms">Vilkår</a></li>
            <li><a href="/privacy">Personvern</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3 className="footer-heading">Kontakt</h3>
          <div className="footer-contact">
            <p>
              <a href="mailto:support@csrev.gg" className="footer-email">
                support@csrev.gg
              </a>
            </p>
            <p className="footer-response">Svarer innen 24 timer</p>
          </div>
        </div>

        {/* Sosiale medier */}
        <div className="footer-section">
          <h3 className="footer-heading">Følg oss</h3>
          <div className="footer-socials">
            <a href="https://www.instagram.com/csrev.gg/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <Instagram size={20} />
            </a>
            <a href="#" className="footer-social-link">
              <Twitter size={20} />
            </a>
            <a href="#" className="footer-social-link">
              <Facebook size={20} />
            </a>
            <a href="#" className="footer-social-link">
              <Youtube size={20} />
            </a>
            <a href="#" className="footer-social-link">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © 2025 CSRev. Alle rettigheter reservert.
          </p>
          <p className="footer-disclaimer">
            CSRev er ikke tilknyttet Valve Corporation eller Counter-Strike.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;