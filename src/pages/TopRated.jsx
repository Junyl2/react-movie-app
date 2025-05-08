import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';

function TopRated() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchTopRated() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const data = await res.json();
      setMovies(data.results);
    }

    fetchTopRated();
  }, []);

  return (
    <div className="text-white">
      <div className="flex h-[400px] flex-col items-center justify-center text-center relative mt-15">
        <div className="absolute inset-0 bg-gradient-to-tr from-black to-gray-700 bg-opacity-60"></div>
        <h1 className="relative z-10 text-gray-100 text-5xl font-bold capitalize">
          Top Rated Movies
        </h1>
      </div>
      <h2 className="text-2xl font-bold mt-10 mb-4 px-4 ">Top Rated</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20 px-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default TopRated;
