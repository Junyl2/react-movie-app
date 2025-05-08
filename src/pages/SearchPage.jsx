import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    if (!query) return;

    async function fetchSearch() {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
      );
      const data = await res.json();
      setResults(data.results);
    }

    fetchSearch();
  }, [query]);

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`
      );
      const data = await res.json();
      setGenreList(data.genres);
    }

    fetchGenres();
  }, []);

  if (!query) {
    return (
      <div className="text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Please enter a search term</h2>
      </div>
    );
  }

  return (
    <div className="text-white p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}

      {/* Genre Filter Section */}
      <div className="p-4 mt-10 border-t border-gray-600">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Explore by Genre
        </h2>
        <div className="flex flex-wrap gap-2">
          {genreList.map((genre) => (
            <Link
              to={`/genre/${genre.name.toLowerCase()}`}
              key={genre.id}
              className="px-4 text-sm py-1 rounded bg-gradient-to-br from-black to-gray-950 text-gray-200 hover:bg-none hover:bg-blue-950 hover:text-white"
            >
              {genre.name}
            </Link>
          ))}
          <Link
            to="/genre/all"
            className="px-4 py-1 rounded bg-black text-white hover:bg-blue-950"
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
