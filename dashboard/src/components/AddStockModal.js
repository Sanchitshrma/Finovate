import React, { useState } from "react";
import api from "../utils/axios";
import { watchlist as availableStocks } from "../data/data";
import "./AddStockModal.css";

const AddStockModal = ({ isOpen, onClose, onStockAdded }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const filteredStocks = availableStocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStock = async (symbol) => {
    try {
      setLoading(true);
      setError("");
      
      await api.post("/watchlist", { symbol });
      
      setSearchTerm("");
      onStockAdded(symbol);
      onClose();
    } catch (err) {
      console.error("Failed to add stock:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to add stock to watchlist");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-stock-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Stock to Watchlist</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search stocks (e.g., INFY, TCS, RELIANCE)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="stocks-list">
            {filteredStocks.length === 0 ? (
              <div className="no-results">
                <p>No stocks found</p>
              </div>
            ) : (
              filteredStocks.map((stock) => (
                <div key={stock.name} className="stock-item">
                  <div className="stock-info">
                    <span className="stock-name">{stock.name}</span>
                    <span className="stock-price">₹{stock.price.toFixed(2)}</span>
                  </div>
                  <button
                    className="add-button"
                    onClick={() => handleAddStock(stock.name)}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "+ Add"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;
