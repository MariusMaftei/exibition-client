import axios from "axios";

export const AuthMethods = {
  LOGIN: "login",
  REGISTER: "register",
};

export const Authenticate = async (method, email, password, username = "") => {
  try {
    const baseUrl = "http://localhost:8080/auth";

    if (!Object.values(AuthMethods).includes(method)) {
      throw new Error("Invalid method");
    }

    if (!email || !password) {
      throw new Error("Email and password are required for all requests");
    }

    let response;
    if (method === AuthMethods.LOGIN) {
      response = await axios.post(`${baseUrl}/login`, { email, password });
    } else if (method === AuthMethods.REGISTER) {
      if (!username) {
        throw new Error("Username is required for registration");
      }
      response = await axios.post(`${baseUrl}/register`, {
        username,
        email,
        password,
      });
    }

    console.log("Authentication successful");
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(
        err.response.data.message || "An error occurred during authentication."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
