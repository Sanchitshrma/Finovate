import React, { useState, useMemo } from "react";
import axios from "axios";
import Toast from "../../components/Toast";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://finovate-uh8i.onrender.com"
    : "http://localhost:8000");

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const emailFromQuery = params.get("email") || "";
  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const emailDisabled = useMemo(() => !!emailFromQuery, [emailFromQuery]);
  const show = (message, type) => setToast({ message, type });
  const close = () => setToast(null);

  const submit = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return show("Enter a valid email", "error");
    if (!/^\d{4,8}$/.test(otp)) return show("Enter the OTP sent to your email", "error");
    if (!password || password.length < 6) return show("Password must be at least 6 characters", "error");
    if (password !== confirm) return show("Passwords do not match", "error");
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/reset-password`, { email, otp, password });
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
      {toast && <Toast message={toast.message} type={toast.type} onClose={close} />}
      <div className="row text-center py-4">
        <h1 className="display-6">Reset password</h1>
        <p className="text-muted">Enter the OTP you received and set a new password.</p>
      </div>
      <div className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="rp_email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailDisabled}
            />
            <label htmlFor="rp_email">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="rp_otp"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 8))}
            />
            <label htmlFor="rp_otp">OTP</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="rp_pwd"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="rp_pwd">New password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="rp_pwd2"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <label htmlFor="rp_pwd2">Confirm new password</label>
          </div>
          <button className="btn btn-primary" disabled={loading} onClick={submit}>
            {loading ? "Updating…" : "Set new password"}
          </button>
          <a href="/forgot-password" className="btn btn-link ms-2">Resend OTP</a>
        </div>
      </div>
    </div>
  );
}