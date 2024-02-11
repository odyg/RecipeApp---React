// src/components/SearchBar.js
import React, { useState } from "react";
//, onSearchFocus
function SearchBar({ onSearch, onFilter }) {
  const [input, setInput] = useState("");
  const [diet, setDiet] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setDiet("");
    onFilter("");
  };
  const handleDietChange = (e) => {
    setDiet(e.target.value);
    onFilter(e.target.value); // Call onFilter when a diet is selected
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
    "fodmap friendly",
    "whole 30",
    "dairy free",
  ];

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        className="form-control"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // onFocus={handleFocus}
        placeholder="Search recipes..."
        aria-label="Search recipes"
      />
      <button className="btn btn-outline-secondary" type="submit">
        Search
      </button>
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
    </form>
  );
}

export default SearchBar;
