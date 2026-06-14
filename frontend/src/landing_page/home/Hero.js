import React from "react";
import { Link } from "react-router-dom";
import "../../components/Buttons.css";

function Hero() {
  return (
    <section
      style={{
        background: "linear-gradient(160deg, #f0f7ff 0%, #fafafe 60%, #fff 100%)",
        paddingBottom: "4rem",
      }}
    >
      <div className="container py-5">
        <div className="row text-center justify-content-center">
          <div className="col-12 col-lg-8 mb-3">
            <span className="section-tag">Trusted by 1.5+ Crore investors</span>
            <h1
              className="display-4 fw-bold mt-2 mb-3"
              style={{ letterSpacing: "-1px", lineHeight: 1.15 }}
            >
              <span className="gradient-text">Invest</span> in everything
            </h1>
            <p className="fs-5 text-muted mb-4" style={{ maxWidth: 520, margin: "0 auto 1.5rem" }}>
              Stocks, derivatives, mutual funds &amp; more — with zero brokerage
              and a platform built for every investor.
            </p>
          </div>
          <div className="col-12 d-flex justify-content-center gap-3 flex-wrap mb-5">
            <Link to="/signup" className="btn btn-lg rounded-pill signup-cta" aria-label="Open free account">
              Open free account
            </Link>
            <a href="/product" className="btn btn-lg btn-outline-secondary rounded-pill px-4" style={{ fontWeight: 500 }}>
              Explore products
            </a>
          </div>
          <div className="col-12">
            <img
              src="media/images/homeHero.png"
              alt="Finovate trading platform"
              className="img-fluid"
              style={{ borderRadius: 16, boxShadow: "0 20px 60px rgba(15,23,42,0.10)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
