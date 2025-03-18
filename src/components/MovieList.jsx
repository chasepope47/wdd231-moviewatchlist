import React, { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import MovieItem from "./MovieItem";

const MovieList = () => {
  const { movies } = useContext(WatchlistContext);

  return (
    <div className="watchlist">
      <h2>Your Movie Watchlist</h2>
      <div className="movie-list-container">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieItem className="watchlist-item" key={index} index={index} movie={movie} />
          ))
        ) : (
          <p>No movies added yet.</p>
        )}
      </div>
      
    </div>
  );
};

export default MovieList;