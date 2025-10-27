import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";

import GeneralContext from "./GeneralContext";
import Modal from "./Modal";
import { watchlist } from "../data/data";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const { closeBuyWindow } = useContext(GeneralContext);

  // Auto-populate price from watchlist
  useEffect(() => {
    const stock = watchlist.find((s) => s.name === uid);
    if (stock) {
      setStockPrice(stock.price);
    }
  }, [uid]);

  const handleBuyClick = async () => {
    if (stockQuantity <= 0 || stockPrice <= 0) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Invalid Input',
        message: 'Please enter valid quantity and price.'
      });
      return;
    }

    try {
      await api.post("/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      });

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success!',
        message: 'Stock purchased successfully!'
      });
      
      // Close window and reload after modal is acknowledged
      setTimeout(() => {
        closeBuyWindow();
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
    closeBuyWindow();
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
      <h2 className="window-title">Buy {uid}</h2>
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
          Total: ₹{(stockQuantity * stockPrice).toFixed(2)}
        </span>
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
    </>
  );
};

export default BuyActionWindow;
