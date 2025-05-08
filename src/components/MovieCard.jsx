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
      <div className="movie-info relative flex flex-col gap-2 items-center justify-center text-center h-[100px]">
        <h3 className="text-normal">{movie.title}</h3>
        <p className="text-gray-400">{movie.release_date?.split('-')[0]}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
