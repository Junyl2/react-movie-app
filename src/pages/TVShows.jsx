import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';

function TVShows() {
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    async function fetchTVShows() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const data = await res.json();
      setTVShows(data.results);
    }

    fetchTVShows();
  }, []);

  return (
    <div className="text-white">
      <div
        className="flex h-[400px] flex-col items-center justify-center text-center relative mt-15 "
        /* style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} */
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black to-gray-700 bg-opacity-60"></div>
        <h1 className="relative z-10 text-gray-100 text-5xl font-bold capitalize">
          Popular Tv Shows
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-20 mb-20 px-4">
        {tvShows.map((tv) => (
          <MovieCard key={tv.id} movie={tv} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default TVShows;
