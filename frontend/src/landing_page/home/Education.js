import React from "react";
function Education() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center g-4">
        <div className="col-12 col-lg-6">
          <img src="media/images/education.svg" alt="education" className="img-fluid" />
        </div>
        <div className="col-12 col-lg-6">
          <h1 className="fs-2">Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="/support" style={{ textDecoration: "none" }}>
            Varsity <i className="fa-solid fa-arrow-right"></i>
          </a>
          <p className="mt-4">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="/support" style={{ textDecoration: "none" }}>
            TradingQ&A <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
