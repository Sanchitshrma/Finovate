import React from "react";
function Hero() {
  return (
    <section style={{ background: "linear-gradient(160deg, #f0f7ff 0%, #fafafe 60%, #fff 100%)", padding: "4rem 0 3rem" }}>
      <div className="container">
        <div className="row mb-4 text-center">
          <div className="col-12">
            <span className="section-tag">Our story</span>
            <h1 className="fw-bold mt-3" style={{ fontSize: "2.25rem", letterSpacing: "-0.5px", maxWidth: 700, margin: "0.75rem auto 0" }}>
              We pioneered discount broking in India.
              <br />
              <span className="gradient-text">Now, we're breaking ground with technology.</span>
            </h1>
          </div>
        </div>
        <div className="row g-4" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "2.5rem" }}>
          <div className="col-12 col-lg-6">
            <p className="text-muted" style={{ lineHeight: 1.9 }}>
              We kick-started operations on the 15th of August, 2010 with the goal
              of breaking all barriers that traders and investors face in India in
              terms of cost, support, and technology. We named the company
              Finovate — a combination of Finance and Innovate.
            </p>
            <p className="text-muted" style={{ lineHeight: 1.9 }}>
              Today, our disruptive pricing models and in-house technology have
              made us the biggest stock broker in India.
            </p>
            <p className="text-muted" style={{ lineHeight: 1.9 }}>
              Over 1+ Crore clients place millions of orders every day through our
              powerful ecosystem, contributing over 15% of all Indian retail trading volumes.
            </p>
          </div>
          <div className="col-12 col-lg-6">
            <p className="text-muted" style={{ lineHeight: 1.9 }}>
              In addition, we run popular open online educational and community
              initiatives to empower retail traders and investors.
            </p>
            <p className="text-muted" style={{ lineHeight: 1.9 }}>
              <a href="/about" className="arrow-link" style={{ display: "inline" }}>Rainmatter</a>
              {" "}, our fintech fund and incubator, has invested in several fintech
              startups with the goal of growing the Indian capital markets.
            </p>
            <p className="text-muted" style={{ lineHeight: 1.9 }}>
              We are always up to something new. Catch up on the latest updates
              on our blog or see what the media is saying about us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
