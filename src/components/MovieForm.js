import React, { useState } from 'react';

const MovieForm = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && genre && releaseYear) {
      addMovie({ title, genre, releaseYear });
      setTitle('');
      setGenre('');
      setReleaseYear('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="movieTitle">Movie Title:</label>
      <input
        type="text"
        id="movieTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="genre">Genre:</label>
      <select
        id="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      >
        <option value="">Select a Genre</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        {/* Add more genres as needed */}
      </select>

      <label htmlFor="releaseYear">Release Year:</label>
      <input
        type="number"
        id="releaseYear"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        min="1900"
        max="2025"
        required
      />

      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
