  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import axios from "axios";
  import ReviewList from "../components/ReviewList";
  import "../assets/styles/SerieHub.css"; // Certifique-se de que o caminho esteja correto
  import { FaHeart, FaPlus, FaEye } from "react-icons/fa"; // Importa os ícones
  import { useMovies } from "../components/MovieContext"; // Importa o contexto

  const SerieHub = () => {
    const { movieId } = useParams();
    console.log(movieId);
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

    const handleFavoriteClick = async () => {
      // Obtenha o userId do localStorage
      const userId = localStorage.getItem('userId');
    
      // Verifique se o userId está disponível no localStorage
      if (!userId) {
        console.error('Usuário não autenticado');
        return;
      }
    
      try {
        // Faça uma solicitação POST para o backend para adicionar o filme assistido
        const response = await fetch('http://localhost:8080/liked', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            movieId: parseInt(movieId),
          }),
        });
    
        if (!response.ok) {
          throw new Error('Falha ao marcar o filme como liked.');
        }
    
        console.log('Filme marcado como liked com sucesso.');
      } catch (error) {
        console.error('Erro ao enviar solicitação para adicionar filme à lista de assistidos:', error);
        // Exibir uma mensagem de erro ao usuário
        alert('Erro ao marcar o filme como assistido. Por favor, tente novamente mais tarde.');
      }
    };
    
    
    const handleToWatchClick = async () => {
      // Obtenha o userId do localStorage
      const userId = localStorage.getItem('userId');
    
      // Verifique se o userId está disponível no localStorage
      if (!userId) {
        console.error('Usuário não autenticado');
        return;
      }
    
      try {
        // Faça uma solicitação POST para o backend para adicionar o filme assistido
        const response = await fetch('http://localhost:8080/watch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            movieId: parseInt(movieId),
          }),
        });
    
        if (!response.ok) {
          throw new Error('Falha ao marcar o filme como assistido.');
        }
    
        console.log('Filme marcado como assistido com sucesso.');
      } catch (error) {
        console.error('Erro ao enviar solicitação para adicionar filme à lista de assistidos:', error);
        // Exibir uma mensagem de erro ao usuário
        alert('Erro ao marcar o filme como assistido. Por favor, tente novamente mais tarde.');
      }
    };
    
    const handleWatchedClick = async () => {
      // Obtenha o userId do localStorage
      const userId = localStorage.getItem('userId');
    
      // Verifique se o userId está disponível no localStorage
      if (!userId) {
        console.error('Usuário não autenticado');
        return;
      }
    
      try {
        // Faça uma solicitação POST para o backend para adicionar o filme assistido
        const response = await fetch('http://localhost:8080/watched', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            movieId: parseInt(movieId),
          }),
        });
    
        if (!response.ok) {
          throw new Error('Falha ao marcar o filme como assistido.');
        }
    
        console.log('Filme marcado como assistido com sucesso.');
      } catch (error) {
        console.error('Erro ao enviar solicitação para adicionar filme à lista de assistidos:', error);
        // Exibir uma mensagem de erro ao usuário
        alert('Erro ao marcar o filme como assistido. Por favor, tente novamente mais tarde.');
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
