import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, 500, etc.)
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        // Redirect to login or show notification
      }
    }
    return Promise.reject(error);
  }
);

export default api;