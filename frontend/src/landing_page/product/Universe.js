import React from "react";
function Universe() {
  return (
    <div className="container p-5 ">
      <div className="row p-5 text-center">
        <h2 className="mb-4">The Finovate Universe</h2>
        <p className="fs-6">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-5 text-center mt-5">
          <img
            src="media/images/goldenpiLogo.png"
            alt="zerodhaFundhouseLogo"
            style={{ width: "70%" }}
          />
          <p className="text-small text-muted mt-3">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-5 text-center mt-5">
          <img
            src="media/images/sensibullLogo.svg"
            alt="sensibullLogo"
            style={{ width: "70%" }}
          />
          <p className="text-small text-muted mt-3">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-5 text-center mt-5">
          <img
            src="media/images/tijori.svg"
            alt="smallcaselogo"
            style={{ width: "70%" }}
          />
          <p className="text-small text-muted mt-3">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-5 text-center mt-5">
          <img
            src="media/images/streakLogo.png"
            alt="streakLogo"
            style={{ width: "70%" }}
          />
          <p className="text-small text-muted mt-3">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-5 text-center mt-5">
          <img
            src="media/images/smallcaseLogo.png"
            alt="smallcaselogo"
            style={{ width: "70%" }}
          />
          <p className="text-small text-muted mt-3">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-5 text-center mt-5">
          <img
            src="media/images/dittoLogo.png"
            alt="dittoLogo"
            style={{ width: "70%" }}
          />
          <p className="text-small text-muted mt-3">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 "
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
