import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ReviewList from "../components/ReviewList";
import "../assets/styles/SerieHub.css";

const SerieHub = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsPending(true);
      try {
        const apiKey = '659b7a4b0ba0a85e50933e72a4644fa5';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        setMovieDetails(response.data);

        // Supondo que seu backend suporte filtragem por movieId via query params
        const reviewsResponse = await axios.get(`http://localhost:8000/reviews?movieId=${movieId}`);
        setReviews(reviewsResponse.data);
        setIsPending(false);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme ou reviews:", error);
        setError("Não foi possível buscar os detalhes do filme ou reviews.");
        setIsPending(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="tudoSerieSpot">
      <div className="left-SerieHub">
        <div className="left-container">
          {movieDetails && (
            <div className="movieTest" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.poster_path})` }}></div>
          )}
        </div>
      </div>
      <div className="vertical-line-SerieHub"></div>
      <div className="right-SerieHub">
        <div className="reviews">
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {!isPending && <ReviewList reviews={reviews} />}
        </div>
      </div>
    </div>
  );
};

export default SerieHub;