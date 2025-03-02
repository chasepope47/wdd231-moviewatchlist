import React, { useState } from "react";

const MovieForm = ({ addMovie }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // Controls form visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && genre && releaseYear) {
      setIsModalOpen(true);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div>
      {/* Button to Show/Hide Form */}
      {!isFormVisible && (
        <>
          <h2>Click the button below to add a new movie</h2>
          <button onClick={() => setIsFormVisible(true)}>Add a New Movie</button>
        </>
      )}

      {/* Form - Only visible when isFormVisible is true */}
      {isFormVisible && (
        <div class='overlay'>
          <form onSubmit={handleSubmit} className="form-container">
          <div class="menu-icon" onClick={() => setIsFormVisible(false)}>
            <div class="bar1"></div>
            <div class="bar3"></div>
          </div>
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
        </div>
      )}
    </div>
  );
};

export default MovieForm;