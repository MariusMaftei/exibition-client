import axios from "axios";

export const saveFavorite = async (artworkData) => {
  try {
    const response = await axios.post("http://localhost:8080/post", {
      artworkId: artworkData.id,
      title: artworkData.title,
      artist: artworkData.artist,
      year: artworkData.year,
      imageUrl: artworkData.src,
      type: artworkData.type,
      orientation: artworkData.orientation,
      frameColor: artworkData.frameColor,
      matColor: artworkData.matColor,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to save favorite");
    }
    throw new Error("An unexpected error occurred while saving favorite");
  }
};
