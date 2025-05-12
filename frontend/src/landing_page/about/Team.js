import React from "react";
function Team() {
  return (
    <div className="container p-5 ">
      <div className="row mt-5 p-5  border-top">
        <h1 className=" text-center">People</h1>
      </div>
      <div
        className="row p-4 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-4 text-center">
          <img
            src="media/images/SanchitSharma.jpeg"
            style={{ width: "70%", borderRadius: "100%" }}
            alt="img"
          />
          <h4 className="mt-5">Sanchit Sharma</h4>
          <h5>Founder, CEO</h5>
        </div>
        <div className="col-6 p-4">
          <p>Sanchit is a web developer.</p>
          <p></p>
          <p></p>{" "}
          <p>
            Connect on{" "}
            <a href="/" style={{ textDecoration: "none" }}>
              Homepage
            </a>{" "}
            /{" "}
            <a href="/" style={{ textDecoration: "none" }}>
              TradingQnA
            </a>{" "}
            /{" "}
            <a href="/" style={{ textDecoration: "none" }}>
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
