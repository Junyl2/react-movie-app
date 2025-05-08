/* const API_KEY = 'df1f3317e6930031a8d3355810c11659'; */
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

export async function fetchAllMovieData() {
  try {
    const [popularRes, nowPlayingRes, upcomingRes, topRatedRes, genresRes] =
      await Promise.all([
        fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
        fetch(`${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`),
        fetch(`${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`),
        fetch(`${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`),
        fetch(`${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`),
      ]);

    const [popularData, nowData, upcomingData, topRatedData, genresData] =
      await Promise.all([
        popularRes.json(),
        nowPlayingRes.json(),
        upcomingRes.json(),
        topRatedRes.json(),
        genresRes.json(),
      ]);

    return {
      popular: popularData.results,
      nowPlaying: nowData.results,
      upcoming: upcomingData.results,
      topRated: topRatedData.results,
      genres: genresData.genres,
    };
  } catch (error) {
    console.error('Error in fetchAllMovieData:', error);
    throw error;
  }
}

/* export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}$query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
 */
/* export async function topRated(){
 try {
  const [topRated]
 }
} */
export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await res.json();
  return data.results;
};
