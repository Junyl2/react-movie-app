import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../contexts/MovieContext';
import { FiArrowDown, FiVideo } from 'react-icons/fi';

function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    hydrated,
  } = useMovieContext();

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    }

    async function fetchRecommendations() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
      );
      const data = await res.json();
      setRecommendations(data.results.slice(0, 3));
    }

    async function fetchCredits() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const data = await res.json();
      setCast(data.cast.slice(0, 3)); // top 3 cast
    }

    fetchMovie();
    fetchRecommendations();
    fetchCredits();
    window.scrollTo(0, 0);
  }, [id]);

  const handlePlayTrailer = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();
    const trailer = data.results.find(
      (v) =>
        v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
    );
    if (trailer) {
      setTrailerKey(trailer.key);
      setShowPlayer(true);
    } else {
      alert('No trailer available');
    }
  };

  const onFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite(movie?.id)) {
      removeFromFavorites(movie?.id);
    } else {
      addToFavorites(movie);
    }
  };

  const toggleReadMore = () => {
    setShowFullOverview(!showFullOverview);
  };

  if (!hydrated || !movie)
    return (
      <div className="flex items-center justify-center mt-50 ">
        Loading movies...
      </div>
    );

  return (
    <div className="movie-page text-white overflow-hidden">
      <div
        className="hero-bg relative flex items-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
        <div className="relative z-10 px-16 w-full h-full flex flex-col justify-between mobile-header">
          <div className="mt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold">
              {movie.title}
            </h1>

            <p className="mt-2 text-xl">{movie.release_date?.split('-')[0]}</p>

            <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-2 max-w-xl md:max-w-2xl leading-relaxed">
              {showFullOverview
                ? movie.overview
                : `${movie.overview?.slice(0, 200)}...`}
              {movie.overview?.length > 200 && (
                <button
                  onClick={toggleReadMore}
                  className="text-blue-400 ml-2 hover:underline text-sm"
                >
                  {showFullOverview ? 'Read Less' : 'Read More'}
                </button>
              )}
            </p>

            <p className="mt-4 text-yellow-400">
              ⭐ {movie.vote_average.toFixed(1)} | {movie.runtime} min
            </p>

            <p className="mt-2 text-gray-300 text-sm">
              <strong>Starring:</strong>{' '}
              {cast.map((actor, idx) => (
                <span key={actor.id}>
                  {actor.name}
                  {idx < cast.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>

            <p className="text-gray-300 text-sm mt-1">
              <strong>Genres:</strong>{' '}
              {movie.genres?.map((g, i) => (
                <span key={g.id}>
                  {g.name}
                  {i < movie.genres.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>

            <button
              onClick={handlePlayTrailer}
              className="mt-6 px-4 w-[100px] py-2 bg-gradient-to-r from-blue-800 to-blue-500 hover:to-blue-400 rounded flex items-center gap-2"
            >
              <FiVideo /> Trailer
            </button>
          </div>

          {/* You Might Also Like Section */}
          <div className="w-full recommendation">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">You Might Also Like</h2>
              <button
                onClick={() => navigate('/genre/all')}
                className="text-sm text-white pb-1 cursor-pointer flex items-center gap-1 border-b-1 hover:scale-105 transform"
              >
                View All
                <FiArrowDown size={17} />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6 place-items-center">
              {recommendations.map((rec) => (
                <Link
                  to={`/movie/${rec.id}`}
                  key={rec.id}
                  className="pb-6 rounded shadow flex items-center gap-3"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                    alt={rec.title}
                    className="w-[300px] h-30 object-cover object-top rounded mb-3 hover:scale-105 transition transform"
                  />
                  <div className="text-center mobile-detail">
                    <h3 className="text-2xl font-semibold">{rec.title}</h3>
                    <p className="text-sm text-gray-400">
                      {rec.release_date?.split('-')[0]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {showPlayer && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
            <div className="relative w-full max-w-4xl px-4">
              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={() => setShowPlayer(false)}
              >
                ✖
              </button>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title="Trailer"
                  className="w-full h-96 rounded shadow-xl"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviePage;
