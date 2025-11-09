import React from "react";
function Universe() {
  return (
    <div className="container py-5">
      <div className="row py-4 text-center g-4">
        <h2 className="mb-2">The Finovate Universe</h2>
        <p className="fs-6 mb-3">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
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
          <button className="btn btn-primary btn-lg">Signup Now</button>
        </div>
      </div>
    </div>
  );
}

export default Universe;
