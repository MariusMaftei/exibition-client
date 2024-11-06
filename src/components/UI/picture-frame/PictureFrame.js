import React from "react";
import styles from "./PictureFrame.module.css";

const PictureFrame = ({
  src,
  alt,
  orientation,
  frameColor,
  matColor,
  onClick,
  isModal = false,
}) => {
  return (
    <div
      className={`${styles.frame} ${styles[orientation]} ${
        isModal ? styles.modalFrame : ""
      }`}
      onClick={onClick}
      style={{
        "--frame-color": frameColor,
        "--mat-color": matColor,
      }}
    >
      <div className={styles.imageContainer}>
        <img src={src} alt={alt} className={styles.image} />
      </div>
    </div>
  );
};

export default PictureFrame;
