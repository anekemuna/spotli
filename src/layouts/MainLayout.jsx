import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./MainLayout.css"

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
