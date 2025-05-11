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

  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const data = await res.json();
      setGenreList(data.genres);
    }

    fetchGenres();
  }, []);

  const closeMobileMenus = () => {
    setMobileMenuOpen(false);
    setGenresOpen(false);
    setShowModal(false);
  };

  const closeGenreOnSearch = () => {
    setShowModal(true);
    setGenresOpen(false);
    setMobileMenuOpen(false);
  };

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
          isScrolled || isMobileMenuOpen
            ? 'bg-gradient-to-br from-black to-gray-950'
            : 'bg-black/50'
        }`}
      >
        <div className="max-w-screen-xl px-15 mobile-logo flex items-center justify-between py-3 h-[60px]">
          <Link to="/" className="transition transform hover:scale-105 ">
            <img
              src={myLogo}
              alt="JFLIX"
              className="h-20 sm:h-20 md:h-20 lg:h-25 2xl:h-30 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center font-semibold space-x-6">
            <NavLink
              to="/home"
              onClick={closeMobileMenus}
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'hover:text-blue-400'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/tv"
              onClick={closeMobileMenus}
              className={({ isActive }) =>
                isActive ? 'text-blue-400' : 'hover:text-blue-500'
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
                <div className="absolute left-0 mt-4 text-white rounded shadow-lg z-50 bg-gradient-to-br from-black to-gray-950 w-100 md:w-100">
                  <ul className="py-2 grid grid-cols-3 gap-2 max-h-100 w-full overflow-y-auto px-2">
                    {genreList.map((g) => (
                      <li key={g.id} className="w-full">
                        <Link
                          to={`/genre/${g.name.toLowerCase()}`}
                          onClick={() => setGenresOpen(false)}
                          className="block px-4 py-2 hover:bg-blue-600 rounded"
                        >
                          {g.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <NavLink
              to="/top-rated"
              onClick={closeMobileMenus}
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Top Rated
            </NavLink>
            <NavLink
              to="/favorites"
              onClick={closeMobileMenus}
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Watchlist
            </NavLink>

            <button
              onClick={closeGenreOnSearch}
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
          <div className="lg:hidden px-4 pb-4 flex flex-col items-end justify-end w-full text-white font-semibold space-y-2 bg-gradient-to-tr from-black to-gray-900">
            <NavLink
              to="/home"
              onClick={closeMobileMenus}
              className={({ isActive }) =>
                isActive ? 'text-blue-500 pt-3' : 'hover:text-blue-500'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/tv"
              onClick={closeMobileMenus}
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
              <FiArrowDown />
              Movies
            </button>
            {isGenresOpen && (
              <div className="pl-4 space-y-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {genreList.map((g) => (
                  <Link
                    key={g.id}
                    to={`/genre/${g.name.toLowerCase()}`}
                    className="block hover:text-blue-500"
                    onClick={closeMobileMenus}
                  >
                    {g.name}
                  </Link>
                ))}
              </div>
            )}

            <NavLink
              to="/top-rated"
              onClick={closeMobileMenus}
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Top Rated
            </NavLink>
            <NavLink
              to="/favorites"
              onClick={closeMobileMenus}
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Watchlist
            </NavLink>

            <button
              onClick={closeGenreOnSearch}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              <FiSearch />
              Search
            </button>
            <NavLink
              to="/profile"
              onClick={closeMobileMenus}
              className={({ isActive }) =>
                isActive ? 'text-blue-500' : 'hover:text-blue-500'
              }
            >
              Profile
            </NavLink>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-blue-950/40 flex items-center justify-center z-[999] px-4 fade-bg">
            <div className="p-6 rounded-lg w-full bg-gradient-to-tr from-gray-950 to-gray-900 max-w-3xl shadow-xl relative showmodal">
              <button
                onClick={() => setShowModal(false)}
                className="fixed top-3 right-3 text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <FiX size={20} className="cursor-pointer" />
              </button>

              <h2 className="text-lg font-semibold mb-4 text-white">
                Search Movie
              </h2>
              <form onSubmit={handleSearchSubmit} className="flex rounded">
                <input
                  type="text"
                  placeholder="Enter movie title..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow px-4 py-2 border text-white border-t-0 border-l-0 border-white border-r-0 focus:outline-none focus:ring-2 focus:ring-transparent"
                />
                <button
                  type="submit"
                  className="text-gray-300 px-4 rounded-tr rounded-br cursor-pointer modal-search"
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

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 w-full bg-gray-900 border-gray-700 z-50">
        <div className="flex justify-around text-white text-sm py-2">
          <NavLink
            to="/home"
            onClick={closeMobileMenus}
            className={({ isActive }) =>
              isActive
                ? 'flex flex-col items-center text-blue-500'
                : 'flex flex-col items-center'
            }
          >
            <FiHome size={20} /> Home
          </NavLink>
          <button
            onClick={closeGenreOnSearch}
            className="flex flex-col items-center"
          >
            <FiSearch size={20} /> Search
          </button>
          <NavLink
            to="/favorites"
            onClick={closeMobileMenus}
            className={({ isActive }) =>
              isActive
                ? 'flex flex-col items-center text-blue-500'
                : 'flex flex-col items-center'
            }
          >
            <FiHeart size={20} /> Watchlist
          </NavLink>
          <NavLink
            to="/top-rated"
            onClick={closeMobileMenus}
            className={({ isActive }) =>
              isActive
                ? 'flex flex-col items-center text-blue-500'
                : 'flex flex-col items-center'
            }
          >
            <FiStar size={20} /> Trending
          </NavLink>
          <NavLink
            to="/profile"
            onClick={closeMobileMenus}
            className={({ isActive }) =>
              isActive
                ? 'flex flex-col items-center text-blue-500'
                : 'flex flex-col items-center'
            }
          >
            <FiUser size={20} /> Profile
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default NavBar;
