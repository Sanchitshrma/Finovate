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
          <p>
            Sanchit bootstrapped and founded Finovate in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Finovate has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing cricket is his zen.</p>{" "}
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
