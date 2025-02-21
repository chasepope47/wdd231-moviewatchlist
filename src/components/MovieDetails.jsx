import React, { useState } from 'react';

const API_KEY = 'your_api_key'; // Replace with your OMDB API key

const MovieDetails = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [movieData, setMovieData] = useState(null);

  const getMovieDetails = async (title) => {
    const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
    const data = await response.json();
    setMovieData(data.Response === 'True' ? data : null);
  };

  const handleSearch = () => {
    if (searchTitle) getMovieDetails(searchTitle);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        placeholder="Enter movie title"
      />
      <button onClick={handleSearch}>Fetch Movie Details</button>

      {movieData && (
        <div>
          <h2>
            {movieData.Title} ({movieData.Year})
          </h2>
          <p>
            <strong>Genre:</strong> {movieData.Genre}
          </p>
          <p>
            <strong>Plot:</strong> {movieData.Plot}
          </p>
          <img src={movieData.Poster} alt="Movie Poster" />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
