import React from "react";
import OpenAccount from "../OpenAccount";
function Signup() {
  return (
    <div className="container  mb-5">
      <div className="row text-center p-5">
        <h1 className=" mb-4 mt-5" style={{ fontSize: "3.5rem" }}>
          Open a free demat and trading account online
        </h1>
        <p className="fs-4 text-muted mb-5">
          Start investing brokerage free and join a community of 1.5+ crore
          investors and traders
        </p>
      </div>
      <div className="row p-5">
        <div className="col-6">
          <img
            src="media/images/signup1.svg"
            alt="signupimage"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-6">
          <h2 className="mb-2">Signup Now</h2>
          <p className="mb-3">Or track your existing application</p>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary btn-lg mb-3 mt-4">
                Signup
              </button>
              <p className="">
                By proceeding, you agree to the Zerodha{" "}
                <a
                  className=""
                  href="/"
                  style={{ textDecoration: "none", lineHeight: "2.5" }}
                >
                  terms
                </a>{" "}
                &{" "}
                <a
                  className=""
                  href="/"
                  style={{ textDecoration: "none", lineHeight: "2.5" }}
                >
                  privacy policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row text-center p-5">
        <h1 className="mb-5">Investment options with Zerodha demat account</h1>
        <div className="row p-5">
          <div className="col-6">
            <img
              src="media/images/stocks-acop.svg"
              alt="stocksimage"
              style={{ width: "30%" }}
            />
            <div>
              <h2>Stocks</h2>
              <p className="fs-5 text-muted">
                Invest in all exchange-listed securities
              </p>
            </div>
          </div>
          <div className="col-6">
            <img
              src="media/images/mf-acop.svg"
              alt="mfimage"
              style={{ width: "35%" }}
            />
            <div>
              <h2>Mutual Funds</h2>
              <p className="fs-5 text-muted mt-3">
                Invest in commission-free direct mutual funds
              </p>
            </div>
          </div>
          <div className="row p-5">
            <div className="col-6">
              <img
                src="media/images/ipo-acop.svg"
                alt="stocksimage"
                style={{ width: "30%" }}
              />
              <div>
                <h2>IPO</h2>
                <p className="fs-5 text-muted">
                  Apply to the latest IPOs instantly via UPI
                </p>
              </div>
            </div>
            <div className="col-6">
              <img
                src="media/images/fo-acop.svg"
                alt="mfimage"
                style={{ width: "30%" }}
              />
              <div>
                <h2>Futures & options</h2>
                <p className="fs-5 text-muted">
                  Hedge and mitigate market risk through simplified F&O trading
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 btn-lg"
          style={{ width: "40%", margin: "0 auto" }}
        >
          Explore Investments
        </button>
      </div>
      <div className="row  mb-5 p-5 border-top border-bottom">
        <h1 className=" mb-5 text-center">
          Steps to open a demat account with Finovate
        </h1>
        <div className="col-6 mt-5">
          <img
            src="media/images/steps-acop.svg"
            alt="mfimage"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-6 mb-5">
          <h2 className="mt-5 border-bottom p-3">
            <i class="fa-regular fa-circle-dot"></i> Enter the requested details
          </h2>
          <h2 className="mt-5 border-bottom p-3">
            <i class="fa-regular fa-circle-dot"></i> Complete e-sign &
            verification
          </h2>
          <h2 className="mt-5 border-bottom p-3">
            <i class="fa-regular fa-circle-dot"></i> Start investing!
          </h2>
        </div>
      </div>
      <div className="row p-5 mb-5">
        <div className="col-6 mt-5 ">
          <img
            src="media/images/acop-benefits.svg"
            alt="stocksimage"
            style={{ width: "90%" }}
          />
          <h1 className="mt-5 text-muted">
            Benefits of opening a Finovate demat account
          </h1>
        </div>
        <div className="col-6" style={{ lineHeight: "2.5rem" }}>
          <h2 className="mb-3">Unbeatable pricing</h2>
          <p className="fs-5 text-muted mb-5">
            Zero charges for equity & mutual fund investments. Flat ₹20 fees for
            intraday and F&O trades.
          </p>
          <h2 className="mb-3">Best investing experience</h2>
          <p className="fs-5 text-muted mb-5">
            Simple and intuitive trading platform with an easy-to-understand
            user interface.
          </p>
          <h2 className="mb-3">No spam or gimmicks</h2>
          <p className="fs-5 text-muted mb-5">
            Committed to transparency — no gimmicks, spam, "gamification", or
            intrusive push notifications.
          </p>
          <h2 className="mb-3">The Finovate universe</h2>
          <p className="fs-5 text-muted mb-5">
            More than just an app — gain free access to the entire ecosystem of
            our partner products.
          </p>
        </div>
      </div>
      {/* <div className="row">
        <h1>FAQs</h1>
      </div> */}
      <OpenAccount />
    </div>
  );
}

export default Signup;
