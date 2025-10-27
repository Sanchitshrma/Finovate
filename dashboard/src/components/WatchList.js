import React, { useState, useContext, useEffect } from "react";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import { watchlist as staticWatchlist } from "../data/data";
import { getBatchStockPrices } from "../services/stockService";
import api from "../utils/axios";
import AddStockModal from "./AddStockModal";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { DoughnutChart } from "./DoughnutChart";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [userWatchlistSymbols, setUserWatchlistSymbols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const refreshInterval = parseInt(process.env.REACT_APP_PRICE_REFRESH_INTERVAL || '30') * 1000;

  // Fetch user's watchlist from backend
  const fetchUserWatchlist = async () => {
    try {
      const response = await api.get("/watchlist");
      setUserWatchlistSymbols(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user watchlist:', error);
      return [];
    }
  };

  // Fetch real-time prices for user's watchlist
  const updatePrices = async (symbols = userWatchlistSymbols) => {
    try {
      setLoading(true);
      
      if (symbols.length === 0) {
        setWatchlist([]);
        return;
      }

      // Filter static watchlist to only include user's stocks
      const userStocks = staticWatchlist.filter(stock => 
        symbols.includes(stock.name)
      );

      const fallbackPrices = {};
      userStocks.forEach(stock => {
        fallbackPrices[stock.name] = stock.price;
      });

      const priceData = await getBatchStockPrices(symbols, fallbackPrices);
      
      // Update watchlist with new prices
      const updatedWatchlist = symbols.map((symbol, index) => {
        const stockInfo = staticWatchlist.find(s => s.name === symbol) || {
          name: symbol,
          price: 0,
          percent: "0%",
          isDown: false,
        };
        
        const liveData = priceData[index];
        if (liveData) {
          return {
            ...stockInfo,
            price: liveData.price,
            percent: liveData.changePercent,
            isDown: liveData.change < 0,
            lastUpdated: liveData.timestamp,
            isSimulated: liveData.isSimulated || false,
          };
        }
        return stockInfo;
      });

      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error('Failed to update prices:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load of user watchlist
  useEffect(() => {
    const initializeWatchlist = async () => {
      const symbols = await fetchUserWatchlist();
      if (symbols.length > 0) {
        await updatePrices(symbols);
      }
    };
    initializeWatchlist();
  }, []);

  // Periodic price updates
  useEffect(() => {
    if (userWatchlistSymbols.length === 0) return;
    
    const interval = setInterval(() => {
      updatePrices(userWatchlistSymbols);
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [userWatchlistSymbols, refreshInterval]);

  // Handle adding stock
  const handleStockAdded = async (symbol) => {
    const updatedSymbols = await fetchUserWatchlist();
    await updatePrices(updatedSymbols);
  };

  // Handle removing stock
  const handleRemoveStock = async (symbol) => {
    try {
      await api.delete(`/watchlist/${symbol}`);
      const updatedSymbols = await fetchUserWatchlist();
      await updatePrices(updatedSymbols);
    } catch (error) {
      console.error('Failed to remove stock:', error);
      alert('Failed to remove stock from watchlist');
    }
  };

  const labels = watchlist.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // export const data = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <button 
          className="add-stock-button"
          onClick={() => setIsAddModalOpen(true)}
          title="Add stock to watchlist"
        >
          + Add Stock
        </button>
        <span className="counts">
          {watchlist.length} / 50
          {loading && <span style={{ marginLeft: '10px', fontSize: '12px' }}>🔄</span>}
        </span>
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p>Your watchlist is empty</p>
          <button 
            className="add-first-stock"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add your first stock
          </button>
        </div>
      ) : (
        <>
          <ul className="list">
            {watchlist.map((stock, index) => {
              return (
                <WatchListItem 
                  stock={stock} 
                  key={index} 
                  onRemove={handleRemoveStock}
                />
              );
            })}
          </ul>
          <DoughnutChart data={data} />
        </>
      )}
      
      <AddStockModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onStockAdded={handleStockAdded}
      />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onRemove }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handelMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handelMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Remove ${stock.name} from watchlist?`)) {
      onRemove(stock.name);
    }
  };

  return (
    <li onMouseEnter={handelMouseEnter} onMouseLeave={handelMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "dowm" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="down" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <>
          <button 
            className="delete-button"
            onClick={handleDelete}
            title="Remove from watchlist"
          >
            ×
          </button>
          <WatchListActions uid={stock.name} />
        </>
      )}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleSellClick = () => {
    generalContext.openSellWindow(uid);
  };

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleSellClick}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
