import React, { useState, useEffect } from "react";
import "./AutocompleteInput.css"; // Importe o arquivo de estilos

const AutocompleteInput = ({ onTitleChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 0);
  };

  const handleClickSuggestion = (selectedValue) => {
    setInputValue(selectedValue.title);
    onTitleChange(selectedValue.title, selectedValue.release_date);
    setSuggestions([]);
  };

  useEffect(() => {
    if (isFocused) {
      const apiKey = "659b7a4b0ba0a85e50933e72a4644fa5"; // Substitua com sua chave de API do TMDb
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`;
      
      if (inputValue.trim() !== "") { // Verifique se o campo de entrada não está vazio
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const titlesWithReleaseDates = data.results
              ? data.results.map((movie) => ({
                  title: movie.title,
                  release_date: movie.release_date,
                }))
              : [];
  
            setSuggestions(titlesWithReleaseDates);
          })
          .catch((error) => {
            console.error("Erro ao buscar sugestões:", error);
          });
      } else {
        setSuggestions([]); // Limpar as sugestões quando o campo está vazio
      }
    }
  }, [inputValue, isFocused]);
  

  return (
    <div className="autocomplete-input-container">
      <label>Movie Title</label>
      <input
        placeholder="Movie Title"
        className="autocomplete-input"
        type="text"
        id="input1"
        required
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {isFocused && (
        <ul className="list">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.title}
              className="list-items"
              onMouseDown={() => handleClickSuggestion(suggestion)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
