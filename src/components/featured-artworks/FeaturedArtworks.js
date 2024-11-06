import React from "react";
import { motion } from "framer-motion";
import styles from "./FeaturedArtworks.module.css";

const artworks = [
  {
    id: 1,
    title: "Sunset Horizon",
    artist: "Bob Ross",
    image:
      "https://image.pbs.org/video-assets/0Ditg4H-asset-mezzanine-16x9-8iVN3JV.jpg?focalcrop=1200x630x50x10&format=auto",
  },
  {
    id: 2,
    title: "WheatField",
    artist: "Claude Monet",
    image:
      "https://www.museum-barberini.de/collection-images/MB-Mon-09_Monet_Weizenfeld_1.jpg?w=1600",
  },
  {
    id: 3,
    title: "Autumn - Church",
    artist: "Frederic Edwin Church",
    image:
      "https://www.museothyssen.org/sites/default/files/styles/full_resolution/public/imagen/2023-10/CHURCH%2C%20Frederic%20Edwin_Otono_507%20%281980.86%29_0.jpg",
  },
];

const FeaturedArtworks = () => {
  return (
    <div className={styles.featuredArtworks}>
      {artworks.map((artwork) => (
        <motion.div
          key={artwork.id}
          className={styles.artworkCard}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className={styles.artworkImage}
          />
          <div className={styles.artworkInfo}>
            <h3 className={styles.artworkTitle}>{artwork.title}</h3>
            <p className={styles.artworkArtist}>{artwork.artist}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedArtworks;
