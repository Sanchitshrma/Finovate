import React, { useState, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
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

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeBuyWindow();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeBuyWindow]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value || 0);

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

  return createPortal(
    <>
      <Modal 
        isOpen={modal.isOpen}
        onClose={handleModalClose}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
      <div className="trade-window-overlay" onClick={handleCancelClick}>
        <div
          className="trade-window trade-window-buy"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="trade-window-header">
            <div>
              <p className="trade-window-kicker">Execution ticket</p>
              <h2 className="trade-window-title">Buy {uid}</h2>
              <p className="trade-window-subtitle">
                Review quantity, price, and estimated order value before sending
                the trade.
              </p>
            </div>
            <button
              className="trade-window-close"
              onClick={handleCancelClick}
              aria-label="Close buy window"
            >
              ×
            </button>
          </div>

          <div className="trade-window-body">
            <section className="trade-window-panel">
              <div className="trade-stat-grid">
                <article className="trade-stat-card">
                  <p>Instrument</p>
                  <h3>{uid}</h3>
                </article>
                <article className="trade-stat-card">
                  <p>Reference price</p>
                  <h3>{formatCurrency(stockPrice)}</h3>
                </article>
                <article className="trade-stat-card accent">
                  <p>Order value</p>
                  <h3>{formatCurrency(stockQuantity * stockPrice)}</h3>
                </article>
              </div>

              <div className="trade-form-grid">
                <div className="form-group">
                  <label htmlFor="buyQty">Quantity</label>
                  <input
                    type="number"
                    id="buyQty"
                    min="1"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="buyPrice">Price (₹)</label>
                  <input
                    type="number"
                    id="buyPrice"
                    step="0.05"
                    min="0"
                    value={stockPrice}
                    onChange={(e) => setStockPrice(Number(e.target.value))}
                    className="input-field"
                  />
                </div>
              </div>
            </section>

            <aside className="trade-window-summary">
              <p className="trade-window-kicker">Order summary</p>
              <div className="trade-summary-list">
                <div>
                  <span>Order type</span>
                  <strong>Market buy</strong>
                </div>
                <div>
                  <span>Quantity</span>
                  <strong>{stockQuantity}</strong>
                </div>
                <div>
                  <span>Limit price</span>
                  <strong>{formatCurrency(stockPrice)}</strong>
                </div>
                <div>
                  <span>Estimated total</span>
                  <strong>{formatCurrency(stockQuantity * stockPrice)}</strong>
                </div>
              </div>
            </aside>
          </div>

          <div className="trade-window-footer">
            <span className="margin-info">
              Estimated order value {formatCurrency(stockQuantity * stockPrice)}
            </span>
            <div className="btn-group">
              <button className="trade-btn trade-btn-secondary" onClick={handleCancelClick}>
                Cancel
              </button>
              <button className="trade-btn trade-btn-primary" onClick={handleBuyClick}>
                Confirm Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default BuyActionWindow;
