import React from "react";
import "./PanelModal.css";

const AnalyticsModal = ({ isOpen, onClose, symbol, data = {} }) => {
  if (!isOpen) return null;
  const { price = 0, percent = "0%", lastUpdated } = data;
  const googleUrl = `https://www.google.com/finance/quote/${encodeURIComponent(symbol)}`;
  const yahooUrl = `https://finance.yahoo.com/quote/${encodeURIComponent(symbol)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="panel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h2>Analytics - {symbol}</h2>
          <button className="panel-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="panel-body">
          <div className="metric-row">
            <span className="metric-label">Last price</span>
            <span className="metric-value">₹{Number(price).toFixed(2)}</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">Change</span>
            <span className={`metric-value ${String(percent).startsWith('-') ? 'loss' : 'profit'}`}>{percent}</span>
          </div>
          {lastUpdated && (
            <div className="metric-row small">
              <span className="metric-label">Updated</span>
              <span className="metric-value">{new Date(lastUpdated).toLocaleString()}</span>
            </div>
          )}

          <div className="link-row">
            <a href={googleUrl} target="_blank" rel="noreferrer">Open on Google Finance ↗</a>
            <a href={yahooUrl} target="_blank" rel="noreferrer">Open on Yahoo Finance ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
