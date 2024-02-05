import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import axios from 'axios';
import SearchBar from "../components/SearchBar";
import "../assets/styles/SerieHubNoId.css";

const SerieHubNoId = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const { data: reviews, isPending, error } = useFetch("http://localhost:8000/reviews");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

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

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query) {
      try {
        const apiKey = '659b7a4b0ba0a85e50933e72a4644fa5';
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
        const response = await axios.get(apiUrl);

        setSearchResults(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar resultados da pesquisa:", error);
      }
    } else {
      // Limpar os resultados se a consulta estiver vazia
      setSearchResults([]);
    }
  };

  return (
    <div className="tudoSerieSpot">
      {location.pathname === "/SerieHubNoId" && (
        <div className="search-bar-container">
          {/* Adicione a barra de pesquisa aqui */}
          <SearchBar onSearch={handleSearch} />
        </div>
      )}

      {/* Exiba os resultados da pesquisa */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Resultados da Pesquisa:</h2>
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                <Link to={`/SerieHub/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SerieHubNoId;
