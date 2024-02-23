import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import StarRating from "./StarRating"; 
import "../assets/styles/ReviewList.css"

const ReviewList = () => {
  const extractMovieIdFromUrl = (pathname) => {
    const parts = pathname.split("/"); // Dividir a URL em partes
    return parts[parts.length - 1]; // Retornar o último segmento da URL, que deve ser o ID do filme
  };
  
  const [reviews, setReviews] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const location = useLocation();
  const movieId = extractMovieIdFromUrl(location.pathname); // Extrair o ID do filme da URL

  const fetchMovieReviews = async (movieId) => {
    try {
      const response = await axios.post('http://localhost:8080/reviewsmoviesid', {
        movieId: movieId
      });
      const responseData = response.data;
      console.log("Resposta do backend:", responseData);
      setReviews(responseData);
    } catch (error) {
      console.error("Erro ao buscar avaliações do filme:", error);
    }
  };

  const fetchMovieDetails = async () => {
    try {
      const apiKey = "659b7a4b0ba0a85e50933e72a4644fa5";
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      );
      setMovieTitle(response.data.title);
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    }
  };

  useEffect(() => {
    fetchMovieReviews(movieId);
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="review-list">
      <div className="card-container">
        {reviews.map((review, index) => (
          <div className="card" key={index}>
            <Link to={`/review/${index}`}>
              <div className="card-content">
                <h3>{movieTitle}</h3>
                <p>{review.comentario}</p>
                <StarRating
                  reviewId={index}
                  initialRating={review.avaliacao}
                  onRatingChange={(reviewId, newRating) => {
                    console.log(
                      `Review ${reviewId} recebeu uma nova classificação: ${newRating}`
                    );
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
