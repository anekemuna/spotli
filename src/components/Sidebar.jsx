import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabaseClient";
import "./Sidebar.css";

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // TODO: Need to add a trigger or some context to make the profile name shown 
  // TODO (cont): in the avatar to update automatically, without a page refresh
  // get and set username
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();
      if (!error && data) setUsername(data.username);
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <h2>Spotli</h2>
      </div>
      {user && (
        <div
          className="sidebar-avatar"
          title="Profile"
          onClick={() => navigate("/profile")}
        >
          <div className="sidebar-avatar-circle">
            <span
              className="sidebar-avatar-emoji"
              role="img"
              aria-label="avatar"
            >
              😃
            </span>
          </div>
          <div className="sidebar-avatar-username">@{username}</div>
        </div>
      )}
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
            to="/my-posts"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <li>My Posts</li>
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
