import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { getBatchStockPrices } from "../services/stockService";

const Summary = () => {
  const [user, setUser] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
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
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }

    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      
      // Fetch holdings and positions
      const [holdingsRes, positionsRes] = await Promise.all([
        api.get("/allHoldings"),
        api.get("/allPositions"),
      ]);

      const holdingsData = holdingsRes.data;
      const positionsData = positionsRes.data;

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
          0
        );
        const currentValue = updatedHoldings.reduce(
          (sum, h) => sum + h.price * h.qty,
          0
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

      setPositions(positionsData);
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

  const getUserName = () => {
    if (!user) return "User";
    return user.email ? user.email.split("@")[0] : "User";
  };

  return (
    <>
      <div className="username">
        <h6>Hi, {getUserName()}!</h6>
        {loading && <span style={{ fontSize: '12px', color: '#999' }}>Loading...</span>}
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{formatCurrency(portfolioData.equity)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>₹{formatCurrency(portfolioData.marginsUsed)}</span>{" "}
            </p>
            <p>
              Opening balance <span>₹50.00k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={portfolioData.totalPnL >= 0 ? "profit" : "loss"}>
              ₹{formatCurrency(Math.abs(portfolioData.totalPnL))}{" "}
              <small>
                {portfolioData.totalPnL >= 0 ? "+" : "-"}
                {Math.abs(portfolioData.totalPnLPercent).toFixed(2)}%
              </small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{formatCurrency(portfolioData.currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>₹{formatCurrency(portfolioData.totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
