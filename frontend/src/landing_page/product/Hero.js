import React from "react";
function Hero() {
  return (
    <section style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #fafafe 60%, #fff 100%)", padding: "5rem 0 3rem" }}>
      <div className="container text-center">
        <span className="section-tag">Our platforms</span>
        <h1 className="fw-bold mt-3 mb-3" style={{ fontSize: "2.75rem", letterSpacing: "-1px" }}>
          Finovate <span className="gradient-text">Products</span>
        </h1>
        <p className="text-muted fs-5 mb-4" style={{ maxWidth: 520, margin: "0 auto 1.5rem" }}>
          Sleek, modern, and intuitive trading platforms
          built for every kind of investor.
        </p>
        <a href="/product" className="arrow-link justify-content-center">
          See all investment offerings <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </section>
  );
}

export default Hero;
