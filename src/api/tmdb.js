const API_KEY = process.env.VUE_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGES_URL = 'http://image.tmdb.org/t/p/';

/**
 * Fetches trending data from The Movie Database (TMDb) API.
 * @param {string} type - The type of trending items to fetch. Valid values are 'all', 'movie', 'person', or 'tv'.
 * @param {string} timeWindow - The time window for the trending data. Valid values are 'day' or 'week'.
 * @param {number} [page=1] - The page number of results to retrieve. Defaults to 1 if not specified.
 *
 * @returns {Promise<Object|null>} A promise that resolves to the trending data object or `null` if an error occurs.
 *
 * @throws {Error} Throws an error if the response status is not OK.
 **/
export const fetchTrending = async (type, timeWindow, page = 1) => {
  const url = `${BASE_URL}/trending/${type}/${timeWindow}?api_key=${API_KEY}&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const trendingMoviesData = await response.json();
    return trendingMoviesData;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const fetchDetails = async (id, type) => {
  const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const fetchRecommended = async (id, type, page = 1) => {
  const url = `${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

/**
 * Constructs an image url from TMDb
 * @param {string} size  - backdrop_sizes: "w300", "w780", "w1280", "original". poster_sizes: "w92", "w154", "w185", "w342", "w500", "w780", "original". profile_sizes: "w45", "w185", "h632", "original"
 * @param {string} file_path - file path e.g. /1tfCj5h0FEQ5xg8hzVjQgcuGlgN.jpg
 * @returns
 */
export const constructImageUrl = (size, file_path) => {
  return IMAGES_URL + size + '/' + file_path;
};
