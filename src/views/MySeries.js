  import "../assets/styles/MySeries.css";

  import React from 'react';
  import { useMovies } from '../components/MovieContext';
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
  import "swiper/swiper-bundle.css";
  
  const MySeries = () => {
    const { watchedMovies, likedMovies, toWatchMovies } = useMovies();
  
    const renderSwiperSlide = (movie) => {
      const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      return (
        <SwiperSlide key={movie.id}>
          <div className="mySeriesMovie">
            <img src={imageUrl} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
          </div>
        </SwiperSlide>
      );
    };
  
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
            {watchedMovies.map(renderSwiperSlide)}
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
            {likedMovies.map(renderSwiperSlide)}
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
            {toWatchMovies.map(renderSwiperSlide)}
          </Swiper>
        </div>
      </div>
    );
  };
  
  export default MySeries;