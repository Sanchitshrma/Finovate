import React from "react";
function Awards() {
  const items = [
    "Futures & Options", "Commodity derivatives", "Currency derivatives",
    "Stocks & IPOs", "Direct mutual funds", "Bonds & Govt. Securities",
  ];
  return (
    <section className="container py-5 my-4">
      <div className="row align-items-center g-5">
        <div className="col-12 col-lg-6">
          <img src="media/images/largestBroker.svg" alt="Largest broker in India" className="img-fluid" />
        </div>
        <div className="col-12 col-lg-6">
          <span className="section-tag">Market leader</span>
          <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
            Largest stock broker in India
          </h2>
          <div className="d-flex gap-3 flex-wrap mb-4">
            <div className="stat-badge">
              <span className="fw-bold fs-4 gradient-text">2M+</span>
              <span className="text-muted" style={{ fontSize: "0.78rem" }}>Active clients</span>
            </div>
            <div className="stat-badge">
              <span className="fw-bold fs-4 gradient-text">15%</span>
              <span className="text-muted" style={{ fontSize: "0.78rem" }}>Daily retail volumes</span>
            </div>
            <div className="stat-badge">
              <span className="fw-bold fs-4 gradient-text">₹4.5L Cr</span>
              <span className="text-muted" style={{ fontSize: "0.78rem" }}>Equity investments</span>
            </div>
          </div>
          <p className="text-muted mb-3">Our clients trade and invest across:</p>
          <div className="row g-2">
            {items.map((item) => (
              <div className="col-6" key={item}>
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-check" style={{ color: "var(--color-success)", fontSize: "0.8rem" }}></i>
                  <span style={{ fontSize: "0.9rem" }}>{item}</span>
                </div>
              </div>
            ))}
          </div>
          <img src="media/images/pressLogos.png" alt="Press coverage" className="img-fluid mt-4" style={{ maxHeight: 40, opacity: 0.7 }} />
        </div>
      </div>
    </section>
  );
}

export default Awards;
