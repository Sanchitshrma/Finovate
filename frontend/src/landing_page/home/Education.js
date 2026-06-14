import React from "react";
function Education() {
  return (
    <section style={{ background: "var(--color-bg)", padding: "5rem 0" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <img src="media/images/education.svg" alt="Free market education" className="img-fluid" style={{ borderRadius: 12 }} />
          </div>
          <div className="col-12 col-lg-6">
            <span className="section-tag">Education</span>
            <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>Free &amp; open market education</h2>
            <div className="feature-card mb-3">
              <h6 className="fw-semibold mb-1"><i className="fa-solid fa-book-open me-2" style={{ color: "var(--color-primary)" }}></i>Varsity</h6>
              <p className="text-muted mb-2" style={{ fontSize: "0.875rem" }}>
                The largest online stock market education book in the world — from basics to advanced trading.
              </p>
              <a href="/support" className="arrow-link" style={{ fontSize: "0.85rem" }}>
                Explore Varsity <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <div className="feature-card">
              <h6 className="fw-semibold mb-1"><i className="fa-solid fa-comments me-2" style={{ color: "var(--color-accent)" }}></i>TradingQ&amp;A</h6>
              <p className="text-muted mb-2" style={{ fontSize: "0.875rem" }}>
                The most active trading and investment community in India for all your market queries.
              </p>
              <a href="/support" className="arrow-link" style={{ fontSize: "0.85rem" }}>
                Join the community <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
