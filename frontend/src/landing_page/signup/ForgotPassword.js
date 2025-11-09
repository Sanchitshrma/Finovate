import React, { useState } from "react";
import axios from "axios";
import Toast from "../../components/Toast";
import { useNavigate } from "react-router-dom";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://finovate-uh8i.onrender.com"
    : "http://localhost:8000");

export default function ForgotPassword() {
  const navigate = useNavigate();
  // const [step, setStep] = useState(1); // 1=email, 2=otp+password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const show = (message, type) => setToast({ message, type });
  const close = () => setToast(null);

  const sendOtp = () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      return show("Enter a valid email", "error");
    // Immediately navigate to reset page; fire-and-forget OTP request
    navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    axios.post(`${BACKEND_URL}/forgot-password`, { email }).catch(() => {
      /* ignore here; user can resend OTP on reset page */
    });
  };

  const resetPassword = async () => {
    if (!/^\d{4,8}$/.test(otp))
      return show("Enter the OTP sent to your email", "error");
    if (!password || password.length < 6)
      return show("Password must be at least 6 characters", "error");
    if (password !== confirm) return show("Passwords do not match", "error");
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/reset-password`, {
        email,
        otp,
        password,
      });
      show("Password updated. You can now sign in.", "success");
      setTimeout(() => (window.location.href = "/signup"), 900);
    } catch (e) {
      const msg = e?.response?.data?.message || "Failed to reset password";
      show(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mb-5" style={{ maxWidth: 720 }}>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={close} />
      )}
      <div className="row text-center py-4">
        <h1 className="display-6">Forgot password</h1>
        <p className="text-muted">
          Receive a one-time code on email and set a new password.
        </p>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          {step === 1 ? (
            <>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="fp_email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="fp_email">Email address</label>
              </div>
              <button
                className="btn btn-primary"
                disabled={loading}
                onClick={sendOtp}
              >
                {loading ? "Sending…" : "Send OTP"}
              </button>
              <a href="/signup" className="btn btn-link ms-2">
                Back to sign in
              </a>
            </>
          ) : (
            <>
              <div className="alert alert-info" role="alert">
                OTP has been sent to <strong>{email}</strong>.
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="fp_otp"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))
                  }
                />
                <label htmlFor="fp_otp">Enter OTP</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="fp_pwd"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="fp_pwd">New password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="fp_pwd2"
                  placeholder="Confirm password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <label htmlFor="fp_pwd2">Confirm new password</label>
              </div>
              <button
                className="btn btn-primary"
                disabled={loading}
                onClick={resetPassword}
              >
                {loading ? "Updating…" : "Set new password"}
              </button>
              <a href="/signup" className="btn btn-link ms-2">
                Use a different email
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
