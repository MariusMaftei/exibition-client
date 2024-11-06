import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/UI/carousel/Carousel";
import Newsletter from "../../components/newsletter/Newsletter";
import UpcomingExhibitions from "../../components/upcoming-exhibition/UpcomingExhibition";
import ArtistSpotlight from "../../components/artist-spotlight/ArtistSpotlight";
import FeaturedArtworks from "../../components/featured-artworks/FeaturedArtworks";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.homepageWrapper}>
      <div className={styles.carouselWrapper}>
        <Carousel />
      </div>
      <div className={styles.contentWrapper}>
        <section className={styles.featuredArtworks}>
          <h2 className={styles.sectionTitle}>Featured Artworks</h2>
          <FeaturedArtworks />
          <div className={styles.viewAllButtonContainer}>
            <Link to="/gallery" className={styles.viewAllButton}>
              View All Artworks
            </Link>
          </div>
        </section>

        <section className={styles.artistSpotlight}>
          <h2 className={styles.sectionTitle}>Artist Spotlight</h2>
          <ArtistSpotlight />
        </section>

        <section className={styles.aboutUs}>
          <h2 className={styles.sectionTitle}>About Our Gallery</h2>
          <p className={styles.aboutText}>
            Welcome to our online art gallery, where we showcase exceptional
            artworks from both established and emerging artists. Our mission is
            to bring the beauty and diversity of contemporary art to art
            enthusiasts around the world.
          </p>
          <Link to="/about" className={styles.learnMoreButton}>
            Learn More
          </Link>
        </section>

        <section className={styles.upcomingExhibitions}>
          <h2 className={styles.sectionTitle}>Upcoming Exhibitions</h2>
          <UpcomingExhibitions />
        </section>

        <section className={styles.newsletter}>
          <h2 className={styles.sectionTitle}>Stay Updated</h2>
          <p className={styles.newsletterText}>
            Subscribe to our newsletter for the latest news, exhibitions, and
            featured artworks.
          </p>
          <Newsletter />
        </section>
      </div>
    </div>
  );
}
