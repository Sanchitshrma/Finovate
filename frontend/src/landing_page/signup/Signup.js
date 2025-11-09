import React, { useState } from "react";
import OpenAccount from "../OpenAccount";
import axios from "axios";
import Toast from "../../components/Toast";

// Environment variables for API URLs (with production fallbacks)
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://finovate-uh8i.onrender.com"
    : "http://localhost:8000");

const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://finovate-dashboard.vercel.app"
    : "http://localhost:3000");

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
  const [toast, setToast] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Calculate password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 10) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "#ef4444" };
    if (strength <= 4) return { strength, label: "Medium", color: "#f59e0b" };
    return { strength, label: "Strong", color: "#10b981" };
  };

  const passwordStrength = getPasswordStrength(password);
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

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    } else if (!login) {
      // Strict validation only for signup
      if (!/(?=.*[a-z])/.test(password)) {
        setPasswordError(
          "Password must contain at least one lowercase letter."
        );
        valid = false;
      } else if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordError(
          "Password must contain at least one uppercase letter."
        );
        valid = false;
      } else if (!/(?=.*\d)/.test(password)) {
        setPasswordError("Password must contain at least one number.");
        valid = false;
      }
    }

    // Confirm password validation (only for signup)
    if (!login) {
      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm your password.");
        valid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
        valid = false;
      }
    }

    if (!valid) {
      showToast("Please fix the errors in the form.", "error");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    setIsSubmitting(true);
    try {
      if (!login) {
        const res = await axios.post(`${BACKEND_URL}/signup`, data);
        // Store JWT token in localStorage
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        console.log("You are successfully signed up!");
        showToast("Account created successfully! Redirecting...", "success");
        setRedirecting(true);
        // Redirect to dashboard app (runs on port 3000) with token and user data
        setTimeout(() => {
          const userEncoded = encodeURIComponent(JSON.stringify(res.data.user));
          const redirectUrl = `${DASHBOARD_URL}?token=${res.data.token}&user=${userEncoded}`;
          console.log("Redirecting to:", redirectUrl);
          window.location.href = redirectUrl;
        }, 800);
      } else {
        const res = await axios.post(`${BACKEND_URL}/login`, data);
        // Store JWT token in localStorage
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        // Redirect to dashboard app (runs on port 3000) with token and user data
        showToast("Login successful! Redirecting...", "success");
        setRedirecting(true);
        setTimeout(() => {
          const userEncoded = encodeURIComponent(JSON.stringify(res.data.user));
          const redirectUrl = `${DASHBOARD_URL}?token=${res.data.token}&user=${userEncoded}`;
          console.log("Redirecting to:", redirectUrl);
          window.location.href = redirectUrl;
        }, 800);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          const errorMsg =
            error.response.data.message ||
            "Invalid credentials or user already exists";
          showToast(errorMsg, "error");
        } else {
          showToast("An unexpected error occurred. Please try again.", "error");
        }
      } else {
        showToast("Network error. Please check your connection.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  function passwordHanlder(event) {
    setPassword(event.target.value);
  }
  function emailHanlder(event) {
    setEmail(event.target.value);
  }
  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
      {(redirecting || isSubmitting) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.85)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="spinner-border text-primary" role="status" aria-label="Loading" />
          <p className="mt-3 text-muted">{redirecting ? 'Redirecting to dashboard…' : 'Processing…'}</p>
        </div>
      )}
      <div className="container  mb-5">
        <div className="row text-center py-4 py-md-5">
          <h1 className="mb-3 display-5">
            Open a free demat and trading account online
          </h1>
          <p className="fs-5 text-muted mb-4">
            Start investing brokerage free and join a community of 1.5+ crore
            investors and traders
          </p>
        </div>
        <div className="row g-4 p-3 p-md-5">
          <div className="col-12 col-lg-6">
            <img
              src="media/images/signup1.svg"
              alt="signupimage"
              className="img-fluid"
            />
          </div>
          <div className="col-12 col-lg-6">
            <h2 className="mb-2">{login ? "Login Now" : "Signup Now"}</h2>
            <span style={{ display: "flex", flexWrap: "wrap" }}>
              {!login ? (
                <>
                  <p className="mb-3">
                    For existing user{" "}
                    <button
                      onClick={loginHandler}
                      className="btn btn-primary btn-md"
                    >
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
                      className="btn btn-primary btn-md"
                    >
                      Signup
                    </button>
                  </p>
                </>
              )}
            </span>

            <div className="form-floating mb-3">
              <input
                onChange={emailHanlder}
                value={email}
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Email address</label>
              {emailError && (
                <div className="text-danger mt-1">{emailError}</div>
              )}
            </div>
            <div className="form-floating position-relative">
              <input
                onChange={passwordHanlder}
                value={password}
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                style={{ paddingRight: "4rem" }}
              />
              <label htmlFor="floatingPassword">Password</label>
              <div className="position-absolute top-0 end-0 h-100 d-flex align-items-center pe-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {passwordError && (
                <div className="text-danger mt-1">{passwordError}</div>
              )}
              {!login && password && (
                <div className="mt-2" style={{ fontSize: "13px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: "4px",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(passwordStrength.strength / 6) * 100}%`,
                          height: "100%",
                          backgroundColor: passwordStrength.color,
                          transition: "all 0.3s ease",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: passwordStrength.color,
                        fontWeight: "500",
                      }}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}
              {!login && !passwordError && (
                <div
                  className="mt-2"
                  style={{ fontSize: "12px", color: "#6b7280" }}
                >
                  Must contain uppercase, lowercase, and number
                </div>
              )}
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
                    <div className="text-danger mt-1">
                      {confirmPasswordError}
                    </div>
                  )}
                </div>
              )}
              <div className="col-auto">
                <button
                  onClick={signup}
                  type="submit"
                  className="btn btn-primary btn-lg mb-3 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Please wait..."
                    : login
                    ? "Signin"
                    : "Signup"}
                </button>
                <p className="">
                  By proceeding, you agree to the Finovate{" "}
                  <a
                    className=""
                    href="/support"
                    style={{ textDecoration: "none", lineHeight: "2.5" }}
                  >
                    terms
                  </a>{" "}
                  &{" "}
                  <a
                    className=""
                    href="/support"
                    style={{ textDecoration: "none", lineHeight: "2.5" }}
                  >
                    privacy policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center p-3 p-md-5">
          <h1 className="mb-4">
            Investment options with Finovate demat account
          </h1>
          <div className="row g-4 p-3 p-md-5">
            <div className="col-12 col-md-6">
              <img
                src="media/images/stocks-acop.svg"
                alt="stocksimage"
                className="img-fluid"
                style={{ maxWidth: "180px" }}
              />
              <div className="mt-2">
                <h2>Stocks</h2>
                <p className="fs-6 text-muted">
                  Invest in all exchange-listed securities
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <img
                src="media/images/mf-acop.svg"
                alt="mfimage"
                className="img-fluid"
                style={{ maxWidth: "210px" }}
              />
              <div className="mt-2">
                <h2>Mutual Funds</h2>
                <p className="fs-6 text-muted mt-1">
                  Invest in commission-free direct mutual funds
                </p>
              </div>
            </div>
            <div className="row g-4 p-3 p-md-5">
              <div className="col-12 col-md-6">
                <img
                  src="media/images/ipo-acop.svg"
                  alt="stocksimage"
                  className="img-fluid"
                  style={{ maxWidth: "180px" }}
                />
                <div className="mt-2">
                  <h2>IPO</h2>
                  <p className="fs-6 text-muted">
                    Apply to the latest IPOs instantly via UPI
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <img
                  src="media/images/fo-acop.svg"
                  alt="mfimage"
                  className="img-fluid"
                  style={{ maxWidth: "180px" }}
                />
                <div className="mt-2">
                  <h2>Futures & options</h2>
                  <p className="fs-6 text-muted">
                    Hedge and mitigate market risk through simplified F&O
                    trading
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary btn-lg">
              Explore Investments
            </button>
          </div>
        </div>
        <div className="row mb-5 p-3 p-md-5 border-top border-bottom">
          <h1 className="mb-4 text-center">
            Steps to open a demat account with Finovate
          </h1>
          <div className="col-12 col-lg-6 mt-4">
            <img
              src="media/images/steps-acop.svg"
              alt="mfimage"
              className="img-fluid"
            />
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <h2 className="mt-4 border-bottom p-3">
              <i className="fa-regular fa-circle-dot"></i> Enter the requested
              details
            </h2>
            <h2 className="mt-4 border-bottom p-3">
              <i className="fa-regular fa-circle-dot"></i> Complete e-sign &
              verification
            </h2>
            <h2 className="mt-4 border-bottom p-3">
              <i className="fa-regular fa-circle-dot"></i> Start investing!
            </h2>
          </div>
        </div>
        <div className="row p-3 p-md-5 mb-5">
          <div className="col-12 col-lg-6 mt-4">
            <img
              src="media/images/acop-benefits.svg"
              alt="stocksimage"
              className="img-fluid"
            />
            <h1 className="mt-4 text-muted">
              Benefits of opening a Finovate demat account
            </h1>
          </div>
          <div className="col-12 col-lg-6" style={{ lineHeight: "2rem" }}>
            <h2 className="mb-3">Unbeatable pricing</h2>
            <p className="text-muted mb-4">
              Zero charges for equity & mutual fund investments. Flat ₹20 fees
              for intraday and F&O trades.
            </p>
            <h2 className="mb-3">Best investing experience</h2>
            <p className="text-muted mb-4">
              Simple and intuitive trading platform with an easy-to-understand
              user interface.
            </p>
            <h2 className="mb-3">No spam or gimmicks</h2>
            <p className="text-muted mb-4">
              Committed to transparency — no gimmicks, spam, "gamification", or
              intrusive push notifications.
            </p>
            <h2 className="mb-3">The Finovate universe</h2>
            <p className="text-muted mb-4">
              More than just an app — gain free access to the entire ecosystem
              of our partner products.
            </p>
          </div>
        </div>
        {/* <div className="row">
        <h1>FAQs</h1>
      </div> */}
        <OpenAccount />
      </div>
    </>
  );
}

export default Signup;
