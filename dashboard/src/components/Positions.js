import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { getBatchStockPrices, calculateProfitLoss } from "../services/stockService";

// import { positions } from "../data/data.js";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingTest, setAddingTest] = useState(false);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value || 0);

  // Fetch positions and update with real-time prices
  const fetchPositions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/allPositions");
      const positions = response.data;

      if (positions.length > 0) {
        // Get real-time prices for all stocks
        const symbols = positions.map(p => p.name);
        const fallbackPrices = {};
        positions.forEach(p => {
          fallbackPrices[p.name] = p.price;
        });

        const priceData = await getBatchStockPrices(symbols, fallbackPrices);
        
        // Update positions with live prices
        const updatedPositions = positions.map((position, index) => {
          const liveData = priceData[index];
          if (liveData) {
            const profitLoss = calculateProfitLoss(position.avg, liveData.price);
            return {
              ...position,
              price: liveData.price,
              day: liveData.changePercent,
              isLoss: !profitLoss.isProfit,
            };
          }
          return position;
        });

        setAllPositions(updatedPositions);
      } else {
        setAllPositions(positions);
      }
    } catch (error) {
      console.error('Failed to fetch positions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
    // Refresh every minute
    const interval = setInterval(fetchPositions, 60000);
    return () => clearInterval(interval);
  }, []);

  const addSamplePositions = async () => {
    try {
      setAddingTest(true);
      await api.post('/addSamplePositions');
      // Refresh positions after adding
      await fetchPositions();
      alert('Sample positions added! Refresh to see live prices.');
    } catch (error) {
      console.error('Failed to add sample positions:', error);
      alert('Failed to add sample positions. Check console for details.');
    } finally {
      setAddingTest(false);
    }
  };

  const totals = allPositions.reduce(
    (acc, stock) => {
      const currentValue = stock.price * stock.qty;
      const invested = stock.avg * stock.qty;
      const pnl = currentValue - invested;

      acc.exposure += currentValue;
      acc.pnl += pnl;
      if (pnl >= 0) {
        acc.profitable += 1;
      }

      return acc;
    },
    { exposure: 0, pnl: 0, profitable: 0 }
  );

  const losingPositions = allPositions.length - totals.profitable;

  return (
    <div className="page-shell">
      <section className="page-header">
        <div className="page-header-copy">
          <p className="page-overline">Intraday book</p>
          <div className="page-title-row">
            <h2 className="page-title">Positions</h2>
            <span className="page-badge">{allPositions.length} active</span>
          </div>
          <p className="page-description">
            Watch your open positions, intraday exposure, and running gains or
            losses in real time.
          </p>
        </div>

        <div className="page-header-actions">
          <div className={`page-status ${loading ? "is-loading" : ""}`}>
            {loading ? "Refreshing live positions" : "Updated position snapshot"}
          </div>
          {allPositions.length === 0 && (
            <button
              onClick={addSamplePositions}
              disabled={addingTest}
              className="page-action-button"
            >
              {addingTest ? "Adding..." : "Add Sample Positions"}
            </button>
          )}
        </div>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <p>Market exposure</p>
          <h3>{formatCurrency(totals.exposure)}</h3>
          <span>Total live notional across positions</span>
        </article>
        <article className={`metric-card ${totals.pnl >= 0 ? "profit" : "loss"}`}>
          <p>Open P&amp;L</p>
          <h3>
            {totals.pnl >= 0 ? "+" : "-"}
            {formatCurrency(Math.abs(totals.pnl))}
          </h3>
          <span>Marked to market on current prices</span>
        </article>
        <article className="metric-card">
          <p>Profitable positions</p>
          <h3>{totals.profitable}</h3>
          <span>Positions currently trading in profit</span>
        </article>
        <article className="metric-card">
          <p>Positions under pressure</p>
          <h3>{losingPositions}</h3>
          <span>Open positions currently in drawdown</span>
        </article>
      </section>

      <section className="data-card table-shell">
        <div className="card-head">
          <div>
            <p className="card-kicker">Position book</p>
            <h3 className="card-title">Detailed breakdown</h3>
          </div>
        </div>

        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&amp;L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="responsive-cards" aria-label="Positions list">
          {allPositions.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";
            return (
              <div key={index} className="card-item">
                <div className="card-header">{stock.name}</div>
                <div className="card-row"><span className="label">Product</span><span className="value">{stock.product}</span></div>
                <div className="card-row"><span className="label">Qty</span><span className="value">{stock.qty}</span></div>
                <div className="card-row"><span className="label">Avg</span><span className="value">₹{stock.avg.toFixed(2)}</span></div>
                <div className="card-row"><span className="label">LTP</span><span className="value">₹{stock.price.toFixed(2)}</span></div>
                <div className="card-row"><span className="label">P&amp;L</span><span className={`value ${profClass}`}>{(curValue - stock.avg * stock.qty).toFixed(2)}</span></div>
                <div className="card-row"><span className="label">Chg.</span><span className={`value ${dayClass}`}>{stock.day}</span></div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Positions;
