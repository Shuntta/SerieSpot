// components/StarRating.js

import React from "react";

const StarRating = ({ initialRating, onRatingChange, readOnly }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleRatingChange = (newRating) => {
    // Somente chama a função se ela for fornecida e o componente não for somente leitura
    if (!readOnly) {
      // Certifique-se de que onRatingChange é uma função antes de chamá-la
      typeof onRatingChange === "function" && onRatingChange(newRating);
    }
  };

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= initialRating ? "selected" : ""}`}
          onClick={() => handleRatingChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
