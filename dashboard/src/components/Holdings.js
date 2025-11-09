import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import { VerticalGraph } from "./VerticalGraph";
import { getBatchStockPrices, calculateProfitLoss } from "../services/stockService";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">
        Holdings ({allHoldings.length})
        {loading && <span style={{ marginLeft: '10px', fontSize: '14px' }}>🔄</span>}
      </h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

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
        </table>
      </div>

      {/* Mobile cards */}
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
              <div className="card-row"><span className="label">P&L</span><span className={`value ${profClass}`}>{(curValue - stock.avg * stock.qty).toFixed(2)}</span></div>
              <div className="card-row"><span className="label">Net chg.</span><span className={`value ${profClass}`}>{stock.net}</span></div>
              <div className="card-row"><span className="label">Day chg.</span><span className={`value ${dayClass}`}>{stock.day}</span></div>
            </div>
          );
        })}
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
