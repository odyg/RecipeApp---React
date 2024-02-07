// src/components/RecipeDetail.js
import React from "react";

function RecipeDetail({ recipe }) {
  // First, check if recipe is undefined or null
  if (!recipe) {
    return <div>Please select a recipe to see the details.</div>;
  }

  // Combine missedIngredients and usedIngredients into a single array
  // const allIngredients = [
  //   ...(recipe.missedIngredients || []),
  //   ...(recipe.usedIngredients || []),
  // ];
  // Ensure there is an array to map over for ingredients
  // const ingredientItems = recipe.missedIngredients
  //   ? recipe.missedIngredients.map((ingredient, index) => (
  //       <li key={index}>{ingredient.original}</li>
  //     ))
  //   : "No ingredients available";
  // Map over the combined array to create ingredient list items
  // const ingredientItems =
  // recipe.extendedIngredients.length > 0
  //     ? allIngredients.map((ingredient, index) => (
  //         <li key={index}>{ingredient.original}</li>
  //       ))
  //     : "No ingredients available";

  // Extract the 'original' field from each ingredient in the extendedIngredients array
  const ingredientList = recipe.extendedIngredients
    ? recipe.extendedIngredients.map((ingredient) => ingredient.original)
    : [];

  // Ensure there is an array to map over for instructions
  const instructionSteps =
    recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0
      ? recipe.analyzedInstructions[0].steps.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))
      : "No instructions available";

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img className="card-img-top" src={recipe.image} alt={recipe.title} />

      <h3>Ingredients:</h3>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* Check if instructions exist before rendering */}
      {recipe.analyzedInstructions &&
        recipe.analyzedInstructions.length > 0 && (
          <>
            <h3>Instructions:</h3>
            <ol>{instructionSteps}</ol>
          </>
        )}

      {/* Add additional details here. Examples: */}
      {recipe.cookingMinutes && (
        <p>Cooking Time: {recipe.cookingMinutes} minutes</p>
      )}

      {recipe.servings && <p>Servings: {recipe.servings}</p>}

      {/* Include any other information you want to display */}
      {/* Example: Dietary tags, if they exist */}
      {recipe.diets && (
        <div>
          <h4>Dietary Tags:</h4>
          <ul>
            {recipe.diets.map((diet, index) => (
              <li key={index}>{diet}</li>
            ))}
          </ul>
        </div>
      )}

      {/* If there's a source URL or credit text, display it */}
      {recipe.sourceUrl && (
        <p>
          Recipe Source:{" "}
          <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
            {recipe.sourceUrl}
          </a>
        </p>
      )}

      {recipe.creditsText && <p>Credits: {recipe.creditsText}</p>}
    </div>
  );
}

export default RecipeDetail;
