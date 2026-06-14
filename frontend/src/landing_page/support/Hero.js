import React from "react";
function Hero() {
  const quickLinks = [
    "Track account opening", "Track segment activation",
    "Intraday margins", "Kite user manual",
  ];
  return (
    <section className="container-fluid" id="supportHero">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-12 col-lg-6">
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                padding: "0.3rem 0.85rem",
                borderRadius: 999,
                marginBottom: "1rem",
              }}
            >
              Support portal
            </span>
            <h1 className="fw-bold mb-3" style={{ fontSize: "2rem", color: "#fff" }}>
              How can we help you?
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "1.25rem" }}>
              Search for answers or browse help topics to create a support ticket.
            </p>
            <input
              className="form-control"
              placeholder="E.g. how do I activate F&amp;O, why is my order getting rejected..."
              style={{ marginBottom: "1rem" }}
            />
            <div className="d-flex flex-wrap gap-2 mt-2">
              {quickLinks.map((lnk) => (
                <a
                  key={lnk}
                  href="/support"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "0.3rem 0.85rem",
                    borderRadius: 999,
                    fontSize: "0.8rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "background 0.15s",
                  }}
                >
                  {lnk}
                </a>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <a
              href="/support"
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                textDecoration: "none",
                padding: "0.35rem 1rem",
                borderRadius: 999,
                fontSize: "0.825rem",
                border: "1px solid rgba(255,255,255,0.25)",
                marginBottom: "1.25rem",
              }}
            >
              <i className="fa-solid fa-ticket me-2"></i>Track Ticket
            </a>
            <h3 className="fw-semibold mb-3" style={{ color: "#fff", fontSize: "1.1rem" }}>Featured articles</h3>
            <div className="d-flex flex-column gap-2">
              <a
                href="/support"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: 10,
                  fontSize: "0.875rem",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                MCX Crude option contract expiry — February 2025
              </a>
              <a
                href="/support"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: 10,
                  fontSize: "0.875rem",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Latest Intraday leverages and Square-off timings
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
