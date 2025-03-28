import React, { createContext, useState, useEffect } from 'react';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  // Load movies from localStorage on mount
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    setMovies(storedMovies);
  }, []);

  // Add movie with status to the list
  const addMovie = (movie, status) => {
    // Combine movie data with status
    const movieWithStatus = { ...movie, status };

    // Update the movies list
    const updatedMovies = [...movies, movieWithStatus];

    // Log to check the movie object
    console.log('Added Movie:', movieWithStatus);

    // Update state and localStorage
    setMovies(updatedMovies);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
  };

  // Remove a movie from the list
  const removeMovie = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
  };

  return (
    <WatchlistContext.Provider value={{ movies, addMovie, removeMovie }}>
      {children}
    </WatchlistContext.Provider>
  );
};