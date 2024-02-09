  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import axios from "axios";
  import ReviewList from "../components/ReviewList";
  import "../assets/styles/SerieHub.css"; // Certifique-se de que o caminho esteja correto
  import { FaHeart, FaPlus, FaEye } from "react-icons/fa"; // Importa os ícones
  import { useMovies } from "../components/MovieContext"; // Importa o contexto

  const SerieHub = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const {
      addMovieToWatched,
      addMovieToLiked,
      addMovieToToWatch,
      likedMovies, // Adicionado
      toWatchMovies, // Adicionado
      watchedMovies, // Adicionado
    } = useMovies();

    useEffect(() => {
      const fetchMovieDetails = async () => {
        setIsPending(true);
        try {
          const apiKey = "659b7a4b0ba0a85e50933e72a4644fa5";
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
          );
          setMovieDetails(response.data);

          const reviewsResponse = await axios.get(
            `http://localhost:8000/reviews?movieId=${movieId}`
          );
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

  const handleFavoriteClick = () => {
    console.log("Favorito clicado", movieDetails);
    if (movieDetails && !likedMovies.some((m) => m.id === movieDetails.id)) {
      addMovieToLiked(movieDetails);
    }
  };


    const handleToWatchClick = () => {
      if (movieDetails && !toWatchMovies.some((m) => m.id === movieDetails.id)) {
        addMovieToToWatch(movieDetails);
      }
    };

    const handleWatchedClick = () => {
      if (movieDetails && !watchedMovies.some((m) => m.id === movieDetails.id)) {
        addMovieToWatched(movieDetails);
      }
    };

    return (
      <div className="tudoSerieSpot">
        <div className="left-SerieHub">
          <div className="left-container">
            {movieDetails && (
              <>
                <div
                  className="movieTest"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.poster_path})`,
                  }}
                ></div>
                <div className="movie-actions-container">
                  <button className="botao-acao" onClick={handleFavoriteClick}>
                    <FaHeart />
                  </button>
                  <button className="botao-acao" onClick={handleToWatchClick}>
                    <FaPlus />
                  </button>
                  <button className="botao-acao" onClick={handleWatchedClick}>
                    <FaEye />
                  </button>
                </div>
              </>
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
