import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-section about">
          <h2>MindfulMiles </h2>
          <p>
            Your AI-powered travel companion. Plan trips based on your mood, budget,
            and time explore the world mindfully.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/plan">Plan Trip</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>Email: support@mindfulmiles.com</p>
          <p>Phone: +91-9876543210</p>
        </div>

        {/* Social Icons */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MindfulMiles | All Rights Reserved</p>
      </div>
    </footer>
  );
}
