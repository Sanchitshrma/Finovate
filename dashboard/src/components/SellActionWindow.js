import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";

import GeneralContext from "./GeneralContext";
import Modal from "./Modal";
import { watchlist } from "../data/data";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        // Get holdings for current user
        const res = await api.get("/allHoldings");
        setHoldings(res.data);
      } catch (err) {
        console.error("Failed to fetch holdings", err);
      }
    };

    fetchHoldings();

    // Auto-populate price from watchlist
    const stock = watchlist.find((s) => s.name === uid);
    if (stock) {
      setStockPrice(stock.price);
    }
  }, [uid]);

  const stock = holdings.find(item => item.name === uid);
  const availableQty = stock ? stock.qty : 0;

  const { closeSellWindow } = useContext(GeneralContext);

  const handleSellClick = async () => {
    if (stockQuantity <= 0 || stockPrice <= 0) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Invalid Input',
        message: 'Please enter valid quantity and price.'
      });
      return;
    }

    if (stockQuantity > availableQty) {
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'Insufficient Quantity',
        message: `You only have ${availableQty} shares available to sell.`
      });
      return;
    }

    try {
      await api.post("/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      });

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success!',
        message: 'Stock sold successfully!'
      });
      
      // Close window and reload after modal is acknowledged
      setTimeout(() => {
        closeSellWindow();
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Order failed:", error);
      const errorMessage = error.response?.data?.message || "Failed to place order. Please try again.";
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Order Failed',
        message: errorMessage
      });
    }
  };

  const handleModalClose = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <>
      <Modal 
        isOpen={modal.isOpen}
        onClose={handleModalClose}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
      <div className="container buy-sell-window" draggable="true">
      <h2 className="window-title">Sell {uid}</h2>
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
    </>
  );
};

export default SellActionWindow;
