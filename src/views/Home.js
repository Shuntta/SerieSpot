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
  const { addMovieToWatched, addMovieToLiked, addMovieToToWatch } = useMovies();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Substitua pela sua chave de API diretamente
        const apiKey = '659b7a4b0ba0a85e50933e72a4644fa5';
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        setMovies(response.data.results.slice(0, 6)); // Limita a resposta aos primeiros 6 filmes
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleFavoriteClick = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      addMovieToLiked(movie);
    }
  };
  
  const handleToWatchClick = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      addMovieToToWatch(movie);
    }
  };
  
  const handleWatchedClick = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      addMovieToWatched(movie);
    }
  };

  return (
    <div className="home">
      <div className="container">
        <Link to="/CreateReview" className="New-review">New Review +</Link>

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
      {/* Contêiner para ações, com o botão Review primeiro */}
      <div className="actions-container">
        {/* Botão "Review" */}
        <Link to={`/SerieHub/${movie.id}`} className="Review">Review</Link>
        {/* Botão "Para Assistir" */}
        <button className="action-button" onClick={() => handleToWatchClick(movie.id)}>
          <FaPlus />
        </button>
        {/* Botão "Já Visto" */}
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
