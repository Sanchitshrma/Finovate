import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const getClass = ({ isActive }) => (isActive ? "menu selected" : "menu");

  return (
    <div className="menu-container">
      <img src="logo2.png" alt="Finovate logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/" end>
              {({ isActive }) => (
                <p className={getClass({ isActive })}>Dashboard</p>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/orders">
              {({ isActive }) => (
                <p className={getClass({ isActive })}>Orders</p>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/holdings">
              {({ isActive }) => (
                <p className={getClass({ isActive })}>Holdings</p>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/positions">
              {({ isActive }) => (
                <p className={getClass({ isActive })}>Positions</p>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/funds">
              {({ isActive }) => (
                <p className={getClass({ isActive })}>Funds</p>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/apps">
              {({ isActive }) => <p className={getClass({ isActive })}>Apps</p>}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
