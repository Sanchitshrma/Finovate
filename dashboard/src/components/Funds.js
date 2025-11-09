import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import Modal from "./Modal";

const Funds = () => {
  const [loading, setLoading] = useState(true);
  const [fundsData, setFundsData] = useState({
    openingBalance: 50000,
    availableMargin: 50000,
    usedMargin: 0,
    availableCash: 50000,
  });
  const [modal, setModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });

  useEffect(() => {
    fetchFundsData();
  }, []);

  const fetchFundsData = async () => {
    try {
      setLoading(true);
      
      // Fetch holdings to calculate used margin
      const holdingsRes = await api.get("/allHoldings");
      const holdings = holdingsRes.data;

      // Calculate used margin (total investment)
      const usedMargin = holdings.reduce(
        (sum, h) => sum + h.avg * h.qty,
        0
      );

      const openingBalance = 50000; // Virtual starting balance
      const availableMargin = openingBalance - usedMargin;

      setFundsData({
        openingBalance,
        availableMargin,
        usedMargin,
        availableCash: availableMargin,
      });
    } catch (error) {
      console.error("Failed to fetch funds data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-IN', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  const handleAddFunds = () => {
    setModal({
      isOpen: true,
      type: 'info',
      title: 'Add Funds',
      message: 'This is a demo app. In a real app, you would add funds via UPI, net banking, or other payment methods.'
    });
  };

  const handleWithdraw = () => {
    if (fundsData.availableCash <= 0) {
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'Insufficient Balance',
        message: 'You do not have sufficient funds to withdraw.'
      });
    } else {
      setModal({
        isOpen: true,
        type: 'info',
        title: 'Withdraw Funds',
        message: 'This is a demo app. In a real app, you would withdraw funds to your linked bank account.'
      });
    }
  };

  const handleOpenCommodity = () => {
    setModal({
      isOpen: true,
      type: 'info',
      title: 'Commodity Account',
      message: 'Commodity trading is not available in this demo. Contact support to enable commodity trading.'
    });
  };

  const handleModalClose = () => {
    setModal({ ...modal, isOpen: false });
  };

  return (
    <>
      <Modal 
        isOpen={modal.isOpen}
        onClose={handleModalClose}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
      
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <Link className="btn btn-green" onClick={handleAddFunds}>Add funds</Link>
        <Link className="btn btn-blue" onClick={handleWithdraw}>Withdraw</Link>
      </div>

      <div className="row funds-row">
        <div className="col funds-col">
          <span>
            <p>Equity {loading && <span style={{ fontSize: '12px', color: '#999' }}>Loading...</span>}</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">₹{formatCurrency(fundsData.availableMargin)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹{formatCurrency(fundsData.usedMargin)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">₹{formatCurrency(fundsData.availableCash)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>₹{formatCurrency(fundsData.openingBalance)}</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>₹{formatCurrency(fundsData.openingBalance)}</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>₹{formatCurrency(fundsData.usedMargin)}</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>₹0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>₹0.00</p>
            </div>
          </div>
        </div>

        <div className="col funds-col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue" onClick={handleOpenCommodity}>Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
