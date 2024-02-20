import React, { useState, useEffect } from 'react';
import "../assets/styles/MySeries.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

const MySeries = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [toWatchMovies, setToWatchMovies] = useState([]);

  useEffect(() => {
    const fetchWatchedMovies = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/watcheduser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        });
        const movieIds = await response.json();

        const moviesWithDetails = await Promise.all(movieIds.map(async (movieId) => {
          const apiKey = '659b7a4b0ba0a85e50933e72a4644fa5';
          const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
          const movieData = await movieResponse.json();
          return movieData;
        }));

        setWatchedMovies(moviesWithDetails);
      } catch (error) {
        console.error('Error fetching watched movies:', error);
      }
    };

    const fetchLikedMovies = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/likeduser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        });
        const movieIds = await response.json();

        const moviesWithDetails = await Promise.all(movieIds.map(async (movieId) => {
          const apiKey = '659b7a4b0ba0a85e50933e72a4644fa5';
          const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
          const movieData = await movieResponse.json();
          return movieData;
        }));

        setLikedMovies(moviesWithDetails);
      } catch (error) {
        console.error('Error fetching liked movies:', error);
      }
    };

    const fetchToWatchMovies = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/towatchuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        });
        const movieIds = await response.json();

        const moviesWithDetails = await Promise.all(movieIds.map(async (movieId) => {
          const apiKey = '659b7a4b0ba0a85e50933e72a4644fa5';
          const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
          const movieData = await movieResponse.json();
          return movieData;
        }));

        setToWatchMovies(moviesWithDetails);
      } catch (error) {
        console.error('Error fetching to watch movies:', error);
      }
    };

    fetchToWatchMovies();
    fetchLikedMovies();
    fetchWatchedMovies();
  }, []);

  return (
    <div className="mySeriesContainer">
      <div className="categorySection">
        <h2 className="categoryTitle">Watched</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={1}
          slidesPerView={'auto'}
          navigation
          scrollbar={{ draggable: true }}
        >
          {watchedMovies.map(movie => (
            <SwiperSlide key={movie.id}>
              <div className="mySeriesMovie">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'URL_DA_IMAGEM_PADRAO'}
                  alt={`Movie ${movie.id}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="categorySection">
        <h2 className="categoryTitle">Liked</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={1}
          slidesPerView={'auto'}
          navigation
          scrollbar={{ draggable: true }}
        >
          {likedMovies.map(movie => (
            <SwiperSlide key={movie.id}>
              <div className="mySeriesMovie">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'URL_DA_IMAGEM_PADRAO'}
                  alt={`Movie ${movie.id}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      <div className="categorySection">
        <h2 className="categoryTitle">To Watch</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={1}
          slidesPerView={'auto'}
          navigation
          scrollbar={{ draggable: true }}
        >
          {toWatchMovies.map(movie => (
            <SwiperSlide key={movie.id}>
              <div className="mySeriesMovie">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'URL_DA_IMAGEM_PADRAO'}
                  alt={`Movie ${movie.id}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MySeries;
