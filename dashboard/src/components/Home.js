import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Clean up URL if it has token/user parameters (for security)
    const params = new URLSearchParams(location.search);
    if (params.has('token') || params.has('user')) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
