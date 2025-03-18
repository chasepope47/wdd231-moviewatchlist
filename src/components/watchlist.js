document.addEventListener("DOMContentLoaded", function() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const watchlistContainer = document.getElementById("watchlist");

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
  } else {
    watchlist.forEach(movie => {
      fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=YOUR_API_KEY`)
        .then(response => response.json())
        .then(movieData => {
          const movieElement = createWatchlistItem(movieData);
          watchlistContainer.appendChild(movieElement);
        });
    });
  }
});

// Function to create watchlist item
function createWatchlistItem(movie) {
  const watchlistItem = document.createElement("li");
  watchlistItem.classList.add("watchlist-item");
  
  watchlistItem.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" style="width: 50px; height: 75px; margin-right: 10px;">
    <div>
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button onclick="removeFromWatchlist('${movie.imdbID}')">Remove</button>
    </div>
  `;
  
  return watchlistItem;
}

// Function to remove movie from watchlist
function removeFromWatchlist(imdbID) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist = watchlist.filter(movie => movie.imdbID !== imdbID);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  location.reload(); // Refresh the page to show updated watchlist
}