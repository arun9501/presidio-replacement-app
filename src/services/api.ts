import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://backend-alb-server-229761153.us-east-1.elb.amazonaws.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log API errors for debugging
    if (error.response) {
      console.error("API Error Response:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url,
      });

      // Handle common errors (401, 403, 500, etc.)
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("token");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Request Error (No Response):", error.request);
    } else {
      // Something happened in setting up the request
      console.error("API Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
