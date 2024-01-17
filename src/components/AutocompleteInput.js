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
    onTitleChange(selectedValue.title, selectedValue.author);
    setSuggestions([]);
  };

  useEffect(() => {
    if (isFocused) {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const uniqueTitles = new Set();
          const titlesWithAuthors = data.items
            ? data.items
                .map((item) => ({
                  title: item.volumeInfo.title,
                  author: item.volumeInfo.authors
                    ? item.volumeInfo.authors[0]
                    : "Unknown Author",
                }))
                .filter((book) => {
                  const lowerCaseTitle = book.title.toLowerCase();
                  if (!uniqueTitles.has(lowerCaseTitle)) {
                    uniqueTitles.add(lowerCaseTitle);
                    return lowerCaseTitle.includes(inputValue.toLowerCase());
                  }
                  return false;
                })
            : [];

          setSuggestions(titlesWithAuthors);
        })
        .catch((error) => {
          console.error("Erro ao buscar sugestões:", error);
        });
    }
  }, [inputValue, isFocused]);

  return (
    <div className="autocomplete-input-container">
      <label>Book Title</label>
      <input
        placeholder="Book Title"
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
