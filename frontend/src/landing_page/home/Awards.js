import React from "react";
function Awards() {
  return (
    <div className="container mt-5 py-4">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6 p-3 p-md-4">
          <img src="media/images/largestBroker.svg" alt="largestBroker" className="img-fluid" />
        </div>
        <div className="col-12 col-lg-6 p-3 p-md-4 mt-3 mt-lg-0">
          <h1>Largest stock broker in India</h1>
          <p className="mb-4">
            2+ million Finovate clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li><p>Futures and Options</p></li>
                <li><p>Commodity derivatives</p></li>
                <li><p>Currency derivatives</p></li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li><p>Stocks & IPOs</p></li>
                <li><p>Direct mutual funds</p></li>
                <li><p>Bonds and Govt. Securities</p></li>
              </ul>
            </div>
          </div>
          <img src="media/images/pressLogos.png" alt="Presslogo" className="img-fluid mt-3" />
        </div>
      </div>
    </div>
  );
}

export default Awards;
