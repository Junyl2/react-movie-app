import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault(); // prevent link navigation on favorite click
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card bg-black relative group"
    >
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay absolute top-0 end-0 bottom-0 start-0 bg-black opacity-50 hidden group-hover:block">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info relative flex flex-col items-center justify-between text-center px-2 py-3 h-[100px] sm:h-[110px] md:h-[120px]">
        <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2">
          {movie.title || movie.name}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm">
          {(movie.release_date || movie.first_air_date)?.split('-')[0]}
        </p>
        {movie.vote_average !== undefined && (
          <p className="text-yellow-400 text-sm sm:text-base font-medium">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
        )}
      </div>
    </Link>
  );
}

export default MovieCard;
