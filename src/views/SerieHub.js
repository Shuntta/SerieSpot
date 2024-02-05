  import "../assets/styles/SerieHub.css";
  import React, { useEffect, useState } from 'react';
  import {Link} from "react-router-dom";
  import ReviewList from "../components/ReviewList";
  import useFetch from "../hooks/useFetch";
  import { useParams } from "react-router-dom";
  import axios from 'axios';


  const SerieHub = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    // Suponha que useFetch já esteja buscando as reviews corretamente
    const { data: reviews, isPending, error } = useFetch("http://localhost:8000/reviews");
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          const apiKey = '659b7a4b0ba0a85e50933e72a4644fa5';
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
          setMovieDetails(response.data);
        } catch (error) {
          console.error("Erro ao buscar detalhes do filme:", error);
        }
      };
  
      fetchMovieDetails();
    }, [movieId]);
  
    return (
      <div className="tudoSerieSpot">
        <div className="left-SerieHub">
          <div className="left-container">
            {movieDetails && (
              <div className="movieTest" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.poster_path})` }}>
                {/* Aqui você pode adicionar mais informações sobre o filme, como título, sinopse, etc. */}
              </div>
            )}
          </div>
        </div>
        <div className="vertical-line-SerieHub"></div>
        <div className="right-SerieHub">
          <div className="reviews">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {reviews && <ReviewList reviews={reviews} />}
          </div>
        </div>
      </div>
    );
  };
  
  export default SerieHub;