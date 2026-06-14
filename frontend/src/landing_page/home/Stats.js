import React from "react";

const features = [
  {
    icon: "fa-solid fa-users",
    title: "Customer-first always",
    desc: "1.5+ crore customers trust Finovate with ₹4.5+ lakh crores of equity investments, contributing to 15% of daily retail exchange volumes.",
  },
  {
    icon: "fa-solid fa-ban",
    title: "No spam or gimmicks",
    desc: "No gimmicks, spam, \"gamification\", or annoying push notifications. High quality apps that you use at your pace.",
  },
  {
    icon: "fa-solid fa-globe",
    title: "The Finovate universe",
    desc: "Not just an app, but a whole ecosystem. 30+ fintech startups offer tailored services specific to your needs.",
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Do better with money",
    desc: "With Nudge and Kill Switch, we don't just facilitate transactions — we actively help you do better with your money.",
  },
];

function Stats() {
  const DASHBOARD_URL =
    process.env.REACT_APP_DASHBOARD_URL ||
    (process.env.NODE_ENV === 'production' ? 'https://finovate-dashboard.vercel.app' : 'http://localhost:3000');
  return (
    <section style={{ background: "var(--color-bg)", padding: "5rem 0" }}>
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-12 col-lg-6">
            <span className="section-tag">Why Finovate</span>
            <h2 className="fw-bold mb-4" style={{ fontSize: "2rem" }}>Trust with confidence</h2>
            <div className="d-flex flex-column gap-3">
              {features.map((f) => (
                <div className="feature-card d-flex gap-3 align-items-start" key={f.title}>
                  <div className="icon-circle mt-1" style={{ minWidth: 40 }}>
                    <i className={f.icon}></i>
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-1">{f.title}</h6>
                    <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <img src="media/images/ecosystem.png" alt="Finovate ecosystem" className="img-fluid" style={{ borderRadius: 16 }} />
            <div className="d-flex gap-4 mt-4 justify-content-center">
              <a href="/product" className="arrow-link">
                Explore products <i className="fa-solid fa-arrow-right"></i>
              </a>
              <a href={DASHBOARD_URL} className="arrow-link">
                Try FinX demo <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
