import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./Carousel.module.css";

const images = [
  "https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg?cs=srgb&dl=pexels-suzyhazelwood-3004909.jpg&fm=jpg",
  "https://wallpapers.com/images/hd/exhibition-1920-x-1080-wallpaper-vxelnoe13pqrm8bx.jpg",
  "https://petapixel.com/assets/uploads/2020/07/Feature-Image-Virtual-3D-Gallery-Matt-Badenoch.jpeg",
];

const carouselContent = [
  {
    title: "Welcome to Our Gallery",
    subtitle: "Explore the world of art",
    buttonText: "View Exhibit",
  },
  {
    title: "Featured Exhibition",
    subtitle: "Discover our latest collection",
    buttonText: "View Exhibit",
  },
  {
    title: "Virtual Experience",
    subtitle: "Immerse yourself in art",
    buttonText: "View Exhibit",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        <div className={styles.mainImageContainer}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Main carousel image ${currentIndex + 1}`}
              className={styles.mainImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className={styles.overlay}>
            <motion.div
              className={styles.content}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className={styles.title}>
                {carouselContent[currentIndex].title}
              </h2>
              <p className={styles.subtitle}>
                {carouselContent[currentIndex].subtitle}
              </p>
              <Link to="/gallery" className={styles.buttonLink}>
                <motion.span
                  className={styles.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {carouselContent[currentIndex].buttonText}
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className={styles.thumbnailsContainer}>
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`${styles.thumbnailButton} ${
                index === currentIndex ? styles.activeThumbnail : ""
              }`}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === currentIndex}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
