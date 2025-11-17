import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      MainLayout
      <Outlet />
    </div>
  );
};

export default MainLayout;
