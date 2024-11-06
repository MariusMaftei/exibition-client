import axios from "axios";

export const PostMethods = {
  POST: "create",
  GET: "get",
  DELETE: "delete",
};

export const postService = async (method, postData, postId = null) => {
  try {
    const baseUrl = "http://localhost:8080/posts"; // Make sure this matches your backend URL

    if (!Object.values(PostMethods).includes(method)) {
      throw new Error("Invalid method");
    }

    let response;
    if (method === PostMethods.POST) {
      if (!postData) {
        throw new Error("Post data is required for creating a post");
      }
      response = await axios.post(`${baseUrl}`, postData);
    } else if (method === PostMethods.GET) {
      response = await axios.get(`${baseUrl}`);
    } else if (method === PostMethods.DELETE) {
      if (!postId) {
        throw new Error("Post ID is required for deletion");
      }
      response = await axios.delete(`${baseUrl}/${postId}`);
    }

    console.log(`Post ${method} successful`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        err.response.data.message || `An error occurred during post ${method}.`
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
