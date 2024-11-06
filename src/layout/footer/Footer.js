import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.companyInfo}>
            <h2 className={styles.logo}>Exhibition</h2>
            <p className={styles.description}>
              Discover amazing artworks with Exhibition. We offer the best
              curated collections and exceptional experiences to make your art
              journey unforgettable.
            </p>
          </div>
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Company</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/press">Press</Link>
                </li>
              </ul>
            </div>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Support</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
              </ul>
            </div>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Legal</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/cookies">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.socialLinks}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Exhibition. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
