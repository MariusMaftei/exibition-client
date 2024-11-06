import React from "react";
import styles from "./UpcomingExhibition.module.css";

const exhibitions = [
  {
    id: 1,
    title: "Colors of Spring",
    date: "May 15 - June 30, 2025",
    artist: "Andrew Wyeth",
  },
  {
    id: 2,
    title: "Modern Perspectives",
    date: "July 10 - August 20, 2025",
    artist: "Thomas Kinkade",
  },
  {
    id: 3,
    title: "Sculptural Visions",
    date: "September 5 - October 15, 2025",
    artist: "J.M.W. Turner",
  },
];

const UpcomingExhibitions = () => {
  return (
    <div className={styles.upcomingExhibitions}>
      {exhibitions.map((exhibition) => (
        <div key={exhibition.id} className={styles.exhibitionCard}>
          <h3 className={styles.exhibitionTitle}>{exhibition.title}</h3>
          <p className={styles.exhibitionDate}>{exhibition.date}</p>
          <p className={styles.exhibitionArtist}>{exhibition.artist}</p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingExhibitions;
