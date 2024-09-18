const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.VUE_APP_TMDB_API_KEY;

export const fetchTrendingMovies = async (timeWindow) => {
  const url = `${API_BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `fetchTrendingMovies Response status: ${response.status}`
      );
    }

    const trendingMoviesData = await response.json();
    return trendingMoviesData;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const constructImageUrl = (size, file_path) => {
  const baseUrl = 'http://image.tmdb.org/t/p/';
  return `${baseUrl}${size}/${file_path}`;
};
