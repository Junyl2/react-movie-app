import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllMovieData } from '../services/api';
import Footer from '../components/Footer';
import { FiPlay, FiPlayCircle } from 'react-icons/fi';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

function Home() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [genres, setGenres] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const { popular, nowPlaying, upcoming, topRated, genres } =
          await fetchAllMovieData();

        const mainMovie = popular[0];

        const today = new Date();
        const past30Days = new Date();
        past30Days.setDate(today.getDate() - 30);

        // Filter movies released in the past 30 days
        const newReleasedMovies = nowPlaying.filter((movie) => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate >= past30Days && releaseDate <= today;
        });

        setNewMovies(newReleasedMovies);

        const movieDetailsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${mainMovie.id}?api_key=${TMDB_API_KEY}`
        );
        const movieCreditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${mainMovie.id}/credits?api_key=${TMDB_API_KEY}`
        );

        const movieDetails = await movieDetailsRes.json();
        const movieCredits = await movieCreditsRes.json();

        mainMovie.runtime = movieDetails.runtime;
        mainMovie.cast = movieCredits.cast
          ?.slice(0, 5)
          .map((actor) => actor.name);

        setPopular(popular);
        setHeroMovie(mainMovie);
        setNowPlaying(nowPlaying);
        setUpcoming(upcoming);
        setTopRated(topRated);
        setGenres(genres);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-white">Loading movies...</div>
    );

  return (
    <div className="text-white">
      {heroMovie && (
        <div
          className="relative h-[80vh] bg-cover bg-center flex items-center justify-start pl-10"
          style={{
            backgroundImage: `url(${IMAGE_BASE}${heroMovie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="z-10 max-w-3xl w-full px-4 flex flex-col gap-2 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold">
              {heroMovie.title}
            </h1>

            <p className="mt-2 text-xl">
              {heroMovie.release_date?.split('-')[0]}
            </p>

            <div className="flex gap-6 text-gray-300 text-sm mt-1">
              <span>⭐ {heroMovie.vote_average.toFixed(1)}</span>
              <span>
                {Math.floor(heroMovie.runtime / 60)}h {heroMovie.runtime % 60}
                min
              </span>
            </div>

            <HeroOverview overview={heroMovie.overview} />

            <div className="text-gray-400 text-sm mt-2">
              <p>
                <span className="text-white font-semibold">Starring:</span>{' '}
                {heroMovie.cast?.slice(0, 3).join(', ') || 'Loading...'}
              </p>
              <p>
                <span className="text-white font-semibold">Genre:</span>{' '}
                {heroMovie.genre_ids
                  .map((id) => genres.find((g) => g.id === id)?.name)
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <Link
                to={`/movie/${heroMovie.id}`}
                className="bg-gradient-to-r from-blue-800 to-blue-500 hover:to-blue-400 px-4 py-2 rounded-lg flex items-center justify-center h-[50px] w-[150px]"
              >
                <FiPlay size={23} className="mr-2" />
                Play Now
              </Link>
              <button className="trailer end-40  top-60   h-[50px] w-fit flex items-center justify-centertransition transform hover:scale-105  ">
                <FiPlayCircle
                  size={30}
                  className="rounded-full cursor-pointer"
                />
                Watch Trailer
              </button>{' '}
              *
            </div>
          </div>
        </div>
      )}
      <Section title="New Releases" movies={newMovies} showDate />
      <Section title="Popular Today" movies={popular} />
      <Section title="Now Playing in Theaters" movies={nowPlaying} />
      <Section title="Coming Soon" movies={upcoming} showDate />
      <Section title="Top Rated" movies={topRated} />

      <div className="p-6 border-t border-gray-600 mt-10">
        <h2 className="text-xl font-semibold mb-4">Explore By Genre</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {genres.map((genre) => (
            <Link
              to={`/genre/${genre.name.toLowerCase()}`}
              key={genre.id}
              className="px-4 py-1 rounded bg-gradient-to-br text-sm from-black to-gray-950 hover:bg-none hover:bg-blue-950 flex items-center justify-center text-gray-200"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-black p-6 text-gray-400 text-sm text-center">
        <div className="mb-2">© {new Date().getFullYear()} JFLIX </div>
        <div className="flex justify-center gap-4 mb-2">
          <a href="#">About</a> | <a href="#">Contact</a> |{' '}
          <a href="#">Terms</a> | <a href="#">🌐 EN</a>
        </div>
      </footer>
    </div>
  );
}

// ✅ Read More/Read Less Component
function HeroOverview({ overview }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded((prev) => !prev);

  if (!overview) return null;

  const isLong = overview.length > 200;
  const displayText =
    isExpanded || !isLong ? overview : `${overview.slice(0, 200)}...`;

  return (
    <div className="mt-2 max-w-xl md:max-w-2xl">
      <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
        {displayText}
      </p>
      {isLong && (
        <button
          onClick={toggle}
          className="mt-1 text-blue-400 hover:underline text-sm"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

function Section({ title, movies, showDate }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
        {movies.map((m) => (
          <Link
            to={`/movie/${m.id}`}
            key={m.id}
            className="min-w-[150px] hover:scale-105 transition"
          >
            <img
              src={`${POSTER_BASE}${m.poster_path}`}
              alt={m.title}
              className="rounded shadow"
            />
            <div className="mt-2 text-sm">
              <p className="font-medium">{m.title}</p>
              {showDate && <p className="text-gray-400">{m.release_date}</p>}
              <p className="mt-1 text-yellow-400">
                ⭐ {m.vote_average.toFixed(1)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
