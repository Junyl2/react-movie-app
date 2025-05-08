import '../css/Favorites.css';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <>
        <div className="flex h-[400px] flex-col items-center justify-center text-center relative mt-15  ">
          <div className="absolute inset-0 bg-gradient-to-tr from-black to-gray-700 bg-opacity-60"></div>
          <h1 className="relative z-10 text-gray-100 text-5xl font-bold capitalize">
            Watch List
          </h1>
        </div>
        <div className="favorites px-4 mt-10">
          <h2 className="mb-4"> Your Favorites</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="favorites-empty flex items-center justify-center flex-col mt-50">
      <h2 className="text-red-500">No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
