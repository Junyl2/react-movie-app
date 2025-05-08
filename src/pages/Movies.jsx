import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

function Movies() {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`
        );
        const data = await res.json();
        setAllMovies(data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {allMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
