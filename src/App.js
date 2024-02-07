// const ApiKey = "b8e21959d5d045f2abb82f4974b74ef9";
// src/App.js
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
// import RecipeDetail from "./components/RecipeDetail";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const ApiKey = "b8e21959d5d045f2abb82f4974b74ef9";

  const handleSearch = (query) => {
    // Split the query by commas, trim whitespace, and then join with a comma
    // This ensures that multi-word ingredients are kept together
    const formattedQuery = query
      .split(",")
      .map((ingredient) => ingredient.trim())
      .join(",");

    // Encode the formatted query to ensure spaces are properly represented in the URL
    const encodedQuery = encodeURIComponent(formattedQuery);

    // Construct the API URL with the encoded search query
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodedQuery}&number=10&apiKey=${ApiKey}`;

    // Fetch recipes from Spoonacular API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update the recipes state with the fetched data
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  // Function to handle recipe selection
  // const selectRecipe = (id) => {
  //   // Find the recipe in the recipes array by its id
  //   const recipe = recipes.find((recipe) => recipe.id === id);
  //   setSelectedRecipe(recipe);
  // };

  const selectRecipe = (id) => {
    console.log("Selected recipe ID:", id);
    const detailsUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${ApiKey}`;

    fetch(detailsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched detailed recipe data:", data);
        setSelectedRecipe(data);
        console.log("Updated selectedRecipe state:", selectedRecipe);
      })
      .catch((error) => {
        console.error("Error fetching recipe details: ", error);
      });
  };
  // useEffect(() => {
  //   console.log("Updated selectedRecipe state:", selectedRecipe);
  // }, [selectedRecipe]);

  return (
    <div className="App">
      <h2>Recipe App</h2>
      <h3>Enter the ingredients you have available.</h3>
      <p>
        Separate ingredients by comma.{" "}
        <em>For example: apples,banana,cinnamon</em>
      </p>
      <SearchBar onSearch={handleSearch} />
      {/* Pass selectedRecipe and selectRecipe to RecipeList */}
      <RecipeList
        recipes={recipes}
        onRecipeSelect={selectRecipe}
        selectedRecipe={selectedRecipe}
      />
      {/* The standalone RecipeDetail component should be removed */}

      {/* <SearchBar onSearch={handleSearch} />
      <RecipeList recipes={recipes} onRecipeSelect={selectRecipe} />
      <RecipeDetail recipe={selectedRecipe} />
      <RecipeList recipes={recipes} onRecipeSelect={selectRecipe} /> */}
    </div>
  );
}

export default App;
