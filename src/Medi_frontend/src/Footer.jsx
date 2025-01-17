import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We are dedicated to providing the best services to our customers. Learn more about our mission and values.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: Bhasyam82@gmail.com</p>
          <p>Phone: +91 8466829063</p>
          <p>Address:vijayawada , Andhra pradesh , India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MediTrack . All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
