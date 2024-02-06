import React, { useState, useEffect } from "react";
import "./AutocompleteInput.css";

const AutocompleteInput = ({ onTitleChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timerId = isFocused && inputValue.trim() !== "" && setTimeout(() => {
      const apiKey = "659b7a4b0ba0a85e50933e72a4644fa5";
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(inputValue)}`;
      
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const titlesWithReleaseDates = data.results
            ? data.results.map(movie => ({
                title: movie.title,
                release_date: movie.release_date,
                id: movie.id, // Inclui o ID do filme
              }))
            : [];
          setSuggestions(titlesWithReleaseDates);
        })
        .catch(error => console.error("Erro ao buscar sugestões:", error));
    }, 500);

    return () => clearTimeout(timerId);
  }, [inputValue, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100);
  };

  const handleClickSuggestion = (selectedValue) => {
    setInputValue(selectedValue.title);
    onTitleChange(selectedValue.title, selectedValue.release_date, selectedValue.id); // Passa o ID do filme
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-input-container">
      <input
        placeholder="Search Movie Title"
        className="autocomplete-input"
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="list-item"
              onMouseDown={() => handleClickSuggestion(suggestion)}
            >
              {suggestion.title} ({suggestion.release_date.split("-")[0]})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
