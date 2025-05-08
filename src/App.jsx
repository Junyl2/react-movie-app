import './css/App.css';
import { Routes, Route } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';

import '@fontsource/poppins';
import '@fontsource/poppins/700.css';
import '@fontsource/bebas-neue';

import ScrollToTop from './contexts/ScrollToTop';

import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import GenrePage from './pages/GenrePage';
import TVShows from './pages/TVShows';
import TopRated from './pages/TopRated';
import SearchPage from './pages/SearchPage';
import Home from './pages/Home';
import Movies from './pages/Movies';

function App() {
  return (
    <MovieProvider>
      {/* Top Navigation Bar */}
      <NavBar />
      <ScrollToTop />

      {/* Page Content */}
      <main>
        {' '}
        {/* padding to account for sticky navs */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/genre/:genreName" element={<GenrePage />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
