import React from "react";
function Hero() {
  return (
    <div className="container py-5">
      <div className="row py-4 mt-3 text-center">
        <h1>Pricing</h1>
        <h3 className="text-muted fs-5 mt-2">
          Free equity investments and flat &#8377;20 traday and F&O trades
        </h3>
      </div>
      <div className="row text-center mt-4 g-4">
        <div className="col-12 col-md-4 p-3">
          <img src="media/images/pricingEquity.svg" alt="rupee0" className="img-fluid" />
          <h2 className="mt-3">Free equity delivery</h2>
          <p className="text-muted" style={{ lineHeight: 1.8 }}>
            All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.
          </p>
        </div>
        <div className="col-12 col-md-4 p-3">
          <img src="media/images/intradayTrades.svg" alt="rupee20" className="img-fluid" />
          <h2 className="mt-3">Intraday and F&O trades</h2>
          <p className="text-muted" style={{ lineHeight: 1.8 }}>
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.
          </p>
        </div>
        <div className="col-12 col-md-4 p-3">
          <img src="media/images/pricingEquity.svg" alt="rupee0" className="img-fluid" />
          <h2 className="mt-3">Free direct MF</h2>
          <p className="text-muted" style={{ lineHeight: 1.8 }}>
            All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
