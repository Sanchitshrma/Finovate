import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { getBatchStockPrices } from "../services/stockService";

const Summary = () => {
  const [user, setUser] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState({
    totalInvestment: 0,
    currentValue: 0,
    totalPnL: 0,
    totalPnLPercent: 0,
    equity: 50000, // Starting balance
    marginsUsed: 0,
  });

  useEffect(() => {
    const refreshUser = () => {
      const userData = localStorage.getItem("user");
      if (!userData) {
        setUser(null);
        return;
      }

      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    };

    refreshUser();
    window.addEventListener("user-updated", refreshUser);
    window.addEventListener("focus", refreshUser);

    fetchPortfolioData();

    return () => {
      window.removeEventListener("user-updated", refreshUser);
      window.removeEventListener("focus", refreshUser);
    };
  }, []);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);

      // Fetch holdings
      const holdingsRes = await api.get("/allHoldings");

      const holdingsData = holdingsRes.data;

      // Get real-time prices if there are holdings
      if (holdingsData.length > 0) {
        const symbols = holdingsData.map((h) => h.name);
        const fallbackPrices = {};
        holdingsData.forEach((h) => {
          fallbackPrices[h.name] = h.price;
        });

        const priceData = await getBatchStockPrices(symbols, fallbackPrices);

        // Update holdings with live prices
        const updatedHoldings = holdingsData.map((holding, index) => {
          const liveData = priceData[index];
          if (liveData) {
            return {
              ...holding,
              price: liveData.price,
            };
          }
          return holding;
        });

        setHoldings(updatedHoldings);

        // Calculate portfolio metrics
        const totalInvestment = updatedHoldings.reduce(
          (sum, h) => sum + h.avg * h.qty,
          0,
        );
        const currentValue = updatedHoldings.reduce(
          (sum, h) => sum + h.price * h.qty,
          0,
        );
        const totalPnL = currentValue - totalInvestment;
        const totalPnLPercent =
          totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

        setPortfolioData({
          totalInvestment,
          currentValue,
          totalPnL,
          totalPnLPercent,
          equity: 50000 - totalInvestment, // Available balance
          marginsUsed: totalInvestment,
        });
      } else {
        setHoldings([]);
        setPortfolioData({
          totalInvestment: 0,
          currentValue: 0,
          totalPnL: 0,
          totalPnLPercent: 0,
          equity: 50000,
          marginsUsed: 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch portfolio data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `${(value / 100000).toFixed(2)}L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}k`;
    }
    return value.toFixed(2);
  };

  const formatCompactCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value || 0);

  const formatFullCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value || 0);

  const getUserName = () => {
    if (!user) return "User";
    if (user.displayName && user.displayName.trim().length > 0) {
      return user.displayName.trim();
    }
    return user.email ? user.email.split("@")[0] : "User";
  };

  const investedRatio =
    portfolioData.totalInvestment > 0
      ? (portfolioData.totalInvestment / 50000) * 100
      : 0;

  const summaryCards = [
    {
      label: "Available Margin",
      value: formatFullCurrency(portfolioData.equity),
      meta: `${investedRatio.toFixed(1)}% of capital deployed`,
    },
    {
      label: "Current Value",
      value: formatFullCurrency(portfolioData.currentValue),
      meta: `${holdings.length} active holdings`,
    },
    {
      label: "Net P&L",
      value: `${portfolioData.totalPnL >= 0 ? "+" : "-"}${formatFullCurrency(
        Math.abs(portfolioData.totalPnL),
      )}`,
      meta: `${portfolioData.totalPnLPercent >= 0 ? "+" : ""}${portfolioData.totalPnLPercent.toFixed(2)}% overall return`,
      tone: portfolioData.totalPnL >= 0 ? "profit" : "loss",
    },
  ];

  return (
    <div className="summary-shell">
      <section className="summary-hero">
        <div className="summary-hero-copy">
          <p className="summary-kicker">Portfolio overview</p>
          <h2>Welcome back, {getUserName()}</h2>
          <p className="summary-description">
            Track capital allocation, portfolio value, and performance from a
            cleaner operating view.
          </p>
        </div>
        <div className="summary-badges">
          <span className="summary-badge">
            Opening balance {formatCompactCurrency(50000)}
          </span>
          <span className={`summary-badge ${loading ? "is-muted" : ""}`}>
            {loading ? "Refreshing portfolio data" : "Live portfolio snapshot"}
          </span>
        </div>
      </section>

      <section className="summary-card-grid">
        {summaryCards.map((card) => (
          <article
            className={`summary-card ${card.tone || ""}`}
            key={card.label}
          >
            <p className="summary-card-label">{card.label}</p>
            <h3>{card.value}</h3>
            <p className="summary-card-meta">{card.meta}</p>
          </article>
        ))}
      </section>

      <section className="summary-detail-grid">
        <article className="summary-panel">
          <div className="summary-panel-head">
            <div>
              <p className="summary-panel-label">Capital allocation</p>
              <h3>Equity</h3>
            </div>
            <span className="summary-chip">
              {investedRatio.toFixed(1)}% invested
            </span>
          </div>

          <div className="summary-metrics">
            <div>
              <p>Margin available</p>
              <strong>{formatFullCurrency(portfolioData.equity)}</strong>
            </div>
            <div>
              <p>Margins used</p>
              <strong>{formatFullCurrency(portfolioData.marginsUsed)}</strong>
            </div>
            <div>
              <p>Opening balance</p>
              <strong>{formatFullCurrency(50000)}</strong>
            </div>
          </div>
        </article>

        <article className="summary-panel">
          <div className="summary-panel-head">
            <div>
              <p className="summary-panel-label">Performance</p>
              <h3>Holdings ({holdings.length})</h3>
            </div>
            <span
              className={`summary-chip ${
                portfolioData.totalPnL >= 0 ? "profit" : "loss"
              }`}
            >
              {portfolioData.totalPnL >= 0 ? "Outperforming" : "Under pressure"}
            </span>
          </div>

          <div className="summary-metrics">
            <div>
              <p>Current value</p>
              <strong>{formatFullCurrency(portfolioData.currentValue)}</strong>
            </div>
            <div>
              <p>Total investment</p>
              <strong>
                {formatFullCurrency(portfolioData.totalInvestment)}
              </strong>
            </div>
            <div>
              <p>Total return</p>
              <strong
                className={portfolioData.totalPnL >= 0 ? "profit" : "loss"}
              >
                {portfolioData.totalPnL >= 0 ? "+" : "-"}
                {formatCurrency(Math.abs(portfolioData.totalPnL))} (
                {Math.abs(portfolioData.totalPnLPercent).toFixed(2)}%)
              </strong>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Summary;
