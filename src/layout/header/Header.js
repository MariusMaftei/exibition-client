import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Image, Heart, User, Menu, LogOut } from "lucide-react";
import styles from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "Favorites", href: "/favorites", icon: Heart },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Exhibition
            </motion.span>
          </Link>
          <nav className={styles.desktopNav}>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`${styles.navLink} ${
                      isActive ? styles.active : ""
                    }`}
                  >
                    <item.icon className={styles.icon} />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
              >
                <div className={styles.userInfo}>
                  <User className={styles.icon} />
                  <span className={styles.userName}>
                    Welcome, {capitalizeFirstLetter(user.username)}!
                  </span>
                </div>
              </motion.div>
            )}
            {user ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (navItems.length + 1) * 0.1,
                }}
              >
                <button
                  onClick={handleLogout}
                  className={`${styles.navLink} ${styles.logoutButton}`}
                >
                  <LogOut className={styles.icon} />
                  Logout
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
              >
                <Link
                  to="/signin"
                  className={`${styles.navLink} ${
                    location.pathname === "/signin" ? styles.active : ""
                  }`}
                >
                  <User className={styles.icon} />
                  Sign In
                </Link>
              </motion.div>
            )}
          </nav>
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <Menu className={styles.menuIcon} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${styles.mobileNavLink} ${
                location.pathname === item.href ? styles.active : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className={styles.icon} />
              {item.name}
            </Link>
          ))}
          {user && (
            <div className={`${styles.mobileNavLink} ${styles.userInfo}`}>
              <User className={styles.icon} />
              <span className={styles.userName}>
                Welcome, {capitalizeFirstLetter(user.username)}!
              </span>
            </div>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className={`${styles.mobileNavLink} ${styles.logoutButton}`}
            >
              <LogOut className={styles.icon} />
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className={`${styles.mobileNavLink} ${
                location.pathname === "/signin" ? styles.active : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <User className={styles.icon} />
              Sign In
            </Link>
          )}
        </div>
      )}
      <motion.div
        className={styles.bottomBorder}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </header>
  );
}
