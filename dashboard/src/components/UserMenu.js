import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserMenu.css";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3001';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initial load
    const refreshUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      } else {
        setUser(null);
      }
    };

    refreshUser();

    // Listen for updates triggered elsewhere
    const handleUserUpdated = () => refreshUser();
    const handleFocus = () => refreshUser();
    window.addEventListener('user-updated', handleUserUpdated);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('user-updated', handleUserUpdated);
      window.removeEventListener('focus', handleFocus);
    };
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
    // Refresh user on open so latest displayName is shown
    if (!isOpen) {
      try {
        const userData = localStorage.getItem("user");
        if (userData) setUser(JSON.parse(userData));
      } catch {}
    }
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Redirect to frontend signup page
    window.location.href = `${FRONTEND_URL}/signup`;
  };

  const handleProfile = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleSettings = () => {
    setIsOpen(false);
    navigate('/settings');
  };

  // Get display helpers
  const getDisplayName = () => {
    if (user?.displayName && user.displayName.trim().length > 0) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const getInitials = () => {
    const source = (user?.displayName && user.displayName.trim().length > 0)
      ? user.displayName
      : (user?.email ? user.email.split("@")[0] : "U");
    const letters = source.replace(/[^A-Za-z]/g, "").toUpperCase();
    return (letters[0] || "U") + (letters[1] || "");
  };

  const getUserEmail = () => {
    return user?.email || "User";
  };

  return (
    <div className="user-menu-container" ref={dropdownRef}>
      <div className="user-menu-trigger" onClick={toggleDropdown}>
        <div className="user-avatar">
          {getInitials()}
        </div>
        <span className="user-name">{getDisplayName()}</span>
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
              {getInitials()}
            </div>
            <div className="user-details">
              <p className="user-email">{getUserEmail()}</p>
              <p className="user-id">ID: {user?.id?.substring(0, 8) || "N/A"}</p>
            </div>
          </div>

          <div className="menu-divider"></div>

          <ul className="user-menu-list">
            <li onClick={handleProfile} className={location.pathname === '/profile' ? 'active' : ''}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profile</span>
            </li>
            <li onClick={handleSettings} className={location.pathname === '/settings' ? 'active' : ''}>
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
