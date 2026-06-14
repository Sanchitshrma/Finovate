import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import Profile from "./Profile";
import Settings from "./Settings";
import StockInsights from "./StockInsights";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <div className="dashboard-main">
      <div className="dashboard-shell">
        <div className="dashboard-heading">
          <p className="dashboard-eyebrow">Portfolio command center</p>
        </div>

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <GeneralContextProvider>
              <WatchList />
            </GeneralContextProvider>
          </aside>
          <main className="dashboard-content">
            <Routes>
              <Route exact path="/" element={<Summary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/ai" element={<StockInsights />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
