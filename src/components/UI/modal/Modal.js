import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Heart } from "lucide-react";
import styles from "./Modal.module.css";

const Modal = ({ children, onClose, onToggleFavorite, isFavorite }) => {
  const modalRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        ref={modalRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children[0]} {/* This is the PictureFrame */}
        <div className={`${styles.infoBar} ${isHovered ? styles.visible : ""}`}>
          <div className={styles.infoContent}>
            {children[1]} {/* This is the modalInfo div */}
            <button
              className={`${styles.favoriteButton} ${
                isFavorite ? styles.favorited : ""
              }`}
              onClick={onToggleFavorite}
            >
              <Heart
                fill={isFavorite ? "#efbf04" : "none"}
                color={isFavorite ? "#efbf04" : "#ffffff"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default Modal;
