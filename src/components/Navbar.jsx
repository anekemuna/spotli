import { useState } from "react";
import "./Navbar.css"

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleClearButton = () => {
    setSearchInput("");
  };
  return (
    <div className="navbar">
      <search>
        <div className="search-container">
            <i>🔎</i>
          <input
            type="text"
            placeholder="Search by title, username or flags..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button onClick={handleClearButton} className="clear-button">
              ✕
            </button>
          )}
        </div>
      </search>
     
    </div>
  );
};

export default Navbar;
