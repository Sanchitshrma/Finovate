import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { VerticalGraph } from "./VerticalGraph";
import { getBatchStockPrices, calculateProfitLoss } from "../services/stockService";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value || 0);

  // Fetch holdings and update with real-time prices
  const fetchHoldings = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/allHoldings`);
      const holdings = response.data;

      if (holdings.length > 0) {
        // Get real-time prices for all stocks
        const symbols = holdings.map(h => h.name);
        const fallbackPrices = {};
        holdings.forEach(h => {
          fallbackPrices[h.name] = h.price;
        });

        const priceData = await getBatchStockPrices(symbols, fallbackPrices);
        
        // Update holdings with live prices
        const updatedHoldings = holdings.map((holding, index) => {
          const liveData = priceData[index];
          if (liveData) {
            const profitLoss = calculateProfitLoss(holding.avg, liveData.price);
            return {
              ...holding,
              price: liveData.price,
              net: `${profitLoss.isProfit ? '+' : ''}${profitLoss.percent}%`,
              day: liveData.changePercent,
              isLoss: !profitLoss.isProfit,
            };
          }
          return holding;
        });

        setAllHoldings(updatedHoldings);
      } else {
        setAllHoldings(holdings);
      }
    } catch (error) {
      console.error('Failed to fetch holdings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
    // Refresh every minute
    const interval = setInterval(fetchHoldings, 60000);
    return () => clearInterval(interval);
  }, []);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totals = allHoldings.reduce(
    (acc, stock) => {
      const invested = stock.avg * stock.qty;
      const currentValue = stock.price * stock.qty;
      const pnl = currentValue - invested;

      acc.invested += invested;
      acc.currentValue += currentValue;
      acc.pnl += pnl;
      if (pnl >= 0) {
        acc.gainers += 1;
      } else {
        acc.losers += 1;
      }

      return acc;
    },
    { invested: 0, currentValue: 0, pnl: 0, gainers: 0, losers: 0 }
  );

  const pnlPercent =
    totals.invested > 0 ? (totals.pnl / totals.invested) * 100 : 0;

  return (
    <div className="page-shell">
      <section className="page-header">
        <div className="page-header-copy">
          <p className="page-overline">Portfolio book</p>
          <div className="page-title-row">
            <h2 className="page-title">Holdings</h2>
            <span className="page-badge">{allHoldings.length} instruments</span>
          </div>
          <p className="page-description">
            Review your current long-term exposure, live value, and portfolio
            return from a cleaner overview.
          </p>
        </div>
        <div className={`page-status ${loading ? "is-loading" : ""}`}>
          {loading ? "Refreshing market prices" : "Live holdings snapshot"}
        </div>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <p>Current value</p>
          <h3>{formatCurrency(totals.currentValue)}</h3>
          <span>{allHoldings.length} tracked holdings</span>
        </article>
        <article className="metric-card">
          <p>Invested capital</p>
          <h3>{formatCurrency(totals.invested)}</h3>
          <span>Average cost across active positions</span>
        </article>
        <article className={`metric-card ${totals.pnl >= 0 ? "profit" : "loss"}`}>
          <p>Net P&L</p>
          <h3>
            {totals.pnl >= 0 ? "+" : "-"}
            {formatCurrency(Math.abs(totals.pnl))}
          </h3>
          <span>
            {pnlPercent >= 0 ? "+" : ""}
            {pnlPercent.toFixed(2)}% overall return
          </span>
        </article>
        <article className="metric-card">
          <p>Winners vs losers</p>
          <h3>
            {totals.gainers} / {totals.losers}
          </h3>
          <span>Profitable holdings compared with laggards</span>
        </article>
      </section>

      <section className="data-card table-shell">
        <div className="card-head">
          <div>
            <p className="card-kicker">Holdings book</p>
            <h3 className="card-title">Detailed breakdown</h3>
          </div>
        </div>

        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&amp;L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {allHoldings.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td className={profClass}>{stock.net}</td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="responsive-cards" aria-label="Holdings list">
          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";
            return (
              <div key={index} className="card-item">
                <div className="card-header">{stock.name}</div>
                <div className="card-row"><span className="label">Qty</span><span className="value">{stock.qty}</span></div>
                <div className="card-row"><span className="label">Avg</span><span className="value">₹{stock.avg.toFixed(2)}</span></div>
                <div className="card-row"><span className="label">LTP</span><span className="value">₹{stock.price.toFixed(2)}</span></div>
                <div className="card-row"><span className="label">Cur. val</span><span className="value">₹{curValue.toFixed(2)}</span></div>
                <div className="card-row"><span className="label">P&amp;L</span><span className={`value ${profClass}`}>{(curValue - stock.avg * stock.qty).toFixed(2)}</span></div>
                <div className="card-row"><span className="label">Net chg.</span><span className={`value ${profClass}`}>{stock.net}</span></div>
                <div className="card-row"><span className="label">Day chg.</span><span className={`value ${dayClass}`}>{stock.day}</span></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="page-chart-grid">
        <article className="data-card summary-strip">
          <div className="summary-strip-item">
            <p>Total investment</p>
            <h4>{formatCurrency(totals.invested)}</h4>
          </div>
          <div className="summary-strip-item">
            <p>Current value</p>
            <h4>{formatCurrency(totals.currentValue)}</h4>
          </div>
          <div className="summary-strip-item">
            <p>Total return</p>
            <h4 className={totals.pnl >= 0 ? "profit" : "loss"}>
              {pnlPercent >= 0 ? "+" : ""}
              {pnlPercent.toFixed(2)}%
            </h4>
          </div>
        </article>

        <article className="data-card chart-card">
          <div className="card-head">
            <div>
              <p className="card-kicker">Performance map</p>
              <h3 className="card-title">Price distribution</h3>
            </div>
          </div>
          <VerticalGraph data={data} />
        </article>
      </section>
    </div>
  );
};

export default Holdings;
