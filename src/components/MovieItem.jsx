import React, { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";

const MovieItem = ({ index, movie }) => {
  const { removeMovie } = useContext(WatchlistContext);

  return (
    <div>
      <h3>{movie.Title} ({movie.Year})</h3>
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Watch Status:</strong> {movie.status}</p>
      <button onClick={() => removeMovie(index)}>Remove</button>
    </div>
  );
};

export default MovieItem;