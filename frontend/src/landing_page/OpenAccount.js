import React from "react";
import { Link } from "react-router-dom";
import "../components/Buttons.css";

function OpenAccount() {
  return (
    <div className="container py-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-4">Open a Finovate account</h1>
        <p className="mt-2 fs-5 text-muted">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <div className="d-flex justify-content-center mt-3">
          <Link to="/signup" className="btn btn-lg rounded-pill signup-cta" aria-label="Sign up for free">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
