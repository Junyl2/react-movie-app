/* import { createContext, useState, useContext, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites');

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
 */
/* import { createContext, useState, useContxt, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = (MovieContext) => useContext();
export const [favorites, setFavorites] = useState([]);

useEffect(() => {
  const storedFavs = localStorage.getItem('favorites');

  if (storedFavs) setFavorites(JSON.parse(storedFavs));
});

useEffect(
  () => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },
  { favorites }
);

const addToFavorites = (movie) => setFavorites((prev) => [...prev, movie]);

const removeFromFavorites = (movieId) => {
  setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
};
const isFavorite = (movieId) => {
  return favorites.some((movie) => movie.id === movieId);
};
const value = {
  favorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
};
export const MovieProvider = ({ children }) => {
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
 */

/* import { createContext, useState, useContext, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites');
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
 */

import { createContext, useState, useContext, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites');
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
    setHydrated(true); // Mark as hydrated after localStorage is read
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, hydrated]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) =>
    favorites.some((movie) => movie.id === movieId);

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    hydrated,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
