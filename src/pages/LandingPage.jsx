import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/api';
import heroBg from '../assets/creepybg.jpg';
import '../css/Home.css';
import {
  FiMenu,
  FiX,
  FiUser,
  FiSearch,
  FiHome,
  FiStar,
  FiHeart,
  FiPlay,
  FiArrowRight,
  FiArrowRightCircle,
} from 'react-icons/fi';
function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      // Redirect to the SearchPage with query param
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setError(null);
    } catch (err) {
      setError('Failed to search movies.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center text-white px-4"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-20 z-0" />
      <div className="relative z-10 text-center max-w-xl flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-snug">
          Step into stories that move you
          <br />
          <span className="bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
            no matter your mood
          </span>
        </h1>

        <form
          onSubmit={handleSearch}
          className="w-full flex group focus-within:ring-2 border-1 border-blue-500 focus-within:ring-blue-500 focus-within:shadow-lg rounded-full overflow-hidden mb-6 "
        >
          <input
            type="text"
            placeholder="Enter movie title..."
            className="w-full px-4 py-2 h-[40px] text-white bg-black/20 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-800 to-blue-500 hover:to-blue-400 px-4 text-white font-semibold flex items-center justify-center cursor-pointer"
          >
            <FiSearch />
          </button>
        </form>

        <Link
          to="/home"
          className="fullsite text-xl px-4 font-bold flex items-center gap-1  mt-2 justify-center w-fit  bg-gradient-to-r from-blue-800 to-blue-500  rounded-full h-[55px]"
        >
          View full site
          <FiArrowRightCircle className="rounded-full" />
        </Link>

        {error && <div className="text-red-400 mt-4">{error}</div>}
        {loading && <div className="text-white mt-4">Searching...</div>}
      </div>
    </div>
  );
}
export default LandingPage;
