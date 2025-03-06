'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TypeFavoritesContext } from '@/types';
import { API_URLS } from '@/config/urls';

const FavoritesContext = createContext<TypeFavoritesContext | undefined>(
  undefined
);

export function UseFavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Intentar obtener de localStorage primero
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    // Intentar obtener de cookies
    const getFavoritesFromCookies = async () => {
      try {
        const response = await fetch(API_URLS.favorites, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching favorites');
        }

        const data = await response.json();
        if (data.favorites) {
          setFavorites(data.favorites);
          localStorage.setItem('favorites', JSON.stringify(data.favorites));
        }
      } catch (error) {
        console.error('Error fetching favorites from cookies:', error);
      }
    };

    getFavoritesFromCookies();
  }, []);

  const addFavorite = async (id: string) => {
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);

    // Actualizar localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    // Actualizar cookies
    try {
      const response = await fetch(API_URLS.favorites, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorites: newFavorites }),
      });

      if (!response.ok) {
        throw new Error('Error updating favorites');
      }
    } catch (error) {
      console.error('Error updating favorites in cookies:', error);
    }
  };

  const removeFavorite = async (id: string) => {
    const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
    setFavorites(newFavorites);

    // Actualizar localStorage
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    // Actualizar cookies
    try {
      const response = await fetch(API_URLS.favorites, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorites: newFavorites }),
      });

      if (!response.ok) {
        throw new Error('Error updating favorites');
      }
    } catch (error) {
      console.error('Error updating favorites in cookies:', error);
    }
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function UseFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw Error(
      'UseFavoritesContext must be used within a UseFavoritesProvider'
    );
  }
  return context;
}
