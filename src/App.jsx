import React from "react";
import { WatchlistProvider } from "./context/WatchlistContext";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import Header from "./components/Header";

const App = () => {
  return (
    <WatchlistProvider>
      <Header />
      <MovieForm />
      <MovieList />
    </WatchlistProvider>
  );
};

export default App;