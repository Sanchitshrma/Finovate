import React, { useState } from "react";
import Modal from "./Modal";
import "./Apps.css";

const Apps = () => {
  const [modal, setModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });

  const apps = [
    {
      id: 1,
      name: "Kite Connect",
      icon: "🔗",
      description: "Trading APIs for developers",
      category: "Developer Tools"
    },
    {
      id: 2,
      name: "Coin",
      icon: "💰",
      description: "Direct mutual funds investment",
      category: "Investment"
    },
    {
      id: 3,
      name: "Console",
      icon: "📊",
      description: "Backoffice for trading reports",
      category: "Reports"
    },
    {
      id: 4,
      name: "Sentinel",
      icon: "🔔",
      description: "Price alerts and notifications",
      category: "Tools"
    },
    {
      id: 5,
      name: "Varsity",
      icon: "📚",
      description: "Learn stock market trading",
      category: "Education"
    },
    {
      id: 6,
      name: "GTT Orders",
      icon: "⏰",
      description: "Good Till Triggered orders",
      category: "Trading"
    },
    {
      id: 7,
      name: "Market Watch",
      icon: "📈",
      description: "Real-time market data",
      category: "Tools"
    },
    {
      id: 8,
      name: "Streak",
      icon: "🤖",
      description: "Algo trading platform",
      category: "Trading"
    },
  ];

  const handleAppClick = (app) => {
    setModal({
      isOpen: true,
      type: 'info',
      title: app.name,
      message: `${app.description}. This feature is coming soon in the demo version.`
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
      
      <div className="apps-container">
        <div className="apps-header">
          <h2>Trading Apps & Tools</h2>
          <p>Enhance your trading experience with these powerful tools</p>
        </div>

        <div className="apps-grid">
          {apps.map((app) => (
            <div 
              key={app.id} 
              className="app-card"
              onClick={() => handleAppClick(app)}
            >
              <div className="app-icon">{app.icon}</div>
              <h3 className="app-name">{app.name}</h3>
              <p className="app-description">{app.description}</p>
              <span className="app-category">{app.category}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Apps;
