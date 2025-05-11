import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import GenreFilter from '../components/GenreFilter'; // make sure path is correct

function TVShows() {
  const [tvShows, setTVShows] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const { genreName } = useParams(); // Optional: for future genre filtering

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch popular TV shows
  useEffect(() => {
    async function fetchTVShows() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
      );
      const data = await res.json();
      setTVShows(data.results);
    }

    fetchTVShows();
  }, []);

  // Fetch TV genres
  useEffect(() => {
    async function fetchTVGenres() {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`
      );
      const data = await res.json();
      setGenreList(data.genres);
    }

    fetchTVGenres();
  }, []);

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="flex h-[250px] flex-col items-center justify-center text-center relative mt-15 ">
        <div className="absolute inset-0 bg-gradient-to-tr from-black to-gray-700 bg-opacity-60"></div>
        <h1 className="relative z-10 text-gray-100 text-5xl font-bold capitalize">
          Popular TV Shows
        </h1>
      </div>

      {/* Title */}
      {/*  <h2 className="text-2xl font-bold mt-10 mb-4 px-4">TV Shows</h2> */}
      {/* Genre Filter */}
      {genreList.length > 0 && (
        <GenreFilter genreList={genreList} type="movie" />
      )}
      {/* TV Show Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4  px-4">
        {tvShows.map((tv) => (
          <MovieCard
            key={tv.id}
            movie={{
              ...tv,
              title: tv.name,
              release_date: tv.first_air_date,
            }}
          />
        ))}
      </div>

      {/* Genre Filter */}
      {genreList.length > 0 && <GenreFilter genreList={genreList} type="tv" />}

      <Footer />
    </div>
  );
}

export default TVShows;
