import React from "react";
function Team() {
  return (
    <section className="container py-5">
      <div className="row mb-4" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "3rem" }}>
        <div className="col-12 text-center">
          <span className="section-tag">Our team</span>
          <h2 className="fw-bold mt-3" style={{ fontSize: "2rem" }}>The people behind Finovate</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="feature-card text-center p-4">
            <img
              src="media/images/SanchitSharma.jpeg"
              className="rounded-circle mb-3"
              style={{ width: 120, height: 120, objectFit: "cover", border: "3px solid var(--color-border)" }}
              alt="Sanchit Sharma"
            />
            <h5 className="fw-bold mb-0">Sanchit Sharma</h5>
            <p className="text-muted mb-3" style={{ fontSize: "0.875rem" }}>Founder &amp; CEO</p>
            <p className="text-muted mb-3" style={{ fontSize: "0.9rem", lineHeight: 1.8 }}>
              Sanchit is a web developer and the founder of Finovate, building
              modern investing infrastructure for India.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a href="/" className="arrow-link" style={{ fontSize: "0.85rem" }}>Homepage</a>
              <a href="/support" className="arrow-link" style={{ fontSize: "0.85rem" }}>TradingQnA</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="arrow-link" style={{ fontSize: "0.85rem" }}>Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
