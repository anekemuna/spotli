import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h2>Nothing to See Here!</h2>
      <p>The page you requested doesn't exist.</p>
      <Link to="/" className="home-btn">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
