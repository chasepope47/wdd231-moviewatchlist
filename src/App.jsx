import React, { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null); // Store the movie to delete

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    setMovies(storedMovies);
  }, []);

  const addMovie = (movie) => {
    const updatedMovies = [...movies, movie];
    setMovies(updatedMovies);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
  };

  const deleteMovie = () => {
    if (movieToDelete !== null) {
      const updatedMovies = movies.filter((_, i) => i !== movieToDelete);
      setMovies(updatedMovies);
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      setIsModalOpen(false);
      setMovieToDelete(null);
    }
  };

  const handleDeleteClick = (index) => {
    setMovieToDelete(index); // Set the movie to be deleted
    setIsModalOpen(true); // Open the modal for confirmation
  };

  return (
    <div>
      <h1>Movie Watchlist</h1>
      <MovieForm addMovie={addMovie} />

      <div id="movieList">
        {movies.map((movie, index) => (
          <div key={index}>
            <strong>{movie.title}</strong> ({movie.genre}, {movie.releaseYear})
            <button onClick={() => handleDeleteClick(index)}>Remove</button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this movie?</p>
            <button onClick={deleteMovie}>Yes, Delete</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
