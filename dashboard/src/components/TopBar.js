import React, { useState, useEffect } from "react";

import Menu from "./Menu";
import UserMenu from "./UserMenu";
import { getStockPrice } from "../services/stockService";

const TopBar = () => {
  const [nifty, setNifty] = useState({ price: 0, change: 0, changePercent: "0.00%" });
  const [sensex, setSensex] = useState({ price: 0, change: 0, changePercent: "0.00%" });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchIndicesData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchIndicesData, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchIndicesData = async () => {
    try {
      // Fetch NIFTY 50 data
      const niftyData = await getStockPrice("^NSEI", 23500); // NIFTY symbol with fallback
      setNifty(niftyData);

      // Fetch SENSEX data
      const sensexData = await getStockPrice("^BSESN", 77500); // SENSEX symbol with fallback
      setSensex(sensexData);
    } catch (error) {
      console.error("Failed to fetch indices data:", error);
    }
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{nifty.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          <p className={`percent ${nifty.change >= 0 ? 'profit' : 'loss'}`}>
            {nifty.change >= 0 ? '+' : ''}{nifty.changePercent}
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{sensex.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          <p className={`percent ${sensex.change >= 0 ? 'profit' : 'loss'}`}>
            {sensex.change >= 0 ? '+' : ''}{sensex.changePercent}
          </p>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="menu-desktop">
        <Menu />
      </div>

      {/* Hamburger for mobile/tablet */}
      <button
        className="topbar-hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className={menuOpen ? "hamburger open" : "hamburger"} />
      </button>

      <UserMenu />

      {/* Collapsible mobile menu */}
      <div className={`menu-mobile ${menuOpen ? 'open' : ''}`}>
        <Menu />
      </div>
    </div>
  );
};

export default TopBar;
