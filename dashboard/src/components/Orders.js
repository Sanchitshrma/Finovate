import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
// import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div>
          <div className="order-table">
            <div className="title">Orders ({orders.length})</div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price (₹)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.mode}</td>
                    <td>{order.qty}</td>
                    <td>{order.price}</td>
                    <td>{new Date(order.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="responsive-cards" aria-label="Orders list">
            {orders.map((order, index) => (
              <div key={index} className="card-item">
                <div className="card-row"><span className="label">Name</span><span className="value">{order.name}</span></div>
                <div className="card-row"><span className="label">Type</span><span className="value">{order.mode}</span></div>
                <div className="card-row"><span className="label">Quantity</span><span className="value">{order.qty}</span></div>
                <div className="card-row"><span className="label">Price</span><span className="value">₹{order.price}</span></div>
                <div className="card-row"><span className="label">Date</span><span className="value">{new Date(order.date).toLocaleString()}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
