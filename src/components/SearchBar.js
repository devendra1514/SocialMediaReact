import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <i className="bi bi-search search-icon" onClick={handleSearchClick}></i>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Detect "Enter" key press
      />
      {searchValue && (
        <button className="clear-btn" onClick={clearSearch}>
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
