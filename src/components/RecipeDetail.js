// src/components/RecipeDetail.js
import React from "react";

function RecipeDetail({ recipe }) {
  // First, check if recipe is undefined or null
  if (!recipe) {
    return <div>Please select a recipe to see the details.</div>;
  }

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
      <h3>{recipe.title}</h3>
      <img className="card-img-top" src={recipe.image} alt={recipe.title} />

      <h4 className="TextJustify">Ingredients:</h4>
      <ul className="TextJustify">
        {ingredientList.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* Check if instructions exist before rendering */}
      {recipe.analyzedInstructions &&
        recipe.analyzedInstructions.length > 0 && (
          <>
            <h4 className="TextJustify">Instructions:</h4>
            <ol className="TextJustify">{instructionSteps}</ol>
          </>
        )}

      {recipe.servings && (
        <p className="TextJustify">Servings: {recipe.servings}</p>
      )}

      {/* Include any other information you want to display */}
      {/* Example: Dietary tags, if they exist */}
      {recipe.diets && (
        <div className="TextJustify">
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
        <p className="TextJustify">
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
