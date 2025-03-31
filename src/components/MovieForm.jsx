import React, { useState } from "react";
import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieForm = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null); // Track selected movie
  const [movieDetails, setMovieDetails] = useState({}); // Store movie details
  const [watchStatus, setWatchStatus] = useState("Want to Watch");
  const { addMovie } = useContext(WatchlistContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTitle}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        alert("No movies found!");
      }
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };

  const handleSelectMovie = async (movie) => {
    // Toggle selection (collapse if clicked again)
    if (selectedMovieId === movie.imdbID) {
      setSelectedMovieId(null);
      return;
    }

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
      const fullMovieData = await response.json();

      if (fullMovieData.Response === "True") {
        setMovieDetails((prevDetails) => ({
          ...prevDetails,
          [movie.imdbID]: fullMovieData, // Store details by movie ID
        }));
        setSelectedMovieId(movie.imdbID);
      } else {
        alert("Failed to fetch full movie details");
      }
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };

  const handleAddMovie = () => {
    if (selectedMovieId && movieDetails[selectedMovieId]) {
      addMovie(movieDetails[selectedMovieId], watchStatus);
      setSearchTitle("");
      setMovies([]);
      setSelectedMovieId(null);
      setWatchStatus("Want to Watch");
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
        <button type="submit">Search Movies</button>
      </form>

      {movies.length > 0 && (
        <div className="search-results">
          <h3>Select a movie from the search results:</h3>
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <button className="movie-button" onClick={() => handleSelectMovie(movie)}>
                  {movie.Title} ({movie.Year})
                </button>
                
                {/* Show details if the movie is selected */}
                {selectedMovieId === movie.imdbID && movieDetails[movie.imdbID] && (
                  <div className="selected-movie">
                    <h2>{movieDetails[movie.imdbID].Title} ({movieDetails[movie.imdbID].Year})</h2>
                    <img src={movieDetails[movie.imdbID].Poster} alt={`${movieDetails[movie.imdbID].Title} Poster`} />
                    <p><strong>Genre:</strong> {movieDetails[movie.imdbID].Genre}</p>
                    <p><strong>Plot:</strong> {movieDetails[movie.imdbID].Plot}</p>

                    <div>
                      <label htmlFor="status">Select Watch Status:</label>
                      <select
                        id="status"
                        value={watchStatus}
                        onChange={(e) => setWatchStatus(e.target.value)}
                      >
                        <option value="Want to Watch">Want to Watch</option>
                        <option value="Currently Watching">Currently Watching</option>
                        <option value="Watched">Watched</option>
                      </select>
                    </div>

                    <button className="add-button" onClick={handleAddMovie}>Add to Watchlist</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieForm;