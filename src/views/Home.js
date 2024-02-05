// Home.js
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../assets/styles/Home.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Substitua pela sua chave de API diretamente
        const apiKey = '659b7a4b0ba0a85e50933e72a4644fa5';
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        setMovies(response.data.results.slice(0, 6)); // Limita a resposta aos primeiros 5 filmes
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

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
                  {/* Aqui você pode adicionar mais informações do filme se desejar */}
                </div>
                <Link to={`/SerieHub/${movie.id}`} className="Review">Review</Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;