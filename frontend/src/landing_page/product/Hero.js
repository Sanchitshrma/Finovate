import React from "react";
function Hero() {
  return (
    <div className="container p-5 mb-5 border-bottom">
      <div className="text-center mt-5 p-3">
        <h1 style={{ fontSize: "3rem" }}>Finovate Products</h1>
        <h3 className="text-muted mt-3 fs-4">
          Sleek, modern, and intuitive trading platforms
        </h3>
        <p className="mt-3 mb-5">
          Check out our
          <a href="/product" className="mx-1" style={{ textDecoration: "none" }}>
            investment offerings
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
