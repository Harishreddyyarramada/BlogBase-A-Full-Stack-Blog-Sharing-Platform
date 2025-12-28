import React from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaHeart 
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-section about">
          <h2 className="logo-text">Blogger Website</h2>
          <p>
            Sharing ideas, stories, and updates from around the world.
            Join our community of passionate writers and readers.
          </p>
          <div className="contact">
            <span><a href={`mailto:blogbaseofficial@gmail.com`} style={{textDecoration:'none',color:'white'}}><i className="fas fa-envelope"></i> blogbaseofficial@gmail.com </a></span>
          </div>
        </div>

       
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Blogger Website | Made with <FaHeart className="heart-icon" /> by Blogger Team
      </div>
    </footer>
  );
};

export default Footer;
