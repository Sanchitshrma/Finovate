import React from "react";
function Hero() {
  return (
    <section style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #fafafe 60%, #fff 100%)", padding: "4rem 0 3rem" }}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag">Transparent pricing</span>
          <h1 className="fw-bold mt-3 mb-2" style={{ fontSize: "2.75rem", letterSpacing: "-1px" }}>
            <span className="gradient-text">Simple</span>, honest pricing
          </h1>
          <p className="text-muted fs-5">
            Free equity investments &amp; flat &#8377;20 intraday and F&amp;O trades
          </p>
        </div>
        <div className="row text-center g-4">
          <div className="col-12 col-md-4">
            <div className="feature-card h-100 py-4">
              <img src="media/images/pricingEquity.svg" alt="Free equity" className="img-fluid mb-3" style={{ maxHeight: 80 }} />
              <h5 className="fw-bold mb-2">Free equity delivery</h5>
              <p className="text-muted" style={{ lineHeight: 1.8, fontSize: "0.9rem" }}>
                All equity delivery investments (NSE, BSE) are absolutely free — &#8377;0 brokerage.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="price-card featured h-100">
              <img src="media/images/intradayTrades.svg" alt="Intraday trades" className="img-fluid mb-3" style={{ maxHeight: 80 }} />
              <h5 className="fw-bold mb-2">Intraday &amp; F&amp;O trades</h5>
              <p style={{ lineHeight: 1.8, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
                Flat &#8377;20 or 0.03% (whichever is lower) per executed order.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="feature-card h-100 py-4">
              <img src="media/images/pricingEquity.svg" alt="Free MF" className="img-fluid mb-3" style={{ maxHeight: 80 }} />
              <h5 className="fw-bold mb-2">Free direct MF</h5>
              <p className="text-muted" style={{ lineHeight: 1.8, fontSize: "0.9rem" }}>
                All direct mutual fund investments are absolutely free — &#8377;0 commissions &amp; DP charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
