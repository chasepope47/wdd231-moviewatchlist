import React, { useState } from 'react';

const SearchBar = ({ setSearchTerm }) => {
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search for a movie..."
      />
    </div>
  );
};

export default SearchBar;