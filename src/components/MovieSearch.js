export const searchMovies = async (query) => {
  const API_KEY = "YOUR_API_KEY"; // Replace with your OMDB API key
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    
    if (data.Response === "True") {
      return data.Search; // Return the list of search results
    } else {
      throw new Error(`No results found for "${query}"`);
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data.");
  }
};