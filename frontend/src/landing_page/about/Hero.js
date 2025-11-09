import React from "react";
function Hero() {
  return (
    <div className="container">
      <div className="row mt-5 mb-4">
        <h1 className="fs-2 text-center">
          We pioneered the discount broking model in India.
          <br />Now, we are breaking ground with our technology.
        </h1>
      </div>
      <div className="row border-top text-muted py-4 py-md-5" style={{ lineHeight: 1.8 }}>
        <div className="col-12 col-lg-6 p-3 p-md-4">
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company
            Finovate, a combination of Finance and Innovate.
          </p>
          <p>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>
          <p>
            Over 1+ Crore clients place millions of orders every day through our
            powerful ecosystem of investment platforms, contributing over 15% of
            all Indian retail trading volumes.
          </p>
        </div>
        <div className="col-12 col-lg-6 p-3 p-md-4">
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <p>
            <a href="/" style={{ textDecoration: "none" }}>
              Rainmatter
            </a>
            , our fintech fund and incubator, has invested in several fintech
            startups with the goal of growing the Indian capital markets.
          </p>
          <p>
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our blog or see what the media is saying about
            us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
