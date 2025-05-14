import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/holdings/sanchit123"
        ); // use real user ID
        setHoldings(res.data);
      } catch (err) {
        console.error("Failed to fetch holdings", err);
      }
    };

    fetchHoldings();
  }, []);

  const stock = holdings.find(item => item.name === uid);
  const availableQty = stock ? stock.qty : 0;

  const { closeSellWindow } = useContext(GeneralContext);

  const handleSellClick = async () => {
    if (stockQuantity <= 0 || stockPrice <= 0) {
      alert("Please enter valid quantity and price.");
      return;
    }

    if (stockQuantity > availableQty) {
      alert("You can't sell more than you own.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      });

      closeSellWindow();
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div className="container buy-sell-window" draggable="true">
      <h2 className="window-title">Sell Stocks</h2>
      <p className="available-info">Available Quantity: {availableQty}</p>
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
        <span className="margin-info">
          Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}
        </span>
        <div className="btn-group">
          <Link className="btn btn-red" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
