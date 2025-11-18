import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <h2>Spotli</h2>
      </div>
      <nav>
        <ul className="nav-list">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <li>Feed</li>
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <li>Create</li>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <li>Settings</li>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <li>Profile</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
