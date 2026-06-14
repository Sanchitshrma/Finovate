import React from "react";
function Universe() {
  return (
    <div className="container py-5">
      <div className="row py-4 text-center g-4">
        <div className="col-12">
          <span className="section-tag">Partner platforms</span>
          <h2 className="fw-bold mt-3 mb-2" style={{ fontSize: "2rem" }}>The Finovate Universe</h2>
          <p className="text-muted fs-6 mb-3" style={{ maxWidth: 500, margin: "0 auto 1.5rem" }}>
            Extend your trading and investment experience even further with our
            partner platforms
          </p>
        </div>
        <div className="col-6 col-lg-4 p-3 mt-3">
          <img
            src="media/images/goldenpiLogo.png"
            alt="FinovateFundhouseLogo"
            className="img-fluid"
          />
          <p className="text-small text-muted mt-3">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="col-6 col-lg-4 p-3 mt-3">
          <img
            src="media/images/sensibullLogo.svg"
            alt="sensibullLogo"
            className="img-fluid"
          />
          <p className="text-small text-muted mt-3">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-6 col-lg-4 p-3 mt-3">
          <img
            src="media/images/tijori.svg"
            alt="smallcaselogo"
            className="img-fluid"
          />
          <p className="text-small text-muted mt-3">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-6 col-lg-4 p-3 mt-3">
          <img
            src="media/images/streakLogo.png"
            alt="streakLogo"
            className="img-fluid"
          />
          <p className="text-small text-muted mt-3">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-6 col-lg-4 p-3 mt-3">
          <img
            src="media/images/smallcaseLogo.png"
            alt="smallcaselogo"
            className="img-fluid"
          />
          <p className="text-small text-muted mt-3">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-6 col-lg-4 p-3 mt-3">
          <img
            src="media/images/dittoLogo.png"
            alt="dittoLogo"
            className="img-fluid"
          />
          <p className="text-small text-muted mt-3">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
        <div className="col-12 d-flex justify-content-center mt-2">
          <a href="/signup" className="btn btn-lg rounded-pill signup-cta">Open free account</a>
        </div>
      </div>
    </div>
  );
}

export default Universe;
