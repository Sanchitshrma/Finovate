import React from "react";
function Hero() {
  return (
    <div className="conatiner p-5 mb-5">
      <div className="row text-center">
        <img src="media/images/homeHero.png" alt="HeroImage" className="mb-5" />
        <h1 className="mt-5" style={{ fontSize: "3rem" }}>
          Invest in everything
        </h1>
        <p className="fs-4 mb-5 text-muted ">
          Online Platform to invest in stocks, derivaties, mutual funds, and
          more
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Hero;
