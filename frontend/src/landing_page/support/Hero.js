import React from "react";
function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="row p-5">
        <div className="col-6 p-5">
          <h4 className="mb-5">Support Portal</h4>
          <h7 className="fs-3 mb-5 mt-5">
            Search for an answer or browse help topics to create a ticket
          </h7>
          <input
            className="mt-5 mb-5"
            placeholder="Eg: how do i activate F&O, why is my order getting rejected ..."
          />
          <br></br>
          <a href="/" style={{ color: "white" }}>
            Track account opening
          </a>{" "}
          &nbsp; &nbsp;
          <a href="/" style={{ color: "white" }}>
            Track segment activation
          </a>
          &nbsp;&nbsp;
          <a href="/" style={{ color: "white" }}>
            Intraday margins
          </a>
          &nbsp;&nbsp;
          <br></br>
          <a href="/" style={{ color: "white" }}>
            Kite user manual
          </a>
          &nbsp;&nbsp;
        </div>
        <div className="col-6 p-5">
          <a className="mb-5" href="/" style={{ color: "white" }}>
            Track Ticket
          </a>
          <h3 className="fs-3 mb-5 mt-5">Featured</h3>
          <p>
            1.
            <a href="/" style={{ color: "white" }}>
              {" "}
              MCX Crude option contract expiry - February 2025
            </a>
          </p>
          <p>
            2.
            <a href="/" style={{ color: "white" }}>
              Latest Intraday leverages and Square-off timings
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
