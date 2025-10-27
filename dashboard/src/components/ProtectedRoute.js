import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/axios";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3001';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      // Check for token in URL first (for redirects from login)
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get('token');
      const userFromUrl = params.get('user');
      
      // If token is in URL, save it to localStorage first
      if (tokenFromUrl) {
        localStorage.setItem('token', tokenFromUrl);
        if (userFromUrl) {
          try {
            const userData = JSON.parse(decodeURIComponent(userFromUrl));
            localStorage.setItem('user', JSON.stringify(userData));
          } catch (error) {
            console.error('Failed to parse user data:', error);
          }
        }
      }
      
      // Now check for token in localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verify token with backend
        await api.get("/verify");
        setIsAuthenticated(true);
      } catch (error) {
        // Token is invalid or expired
        console.error("Authentication failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Show loading state while verifying
  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
        color: "#666"
      }}>
        Verifying authentication...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Redirect to frontend login page
    window.location.href = `${FRONTEND_URL}/signup`;
    return null;
  }

  // Render protected content if authenticated
  return children;
};

export default ProtectedRoute;
