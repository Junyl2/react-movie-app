import React, { useEffect, useState } from 'react';

const TrailerModal = ({ movieId, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchTrailer() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const data = await response.json();
      const trailer = data.results.find((video) => video.type === 'Trailer');
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    }

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  if (!trailerKey) {
    return null; // No trailer available, or still loading
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-4 rounded-lg max-w-3xl w-full">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-white bg-black rounded-full"
          >
            ✖
          </button>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
