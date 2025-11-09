import React from "react";
import "./PanelModal.css";

const MoreActionsModal = ({ isOpen, onClose, symbol, onRemove }) => {
  if (!isOpen) return null;

  const copySymbol = async () => {
    try { await navigator.clipboard.writeText(symbol); } catch (e) {}
    onClose();
  };

  const openLink = (url) => { window.open(url, "_blank", "noreferrer"); };

  const googleUrl = `https://www.google.com/finance/quote/${encodeURIComponent(symbol)}`;
  const yahooUrl = `https://finance.yahoo.com/quote/${encodeURIComponent(symbol)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="panel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h2>More - {symbol}</h2>
          <button className="panel-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="panel-body actions-list">
          <button className="panel-action danger" onClick={() => { onRemove(symbol); onClose(); }}>Remove from watchlist</button>
          <button className="panel-action" onClick={copySymbol}>Copy symbol</button>
          <button className="panel-action" onClick={() => openLink(googleUrl)}>Open on Google Finance ↗</button>
          <button className="panel-action" onClick={() => openLink(yahooUrl)}>Open on Yahoo Finance ↗</button>
        </div>
      </div>
    </div>
  );
};

export default MoreActionsModal;
