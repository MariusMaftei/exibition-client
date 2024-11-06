import React, { useState, useEffect, useCallback } from "react";
import PictureFrame from "../../components/UI/picture-frame/PictureFrame";
import Modal from "../../components/UI/modal/Modal";
import styles from "./gallery.module.css";
import { DUMMY_DATA } from "../../data/gallery_data/gallery_data";
import { useAuth } from "../../context/AuthContext";
import { PostMethods, postService } from "../../services/postService";

const ALL_TYPES = "all";
const artTypes = [
  ALL_TYPES,
  ...new Set(DUMMY_DATA.map((item) => item.type).filter(Boolean)),
];

export default function Gallery() {
  const [filter, setFilter] = useState(ALL_TYPES);
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const filteredData =
    filter === ALL_TYPES
      ? DUMMY_DATA
      : DUMMY_DATA.filter((item) => item.type === filter);

  const handleImageClick = useCallback((item) => {
    setSelectedImage(item);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setError(null);
  }, []);

  const handleToggleFavorite = useCallback(async () => {
    if (!selectedImage || !user) {
      setError("You must be logged in to appreciate the art.");
      return;
    }

    try {
      const postData = {
        src: selectedImage.src,
        frameColor: selectedImage.frameColor,
        matColor: selectedImage.matColor,
        title: selectedImage.title || "Untitled",
        artist: selectedImage.artist || "Unknown Artist",
        year: selectedImage.year || "Year Unknown",
        type: selectedImage.type || "Unknown Type",
        orientation: selectedImage.orientation || "square",
        userId: user.id,
      };

      if (favorites[selectedImage.id]) {
        // If it's already a favorite, delete it
        await postService(
          PostMethods.DELETE,
          null,
          favorites[selectedImage.id].id
        );
        setFavorites((prev) => {
          const newFavorites = { ...prev };
          delete newFavorites[selectedImage.id];
          return newFavorites;
        });
      } else {
        // If it's not a favorite, add it
        const savedPost = await postService(PostMethods.POST, postData);
        setFavorites((prev) => ({
          ...prev,
          [selectedImage.id]: savedPost,
        }));
      }
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error toggling favorite:", error);
    }
  }, [selectedImage, favorites, user]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const userFavorites = await postService(PostMethods.GET);
          const favoritesMap = {};
          userFavorites.forEach((favorite) => {
            const matchingDummyData = DUMMY_DATA.find(
              (item) => item.src === favorite.src
            );
            if (matchingDummyData) {
              favoritesMap[matchingDummyData.id] = favorite;
            }
          });
          setFavorites(favoritesMap);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  return (
    <div className={styles.galleryPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Art Gallery</h1>
        <p className={styles.description}>
          Explore our curated collection of contemporary artworks
        </p>
      </header>

      <div className={styles.filterContainer}>
        {artTypes.map((type) => (
          <button
            key={type}
            className={`${styles.filterButton} ${
              filter === type ? styles.active : ""
            }`}
            onClick={() => setFilter(type)}
          >
            {type === ALL_TYPES ? "All" : type}
          </button>
        ))}
      </div>

      <div className={styles.gallery}>
        {filteredData.map((item) => (
          <div key={item.id} className={styles.galleryItem}>
            <PictureFrame
              src={item.src}
              alt={item.alt}
              orientation={item.orientation || "square"}
              frameColor={item.frameColor}
              matColor={item.matColor}
              onClick={() => handleImageClick(item)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal
          onClose={closeModal}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={!!favorites[selectedImage.id]}
        >
          <div className={styles.modalImageContainer}>
            <PictureFrame
              src={selectedImage.src}
              alt={selectedImage.alt}
              orientation={selectedImage.orientation || "square"}
              frameColor={selectedImage.frameColor}
              matColor={selectedImage.matColor}
            />
          </div>
          <div className={styles.modalInfo}>
            <h2>{selectedImage.title || "Untitled"}</h2>
            <p>{selectedImage.artist || "Unknown Artist"}</p>
            <p>{selectedImage.year || "Year Unknown"}</p>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </Modal>
      )}
    </div>
  );
}
