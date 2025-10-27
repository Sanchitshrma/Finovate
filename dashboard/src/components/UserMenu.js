import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Redirect to frontend signup page
    window.location.href = "http://localhost:3001/signup";
  };

  const handleProfile = () => {
    setIsOpen(false);
    // Navigate to profile page (you can create this later)
    console.log("Profile clicked");
  };

  const handleSettings = () => {
    setIsOpen(false);
    // Navigate to settings page (you can create this later)
    console.log("Settings clicked");
  };

  // Get user initials for avatar
  const getInitials = (email) => {
    if (!email) return "U";
    const parts = email.split("@")[0];
    return parts.substring(0, 2).toUpperCase();
  };

  const getUserEmail = () => {
    return user?.email || "User";
  };

  return (
    <div className="user-menu-container" ref={dropdownRef}>
      <div className="user-menu-trigger" onClick={toggleDropdown}>
        <div className="user-avatar">
          {user ? getInitials(user.email) : "U"}
        </div>
        <span className="user-name">{getUserEmail().split("@")[0]}</span>
        <svg
          className={`dropdown-icon ${isOpen ? "open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-info">
            <div className="user-avatar-large">
              {user ? getInitials(user.email) : "U"}
            </div>
            <div className="user-details">
              <p className="user-email">{getUserEmail()}</p>
              <p className="user-id">ID: {user?.id?.substring(0, 8) || "N/A"}</p>
            </div>
          </div>

          <div className="menu-divider"></div>

          <ul className="user-menu-list">
            <li onClick={handleProfile}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profile</span>
            </li>
            <li onClick={handleSettings}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m6-12h-6m-6 0H1m6 12H1m18 0h-6"></path>
              </svg>
              <span>Settings</span>
            </li>
          </ul>

          <div className="menu-divider"></div>

          <button className="logout-button" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
