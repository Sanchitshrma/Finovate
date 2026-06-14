import { NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-light finovate-navbar">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="media/images/coins-solid.svg"
            alt="Finovate logo"
            className="img-fluid"
            style={{ height: 26, width: 26 }}
          />
          <span className="ms-2 fs-5">Finovate</span>
        </NavLink>

        <button
          className="navbar-toggler border-0 finovate-navbar-toggle"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
            <li className="nav-item">
              <NavLink className={linkClass} to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/product">Product</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/pricing">Pricing</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/support">Support</NavLink>
            </li>
            <li className="nav-item ms-lg-2">
              <NavLink className="nav-link nav-cta" to="/signup">Sign up free</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
