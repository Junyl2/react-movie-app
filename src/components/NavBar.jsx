import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import myLogo from '../assets/JFLIXlogo.png';
import {
  FiMenu,
  FiX,
  FiUser,
  FiSearch,
  FiHome,
  FiStar,
  FiHeart,
  FiArrowDown,
  FiVideo,
} from 'react-icons/fi';

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery('');
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGenresOpen, setGenresOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleGenres = () => setGenresOpen(!isGenresOpen);

  const genreList = ['All', 'Action', 'Romance', 'Comedy', 'Horror', 'Sci-Fi'];

  // 🌟 Scroll Detection
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`fixed top-0 start-0 end-0 z-50 shadow-md text-white transition-colors duration-300 ${
          isScrolled ? 'bg-black' : 'bg-black/50'
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 h-[60px]">
          <Link to="/" className="transition transform hover:scale-105 ">
            <img src={myLogo} className="jflix" alt="JFLIX" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center font-semibold space-x-6">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'hover:text-blue-400'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/tv"
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'hover:text-blue-400'
              }
            >
              TV Shows
            </NavLink>

            {/* Genres Dropdown */}
            <div className="relative">
              <button
                onClick={toggleGenres}
                className="hover:text-blue-500 flex items-center gap-1 "
              >
                Movies <FiArrowDown />
              </button>
              {isGenresOpen && (
                <div className="absolute left-0 mt-2 bg-gradient-to-tr from-black to-gray-900 text-white rounded shadow-lg z-50">
                  <ul className="py-2 w-40">
                    {genreList.map((g) => (
                      <li key={g}>
                        <Link
                          to={`/genre/${g.toLowerCase()}`}
                          onClick={() => setGenresOpen(false)}
                          className="block px-4 py-2 hover:bg-blue-600"
                        >
                          {g}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <NavLink
              to="/top-rated"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Top Rated
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Watchlist
            </NavLink>

            <button
              onClick={() => setShowModal(true)}
              className="hover:text-blue-500 cursor-pointer"
            >
              <FiSearch />
            </button>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              <FiUser />
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={toggleMobileMenu} className="lg:hidden text-white">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 pb-4 flex flex-col bg-gradient-to-tr from-black to-gray-900 text-white font-semibold space-y-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/tv"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              TV Shows
            </NavLink>

            <button
              onClick={toggleGenres}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              Movies <FiArrowDown />
            </button>
            {isGenresOpen && (
              <div className="pl-4 space-y-1">
                {genreList.map((g) => (
                  <Link
                    key={g}
                    to={`/genre/${g.toLowerCase()}`}
                    className="block hover:text-blue-500"
                    onClick={() => setGenresOpen(false)}
                  >
                    {g}
                  </Link>
                ))}
              </div>
            )}

            <NavLink
              to="/top-rated"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Top Rated
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Watchlist
            </NavLink>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              <FiSearch /> Search
            </button>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Profile
            </NavLink>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[999] px-4  fade-bg">
            <div className="p-6 rounded-lg w-full  max-w-3xl shadow-xl relative showmodal">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <FiX size={20} className="cursor-pointer" />
              </button>

              <h2 className="text-lg font-semibold mb-4 text-white">
                Search Movie
              </h2>
              <form onSubmit={handleSearchSubmit} className="flex  rounded">
                <input
                  type="text"
                  placeholder="Enter movie title..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow px-4 py-2 border text-white border-t-0 border-l-0  border-white border-r-0  focus:outline-none focus:ring-2 focus:ring-transparent"
                />
                <button
                  type="submit"
                  className=" text-gray-300 px-4 rounded-tr rounded-br cursor-pointer modal-search"
                >
                  <FiSearch />
                </button>
              </form>
              <button
                onClick={() => setShowModal(false)}
                className="mt-3 text-sm text-white hover:underline cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
