import React, { useState } from 'react';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieDetails = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState('');

  const getMovieDetails = async (title) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovieData(data);
        setError('');
      } else {
        setMovieData(null);
        setError('Movie not found.');
      }
    } catch (error) {
      setError('Error fetching movie details.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTitle) getMovieDetails(searchTitle);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Fetch Movie Details</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {movieData && (
        <div>
          <h2>
            {movieData.Title} ({movieData.Year})
          </h2>
          <p><strong>Genre:</strong> {movieData.Genre}</p>
          <p><strong>Plot:</strong> {movieData.Plot}</p>
          <img src={movieData.Poster} alt={`${movieData.Title} Poster`} />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;