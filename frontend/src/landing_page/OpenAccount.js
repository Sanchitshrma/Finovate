import React from "react";
function OpenAccount() {
  return (
    <div className="conatiner p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5">Open a Finovate account</h1>
        <p className="mt-2 fs-4 text-muted">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mb-5 mt-3"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;
