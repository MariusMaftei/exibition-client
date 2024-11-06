import React from "react";
import styles from "./ArtistSpotlight.module.css";

const ArtistSpotlight = () => {
  return (
    <div className={styles.artistSpotlight}>
      <img
        src="https://cdn.britannica.com/03/193803-050-CBC590FA/Bob-Ross.jpg"
        alt="Bob Ross"
        className={styles.artistImage}
      />
      <div className={styles.artistInfo}>
        <h3 className={styles.artistName}>Bob Ross</h3>
        <p className={styles.artistBio}>
          Bob Ross was an iconic American painter, art instructor, and
          television host. He was the creator and host of "The Joy of Painting,"
          an instructional television program that aired from 1983 to 1994 on
          PBS in the United States. Ross was known for his permed hair, gentle
          demeanor, and his ability to complete a painting in 30 minutes. His
          catchphrases included "happy little trees" and "there are no mistakes,
          only happy accidents."
        </p>
        <p className={styles.artistBio}>
          Ross's wet-on-wet oil painting technique allowed him to create
          beautiful landscapes quickly, inspiring countless viewers to try
          painting themselves. His legacy continues to inspire new generations
          of artists and remains a beloved cultural icon.
        </p>
        <a
          href="https://www.bobross.com/"
          className={styles.artistLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Official Website
        </a>
      </div>
    </div>
  );
};

export default ArtistSpotlight;
