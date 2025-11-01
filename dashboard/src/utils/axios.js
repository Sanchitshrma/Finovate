import axios from "axios";

// Create axios instance
const api = axios.create({
  // Use environment variable in production; fallback to localhost for local dev
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
});

// Add request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/signup";
    }
    return Promise.reject(error);
  }
);

export default api;
