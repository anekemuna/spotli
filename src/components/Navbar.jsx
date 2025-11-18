import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleClearButton = () => {
    setSearchInput("");
  };
  return (
    <div className="navbar">
      <div className="search-container">
        <i>🔎</i>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput && (
          <button onClick={handleClearButton} className="clear-button">
            ✕
          </button>
        )}
      </div>

      <div className="filter-container">
        <label htmlFor="flag-filter">Filter:</label>
        <select
          id="flag-filter"
          value={selectedFlag}
          onChange={(e) => setSelectedFlag(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Events</option>
          <option value="concert">🎵 Concert</option>
          <option value="sports">⚽ Sports</option>
          <option value="social">🎉 Social</option>
        </select>
      </div>

      <div className="sort-container">
        <label htmlFor="sort-select">Sort:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Popular</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
