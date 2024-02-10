// src/components/SearchBar.js
import React, { useState } from "react";

function SearchBar({ onSearch, onFilter, showFilter, onSearchFocus }) {
  const [input, setInput] = useState("");
  const [diet, setDiet] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };
  const handleDietChange = (e) => {
    setDiet(e.target.value);
    onFilter(e.target.value); // Call onFilter when a diet is selected
  };

  const handleFocus = () => {
    onSearchFocus(); // Call onSearchFocus when the search bar is focused
  };

  const diets = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto-vegetarian",
    "ovo-vegetarian",
    "lacto ovo vegetarian",
    "vegan",
    "pescetarian",
    "paleo",
    "primal",
    "low fodmap",
    "whole30",
  ];

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        className="form-control"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={handleFocus}
        placeholder="Search recipes..."
        aria-label="Search recipes"
      />
      <button className="btn btn-outline-secondary" type="submit">
        Search
      </button>
      {showFilter && (
        <select
          className="form-select"
          value={diet}
          onChange={handleDietChange}
          aria-label="Filter by Diet"
          style={{ textTransform: "capitalize" }}
        >
          <option value="">All Diets</option>
          {diets.map((dietOption, index) => (
            <option key={index} value={dietOption}>
              {dietOption}
            </option>
          ))}
        </select>
      )}
    </form>
  );
}

export default SearchBar;
