import React, { useState, useEffect, useCallback } from "react";
import PictureFrame from "../../components/UI/picture-frame/PictureFrame";
import Modal from "../../components/UI/modal/Modal";
import styles from "./favorites.module.css";
import { useAuth } from "../../context/AuthContext";
import { PostMethods, postService } from "../../services/postService";
import LoadingSpinner from "../../components/UI/loading-spinner/LoadingSpinner";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchFavorites = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await postService(PostMethods.GET);
      setFavorites(response.filter((post) => post.userId === user.id));
      setError(null);
    } catch (err) {
      setError("Failed to fetch favorites. Please try again later.");
      console.error("Error fetching favorites:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleImageClick = useCallback((item) => {
    setSelectedImage(item);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleRemoveFavorite = useCallback(
    async (postId) => {
      try {
        await postService(PostMethods.DELETE, null, postId);
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.id !== postId)
        );
        if (selectedImage && selectedImage.id === postId) {
          closeModal();
        }
      } catch (error) {
        setError("Failed to remove favorite. Please try again.");
        console.error("Error removing favorite:", error);
      }
    },
    [selectedImage, closeModal]
  );

  if (isLoading) {
    return (
      <div className={styles.loadingPage}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.favoritesPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Favorites</h1>
        <p className={styles.description}>
          Your personal collection of favorite artworks
        </p>
      </header>

      {favorites.length === 0 ? (
        <p className={styles.noFavorites}>
          You haven't added any favorites yet.
        </p>
      ) : (
        <div className={styles.gallery}>
          {favorites.map((item) => (
            <div key={item.id} className={styles.galleryItem}>
              <PictureFrame
                src={item.src}
                alt={item.title}
                orientation={item.orientation || "square"}
                frameColor={item.frameColor}
                matColor={item.matColor}
                onClick={() => handleImageClick(item)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <Modal
          onClose={closeModal}
          onToggleFavorite={() => handleRemoveFavorite(selectedImage.id)}
          isFavorite={true}
        >
          <div className={styles.modalImageContainer}>
            <PictureFrame
              src={selectedImage.src}
              alt={selectedImage.title}
              orientation={selectedImage.orientation || "square"}
              frameColor={selectedImage.frameColor}
              matColor={selectedImage.matColor}
            />
          </div>
          <div className={styles.modalInfo}>
            <h2>{selectedImage.title || "Untitled"}</h2>
            <p>{selectedImage.artist || "Unknown Artist"}</p>
            <p>{selectedImage.year || "Year Unknown"}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
