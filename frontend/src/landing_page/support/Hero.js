import React from "react";
function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="row p-4 p-md-5">
        <div className="col-12 col-lg-6 p-3 p-md-5">
          <h4 className="mb-4">Support Portal</h4>
          <h5 className="fs-4 mb-4 mt-2">Search for an answer or browse help topics to create a ticket</h5>
          <input
            className="form-control mt-3 mb-3"
            placeholder="Eg: how do i activate F&O, why is my order getting rejected ..."
          />
          <div className="d-flex flex-wrap gap-3 mt-2">
            <a href="/support" style={{ color: "white" }}>Track account opening</a>
            <a href="/support" style={{ color: "white" }}>Track segment activation</a>
            <a href="/support" style={{ color: "white" }}>Intraday margins</a>
            <a href="/support" style={{ color: "white" }}>Kite user manual</a>
          </div>
        </div>
        <div className="col-12 col-lg-6 p-3 p-md-5">
          <a className="mb-3 d-inline-block" href="/support" style={{ color: "white" }}>
            Track Ticket
          </a>
          <h3 className="fs-4 mb-3 mt-3">Featured</h3>
          <p>
            1. <a href="/support" style={{ color: "white" }}>MCX Crude option contract expiry - February 2025</a>
          </p>
          <p>
            2. <a href="/support" style={{ color: "white" }}>Latest Intraday leverages and Square-off timings</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
