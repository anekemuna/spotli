import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };
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
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
