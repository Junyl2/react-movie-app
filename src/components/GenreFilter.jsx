import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';

function GenreFilter({ genreList }) {
  const { genreName } = useParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="p-4 ">
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-start ">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded shadow hover:bg-blue-800 transition"
        >
          <FiFilter /> Filter
        </button>
      </div>

      {/* Genre List - Responsive */}
      <div
        className={`${
          isMobileOpen ? 'grid' : 'hidden'
        } grid-cols-2 mt-2 gap-2 md:flex md:flex-wrap items-center justify-center`}
      >
        {genreList.map((genre) => (
          <Link
            to={`/genre/${genre.name.toLowerCase()}`}
            key={genre.id}
            onClick={() => setIsMobileOpen(false)}
            className={`px-4 py-1 rounded text-sm ${
              genre.name.toLowerCase() === genreName
                ? 'bg-blue-950 text-white'
                : 'bg-gradient-to-br from-black to-gray-950 hover:bg-blue-950 text-gray-200'
            }`}
          >
            {genre.name}
          </Link>
        ))}

        {/* All Genres Button */}
        <Link
          to={`/genre/all`}
          onClick={() => setIsMobileOpen(false)}
          className={`px-4 py-1 rounded text-sm ${
            genreName === 'all'
              ? 'bg-blue-950 text-white'
              : 'bg-black hover:bg-blue-950 text-gray-200'
          }`}
        >
          All
        </Link>
      </div>
    </div>
  );
}

export default GenreFilter;
