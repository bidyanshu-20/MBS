import React from "react";
import "./Search.css";

const Search = ({ search, onSearchChange }) => {
  return (
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search Users by Roll No..."
        value={search}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default Search;
