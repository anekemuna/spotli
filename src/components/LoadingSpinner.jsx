import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="loading-spinner-wrapper">
    <div className="loading-spinner" />
    <span className="loading-spinner-text">{text}</span>
  </div>
);

export default LoadingSpinner;
