import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../assets/styles/Home.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaPlus, FaEye } from "react-icons/fa"; // Importa os ícones
import { useMovies } from '../components/MovieContext';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { 
    addMovieToWatched, 
    addMovieToLiked, 
    addMovieToToWatch,
    likedMovies, 
    toWatchMovies, 
    watchedMovies 
  } = useMovies();


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '659b7a4b0ba0a85e50933e72a4644fa5';
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        setMovies(response.data.results.slice(0, 6));
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleFavoriteClick = async (movieId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Usuário não autenticado');
      return;
    }

    try {
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
      alert('Erro ao marcar o filme como assistido. Por favor, tente novamente mais tarde.');
    }
  };

  const handleToWatchClick = async (movieId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Usuário não autenticado');
      return;
    }

    try {
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
      alert('Erro ao marcar o filme como assistido. Por favor, tente novamente mais tarde.');
    }
  };

  const handleWatchedClick = async (movieId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Usuário não autenticado');
      return;
    }

    try {
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
      alert('Erro ao marcar o filme como assistido. Por favor, tente novamente mais tarde.');
    }
  };



  return (
    <div className="home">
      <div className="container">
        <Link to="/CreateReview/:movieId" className="New-review">New Review +</Link>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
        >
         {movies.map((movie) => (
  <SwiperSlide key={movie.id}>
    <div className="tudo">
      <div className="movie" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }}>
        <button className="favorite-button" onClick={() => handleFavoriteClick(movie.id)}>
          <FaHeart />
        </button>
      </div>
      <div className="actions-container">
        <Link to={`/SerieHub/${movie.id}`} className="Review">Review</Link>
        <button className="action-button" onClick={() => handleToWatchClick(movie.id)}>
          <FaPlus />
        </button>
        <button className="action-button" onClick={() => handleWatchedClick(movie.id)}>
          <FaEye />
        </button>
      </div>
    </div>
  </SwiperSlide>
))} 
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
