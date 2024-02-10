// src/components/RecipeItem.js
import React from "react";

function RecipeItem({ recipe, onView }) {
  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img className="card-img-top" src={recipe.image} alt={recipe.title} />
        <div className="card-body">
          <p className="card-text">{recipe.title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => onView(recipe.id)}
              >
                View
              </button>
            </div>
            <small className="text-muted">
              Likes: {recipe.aggregateLikes} 👍
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;
