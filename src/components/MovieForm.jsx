import React, { useState } from "react";
import { useContext } from 'react';
import { WatchlistContext } from '../context/WatchlistContext'; 

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieForm = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [movieData, setMovieData] = useState(null);
  const { addMovie } = useContext(WatchlistContext); // Access addMovie function

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${searchTitle}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovieData(data); // Set movie data to display in form
      } else {
        setMovieData(null); // No movie found
        alert("Movie not found!");
      }
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };

  const handleAddMovie = () => {
    if (movieData) {
      addMovie(movieData); // Add the movie to the watchlist
      setSearchTitle(''); // Clear search field
      setMovieData(null); // Reset movie data
    }
  };

  return (
    <div className="movie-form">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search Movie</button>
      </form>

      {movieData && (
        <div>
          <h2>{movieData.Title} ({movieData.Year})</h2>
          <img src={movieData.Poster} alt={`${movieData.Title} Poster`} />
          <p><strong>Genre:</strong> {movieData.Genre}</p>
          <p><strong>Plot:</strong> {movieData.Plot}</p>
          <button onClick={handleAddMovie}>Add to Watchlist</button>
        </div>
      )}
    </div>
  );
};

export default MovieForm;