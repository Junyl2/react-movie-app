import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';

function GenrePage() {
  const { genreName } = useParams();
  const [genreList, setGenreList] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await res.json();
      setGenreList(data.genres);
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchAllGenresMovies() {
      setLoading(true);
      const newMoviesByGenre = {};

      for (const genre of genreList) {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`
        );
        const data = await res.json();
        newMoviesByGenre[genre.name] = data.results.slice(0, 6); // limit to 6 per genre
      }

      setMoviesByGenre(newMoviesByGenre);
      setLoading(false);
    }

    async function fetchSingleGenreMovies() {
      setLoading(true);
      const genreObj = genreList.find(
        (g) => g.name.toLowerCase() === genreName.toLowerCase()
      );

      if (!genreObj) {
        setMoviesByGenre({});
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreObj.id}`
      );
      const data = await res.json();
      setMoviesByGenre({ [genreObj.name]: data.results });
      setLoading(false);
    }

    if (genreList.length > 0) {
      if (genreName === 'all') {
        fetchAllGenresMovies();
      } else {
        fetchSingleGenreMovies();
      }
    }
  }, [genreName, genreList]);

  return (
    <div className="text-white">
      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <>
          {/* Hero */}
          <div
            className="flex h-[300px] flex-col items-center justify-center text-center relative"
            /* style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} */
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black to-gray-700 bg-opacity-60"></div>
            <h1 className="relative z-10 text-gray-100 text-5xl font-bold capitalize">
              {genreName === 'all'
                ? 'All Movies by Genre'
                : `${genreName.replace('-', ' ')} Movies`}
            </h1>
          </div>

          {/* Movie Sections */}
          {Object.keys(moviesByGenre).map((genre) => (
            <div key={genre} className="my-10 px-4">
              <h2 className="text-2xl font-bold mb-4">{genre}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
                {moviesByGenre[genre].map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          ))}

          {/* Genre Filter */}
          <div className="p-4 border-t border-gray-600 mt-10">
            <h2 className="text-xl font-semibold mb-4">Explore By Genre</h2>
            <div className="flex flex-wrap gap-2">
              {genreList.map((genre) => (
                <Link
                  to={`/genre/${genre.name.toLowerCase()}`}
                  key={genre.id}
                  className={`px-4 py-1 rounded ${
                    genre.name.toLowerCase() === genreName
                      ? 'bg-blue-950 text-white'
                      : ' bg-gradient-to-br text-sm from-black to-gray-950 hover:bg-none hover:bg-blue-950 flex items-center justify-center text-gray-200'
                  }`}
                >
                  {genre.name}
                </Link>
              ))}
              <Link
                to={`/genre/all`}
                className={`px-4 py-1 rounded ${
                  genreName === 'all'
                    ? 'bg-blue-950 text-white'
                    : 'bg-black hover:bg-blue-950'
                }`}
              >
                All
              </Link>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default GenrePage;
