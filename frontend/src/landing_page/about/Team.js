import React from "react";
function Team() {
  return (
    <div className="container py-5">
      <div className="row mt-4 pt-4 border-top">
        <h1 className="text-center">People</h1>
      </div>
      <div className="row text-muted align-items-center" style={{ lineHeight: 1.8 }}>
        <div className="col-12 col-lg-6 p-4 text-center">
          <img
            src="media/images/SanchitSharma.jpeg"
            className="img-fluid rounded-circle"
            style={{ maxWidth: "300px" }}
            alt="img"
          />
          <h4 className="mt-4">Sanchit Sharma</h4>
          <h5>Founder, CEO</h5>
        </div>
        <div className="col-12 col-lg-6 p-4">
          <p>Sanchit is a web developer.</p>
          <p></p>
          <p></p>
          <p>
            Connect on
            <a href="/" style={{ textDecoration: "none" }} className="ms-1">Homepage</a>
            /
            <a href="/" style={{ textDecoration: "none" }} className="mx-1">TradingQnA</a>
            /
            <a href="/" style={{ textDecoration: "none" }} className="ms-1">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
