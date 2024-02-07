import React, { useState } from "react";
import * as AiIcons from 'react-icons/ai';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchText}
        onChange={handleChange}
      />
       <AiIcons.AiOutlineSearch className="search-icon" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
