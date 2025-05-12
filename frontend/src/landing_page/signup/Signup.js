import React, { useState } from "react";
import OpenAccount from "../OpenAccount";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  function signupHandler() {
    setLogin(false);
  }
  function loginHandler() {
    setLogin(true);
  }
  async function signup() {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    }

    if (!login) {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
        valid = false;
      }
    }

    if (!valid) return;

    const data = {
      email: email,
      password: password,
    };

    setIsSubmitting(true);
    try {
      if (!login) {
        const res = await axios.post("http://localhost:8000/signup", data);
        // Replace alert with console.log as placeholder
        console.log("You are successfully signed up, please login now");
        setLogin(true);
      } else {
        const res = await axios.post("http://localhost:8000/login", data);
        // Use navigate instead of window.location.href
        navigate("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          console.log("User already exists or invalid signup data");
        } else {
          console.log("An unexpected error occurred. Please try again.");
        }
      } else {
        console.log("An unexpected error occurred. Please try again.");
      }
    }
    setIsSubmitting(false);
  }
  function passwordHanlder(event) {
    setPassword(event.target.value);
  }
  function emailHanlder(event) {
    setEmail(event.target.value);
  }
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
          <h2 className="mb-2">{login ? "Login Now" : "Signup Now"}</h2>
          <span style={{ display: "flex", flexWrap: "wrap" }}>
            {!login ? (
              <>
                <p className="mb-3">
                  For existing user{" "}
                  <button onClick={loginHandler} class="btn btn-primary btn-md">
                    login
                  </button>
                </p>
              </>
            ) : (
              <>
                <p className="mb-3">
                  For new user{" "}
                  <button
                    onClick={signupHandler}
                    class="btn btn-primary btn-md"
                  >
                    Signup
                  </button>
                </p>
              </>
            )}
          </span>

          <div class="form-floating mb-3">
            <input
              onChange={emailHanlder}
              value={email}
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
            {emailError && <div className="text-danger mt-1">{emailError}</div>}
          </div>
          <div class="form-floating">
            <input
              onChange={passwordHanlder}
              value={password}
              type={showPassword ? "text" : "password"}
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
            {passwordError && (
              <div className="text-danger mt-1">{passwordError}</div>
            )}
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm mt-2"
              style={{
                position: "absolute",
                right: 15,
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {!login && (
              <div className="form-floating mt-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label>Confirm Password</label>
                {confirmPasswordError && (
                  <div className="text-danger mt-1">{confirmPasswordError}</div>
                )}
              </div>
            )}
            <div class="col-auto">
              <button
                onClick={signup}
                type="submit"
                class="btn btn-primary btn-lg mb-3 mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : login ? "Signin" : "Signup"}
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
