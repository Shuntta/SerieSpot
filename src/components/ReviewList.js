import React from "react";
import { Link } from "react-router-dom";
import getCurrentDate from "../assets/utils/getCurrentDate";
import StarRating from "./StarRating"; 
import "../assets/styles/ReviewList.css"

const ReviewList = ({ reviews, title, date }) => {
  const displayDate = date === undefined ? getCurrentDate() : date;

  return (
    <div className="review-list">
      <h2>{title}</h2>

      <div className="card-container">
        {reviews.map((review) => (
          <div className="card" key={review.id}>
            <Link to={`/review/${review.id}`}>
              <div className="card-content">
                <h2 className="title">{review.title}</h2>
                <p>By</p>
                <h3>{review.author}</h3>
                <p className="Hora">{displayDate}</p>
                <p className="PreviewText">{review.body.substring(0, 400)}</p>
                {/* Adicione o componente StarRating aqui */}
                <StarRating
                  reviewId={review.id}
                  initialRating={review.rating} // Se a revisão já tiver uma classificação
                  onRatingChange={(reviewId, newRating) => {
                    // algo com a nova classificação, se necessário
                    console.log(
                      `Review ${reviewId} recebeu uma nova classificação: ${newRating}`
                    );
                    // podes querer enviar isso para um servidor ou atualizar o estado do componente
                  }}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;