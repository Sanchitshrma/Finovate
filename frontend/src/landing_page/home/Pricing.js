import React from "react";
function Pricing() {
  return (
    <div className="container mb-5">
      <div className="row g-4 py-4">
        <div className="col-12 col-lg-6 p-3 p-md-4">
          <h1 className="fs-2">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price
            transparency in India. Flat fees and no hidden charges.
          </p>
          <a href="/pricing" style={{ textDecoration: "none" }}>
            See pricing<i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div className="col-12 col-lg-6 p-3 p-md-4">
          <div className="row text-center g-3">
            <div className="col-12 col-sm-6 p-3 border">
              <h1 className="mb-2">&#8377;0</h1>
              <p className="mb-0">Free equity delivery and direct mutual funds</p>
            </div>
            <div className="col-12 col-sm-6 p-3 border">
              <h1 className="mb-2">&#8377;20</h1>
              <p className="mb-0">Intraday and F & O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
