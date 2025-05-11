import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import GenreFilter from '../components/GenreFilter'; // import the shared component

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch top-rated movies
  useEffect(() => {
    async function fetchTopRated() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results);
    }

    fetchTopRated();
  }, []);

  // Fetch movie genres
  useEffect(() => {
    async function fetchMovieGenres() {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await res.json();
      setGenreList(data.genres);
    }

    fetchMovieGenres();
  }, []);

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="flex h-[250px] flex-col items-center justify-center text-center relative mt-15">
        <div className="absolute inset-0 bg-gradient-to-tr from-black to-gray-700 bg-opacity-60"></div>
        <h1 className="relative z-10 text-gray-100 text-5xl font-bold capitalize">
          Top Rated Movies
        </h1>
      </div>
      {/* Genre Filter */}
      {genreList.length > 0 && (
        <GenreFilter genreList={genreList} type="movie" />
      )}
      {/* Movie Grid */}
      {/*   <h2 className="text-2xl font-bold mt-10 mb-4 px-4">Top Rated</h2> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4  px-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <GenreFilter genreList={genreList} type="movie" />

      <Footer />
    </div>
  );
}

export default TopRated;
