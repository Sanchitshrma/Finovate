import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { getBatchStockPrices, calculateProfitLoss } from "../services/stockService";

// import { positions } from "../data/data.js";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingTest, setAddingTest] = useState(false);

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
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="title">
          Positions ({allPositions.length})
          {loading && <span style={{ marginLeft: '10px', fontSize: '14px' }}>🔄</span>}
        </h3>
        {allPositions.length === 0 && (
          <button 
            onClick={addSamplePositions}
            disabled={addingTest}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: addingTest ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              opacity: addingTest ? 0.6 : 1
            }}
          >
            {addingTest ? 'Adding...' : 'Add Sample Positions'}
          </button>
        )}
      </div>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

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
        </table>
      </div>
    </>
  );
};

export default Positions;
