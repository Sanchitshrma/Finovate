import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleBuyClick = () => {
    if (stockQuantity <= 0 || stockPrice <= 0) {
      alert("Please enter valid quantity and price.");
      return;
    }

    axios.post("http://localhost:8000/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    });

    GeneralContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container buy-sell-window" draggable="true">
      <h2 className="window-title">Buy Stocks</h2>
      <div className="form-section">
        <div className="form-group">
          <label htmlFor="qty">Quantity</label>
          <input
            type="number"
            id="qty"
            min="1"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="number"
            id="price"
            step="0.05"
            min="0"
            value={stockPrice}
            onChange={(e) => setStockPrice(Number(e.target.value))}
            className="input-field"
          />
        </div>
      </div>

      <div className="buttons">
        <span className="margin-info">Margin required ₹140.65</span>
        <div className="btn-group">
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
