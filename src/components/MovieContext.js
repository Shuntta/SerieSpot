
import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [toWatchMovies, setToWatchMovies] = useState([]);

  const addMovieToWatched = movie => setWatchedMovies(prev => [...prev, movie]);
  const addMovieToLiked = movie => setLikedMovies(prev => [...prev, movie]);
  const addMovieToToWatch = movie => setToWatchMovies(prev => [...prev, movie]);

  return (
    <MovieContext.Provider value={{ watchedMovies, likedMovies, toWatchMovies, addMovieToWatched, addMovieToLiked, addMovieToToWatch }}>
      {children}
    </MovieContext.Provider>
  );
};

