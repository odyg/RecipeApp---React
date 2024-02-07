// src/components/RecipeList.js
import React, { useState } from "react";
import RecipeItem from "./RecipeItem";
import RecipeDetail from "./RecipeDetail";

// function RecipeList({ recipes }) {
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleView = (recipe) => {
//     setSelectedRecipe(recipe);
//     setShowModal(true);
//   };
function RecipeList({ recipes, onRecipeSelect, selectedRecipe }) {
  const [showModal, setShowModal] = useState(false);
  // const [selectedRecipeId, setSelectedRecipeId] = useState(null); // Hold the selected recipe ID

  // This will be called when a recipe item's view button is clicked
  const handleView = (id) => {
    // setSelectedRecipeId(id); // Set the selected recipe ID
    onRecipeSelect(id); // Fetch the detailed information
    setShowModal(true); // Show the modal
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          {recipes.map((recipe) => (
            <RecipeItem key={recipe.id} recipe={recipe} onView={handleView} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Recipe Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <RecipeDetail recipe={selectedRecipe} />
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop show"></div>}
    </>
  );
}

export default RecipeList;
