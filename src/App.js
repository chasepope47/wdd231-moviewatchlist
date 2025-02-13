import React, { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    setMovies(storedMovies);
  }, []);

  const addMovie = (movie) => {
    const updatedMovies = [...movies, movie];
    setMovies(updatedMovies);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
  };

  const deleteMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
  };

  return (
    <div>
      <h1>Movie Watchlist</h1>
      <MovieForm addMovie={addMovie} />
      <div id="movieList">
        {movies.map((movie, index) => (
          <div key={index}>
            <strong>{movie.title}</strong> ({movie.genre}, {movie.releaseYear})
            <button onClick={() => deleteMovie(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
