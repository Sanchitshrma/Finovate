import React from "react";
import { Link } from "react-router-dom";
import "../../components/Buttons.css";

function Hero() {
  return (
    <div className="container py-5 mb-5">
      <div className="row text-center justify-content-center">
        <div className="col-12">
          <img src="media/images/homeHero.png" alt="HeroImage" className="img-fluid mb-5" />
        </div>
        <div className="col-12">
          <h1 className="mt-4 display-5">Invest in everything</h1>
          <p className="fs-5 mb-4 text-muted">
            Online Platform to invest in stocks, derivaties, mutual funds, and more
          </p>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <Link to="/signup" className="btn btn-lg rounded-pill signup-cta mb-5" aria-label="Sign up for free">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
