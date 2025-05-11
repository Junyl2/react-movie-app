import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import GenreFilter from '../components/GenreFilter';
import Footer from '../components/Footer';

function GenrePage() {
  const { genreName } = useParams();
  const [genreList, setGenreList] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch genre list once
  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        const data = await res.json();
        setGenreList(data.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    }

    fetchGenres();
  }, []);

  // Delay spinner if loading exceeds 500ms
  useEffect(() => {
    let spinnerTimeout;
    if (loading) {
      spinnerTimeout = setTimeout(() => {
        setShowSpinner(true);
      }, 500);
    } else {
      setShowSpinner(false);
    }

    return () => clearTimeout(spinnerTimeout);
  }, [loading]);

  // Fetch movies by genre
  useEffect(() => {
    async function fetchAllGenresMovies() {
      const newMoviesByGenre = {};

      for (const genre of genreList) {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`
        );
        const data = await res.json();
        newMoviesByGenre[genre.name] = data.results.slice(0, 6);
      }

      setMoviesByGenre(newMoviesByGenre);
      setLoading(false);
    }

    async function fetchSingleGenreMovies() {
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
      setLoading(true);
      if (genreName === 'all') {
        fetchAllGenresMovies();
      } else {
        fetchSingleGenreMovies();
      }
    }
  }, [genreName, genreList]);

  return (
    <div className="text-white">
      {showSpinner && loading && (
        <div className="fixed inset-0 bg-blue-950/40 flex items-center justify-center z-[999] px-4 fade-bg">
          <div className="text-center flex flex-col items-center justify-center text-white relative">
            <div className="animate-spin mb-4 rounded-full border-2 border-l-white border-r-white border-b-white border-t-transparent h-[40px] w-[40px]"></div>
            Loading {genreName}...
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* Hero */}
          <div className="flex h-[250px] flex-col items-center justify-center text-center relative mt-15">
            <div className="absolute inset-0 bg-gradient-to-tr from-black to-gray-700 bg-opacity-60"></div>
            <h1 className="relative z-10 text-gray-100 text-5xl font-bold capitalize">
              {genreName === 'all'
                ? 'All Movies'
                : `${genreName.replace('-', ' ')} Movies`}
            </h1>
          </div>

          {/* Genre Filter */}
          <GenreFilter genreList={genreList} />

          {/* Movie Sections */}
          {Object.keys(moviesByGenre).map((genre) => (
            <div key={genre} className="px-4 mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {moviesByGenre[genre].map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          ))}

          {/* Filter again if needed */}
          <GenreFilter genreList={genreList} type="movie" />
          <Footer />
        </>
      )}
    </div>
  );
}

export default GenrePage;
