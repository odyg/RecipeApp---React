// const ApiKey = "b8e21959d5d045f2abb82f4974b74ef9";
// src/App.js
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDietFilter, setShowDietFilter] = useState(false);
  const ApiKey = "b8e21959d5d045f2abb82f4974b74ef9";

  const [allRecipes, setAllRecipes] = useState([]);

  const handleFilter = (diet) => {
    // If 'All Diets' is selected, reset to the original recipe list
    if (!diet) {
      setRecipes(allRecipes);
      return;
    }

    // Filter the recipes based on the selected diet
    const filtered = allRecipes.filter((recipe) => recipe.diets.includes(diet));
    setRecipes(filtered);
  };

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
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodedQuery}&number=12&apiKey=${ApiKey}`;

    // Fetch recipes from Spoonacular API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((basicdata) => {
        const ids = basicdata.map((recipe) => recipe.id).join(",");
        fetchBulkRecipeDetails(ids);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    // setShowDietFilter(true);
  };

  const fetchBulkRecipeDetails = (ids) => {
    const detailsUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${ApiKey}`;

    fetch(detailsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bulk recipe details");
        }
        return response.json();
      })
      .then((unprocessedData) => {
        // Process each recipe to ensure it has an image
        const data = unprocessedData.map((recipe) => {
          // Check and update the image if necessary
          const updatedRecipe = recipe.image
            ? recipe
            : {
                ...recipe,
                image:
                  "https://spoonacular.com/recipeImages/157103-556x370.jpg",
              };

          // Check and update the diets array if it's empty
          if (!updatedRecipe.diets || updatedRecipe.diets.length === 0) {
            updatedRecipe.diets = ["unknown"];
          }

          return updatedRecipe;
        });

        setAllRecipes(data); // Update allRecipes with the fetched and formatted data
        setRecipes(data); // Initially display all fetched recipes
        setShowDietFilter(true); // Show the filter dropdown after recipes are fetched

        console.log("Fetched detailed recipes data:", data);
        // You can update your state here if you want to store the detailed recipes
      })
      .catch((error) => {
        console.error("Error fetching bulk recipe details: ", error);
        setShowDietFilter(false);
      });
  };

  const selectRecipe = (id) => {
    console.log("Selected recipe ID:", id);

    // Find the recipe in the local state using the provided ID
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (recipe) {
      console.log("Fetched detailed recipe data from state:", recipe);
      setSelectedRecipe(recipe);
    } else {
      console.error("Recipe not found in the local state");
      // Handle the case where the recipe is not found (e.g., display a message)
    }
  };

  const onSearchFocus = () => {
    setShowDietFilter(false); // Hide the filter dropdown when the search bar is focused
  };

  return (
    <div className="App">
      <h2>Recipe App</h2>
      <h3>Enter the ingredients you have available.</h3>
      <p>
        Separate ingredients by comma.{" "}
        <em>For example: apples,banana,cinnamon</em>
      </p>

      <SearchBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        showFilter={showDietFilter}
        onSearchFocus={onSearchFocus}
      />
      <RecipeList
        recipes={recipes}
        onRecipeSelect={selectRecipe}
        selectedRecipe={selectedRecipe}
      />
    </div>
  );
}

export default App;
