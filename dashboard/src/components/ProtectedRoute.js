import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";

const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://finovate-one.vercel.app'
    : 'http://localhost:3001');

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const params = new URLSearchParams(location.search);
      const tokenFromUrl = params.get("token");
      const userFromUrl = params.get("user");

      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        if (userFromUrl) {
          try {
            const userData = JSON.parse(decodeURIComponent(userFromUrl));
            localStorage.setItem("user", JSON.stringify(userData));
          } catch (error) {
            console.error("Failed to parse user data:", error);
          }
        }

        // Remove token params from URL to avoid reusing stale value subscriptions
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        await api.get("/verify");
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [location.search]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "12px",
          color: "#666",
        }}
        aria-live="polite"
      >
        <CircularProgress color="primary" />
        <div>Loading your dashboard…</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = `${FRONTEND_URL}/signup`;
    return null;
  }

  return children;
};

export default ProtectedRoute;
