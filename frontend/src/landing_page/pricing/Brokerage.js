import React from "react";
function Brokerage() {
  const notes = [
    "Call & Trade and RMS auto-squareoff: Additional charges of \u20b950 + GST per order.",
    "Digital contract notes will be sent via e-mail.",
    "Physical copies of contract notes: \u20b920 per note. Courier charges apply.",
    "NRI account (non-PIS): 0.5% or \u20b9100 per executed equity order (whichever is lower).",
    "NRI account (PIS): 0.5% or \u20b9200 per executed equity order (whichever is lower).",
    "Debit balance accounts: \u20b940 per executed order instead of \u20b920.",
  ];
  return (
    <section className="container py-5">
      <div className="row g-4" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "3rem" }}>
        <div className="col-12 col-lg-8">
          <div className="feature-card">
            <h5 className="fw-bold mb-3">
              <i className="fa-solid fa-calculator me-2" style={{ color: "var(--color-primary)" }}></i>
              <a href="/pricing" className="arrow-link" style={{ fontSize: "1rem" }}>Brokerage calculator</a>
            </h5>
            <ul className="mb-0 ps-3" style={{ lineHeight: 2.1, fontSize: "0.85rem" }}>
              {notes.map((n, i) => (
                <li key={i} className="text-muted">{n}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="feature-card h-100 d-flex flex-column justify-content-center align-items-center text-center">
            <i className="fa-solid fa-list mb-3" style={{ color: "var(--color-primary)", fontSize: "1.8rem" }}></i>
            <h5 className="fw-bold mb-3">List of charges</h5>
            <a href="/pricing" className="arrow-link">
              View all charges <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Brokerage;
