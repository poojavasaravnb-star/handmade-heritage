import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-about">
          <h3 className="footer-title">HandMade-Heritage</h3>
          <p className="footer-text">
            Discover authentic handmade crafts made by skilled artisans.
            Every piece tells a story of heritage and passion.
          </p>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4 className="footer-heading">Contact</h4>
          <p>Email: info@handmade-heritage.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>Address: Gujarat, India</p>
        </div>

        <div className="footer-social">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">FB</a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">IG</a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">TW</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
