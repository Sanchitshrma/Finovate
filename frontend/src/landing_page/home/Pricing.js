import React from "react";
function Pricing() {
  return (
    <section className="container py-5 my-2">
      <div className="row g-5 align-items-center">
        <div className="col-12 col-lg-5">
          <span className="section-tag">Pricing</span>
          <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>Unbeatable pricing</h2>
          <p className="text-muted mb-4">
            We pioneered discount broking and price transparency in India.
            Flat fees, zero hidden charges.
          </p>
          <a href="/pricing" className="arrow-link">
            See full pricing <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="col-12 col-lg-7">
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <div className="price-card featured h-100">
                <div className="mb-2" style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.75, letterSpacing: "0.5px", textTransform: "uppercase" }}>Equity Delivery &amp; MF</div>
                <div className="display-4 fw-bold mb-2">₹0</div>
                <p style={{ fontSize: "0.9rem" }}>Absolutely free — zero brokerage on all equity delivery and direct mutual fund investments.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="price-card h-100">
                <div className="mb-2 text-muted" style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>Intraday &amp; F&amp;O</div>
                <div className="display-4 fw-bold mb-2 gradient-text">₹20</div>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>Flat ₹20 per executed order — or 0.03%, whichever is lower.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
