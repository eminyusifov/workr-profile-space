
import React, { createContext, useContext, useState } from 'react';

interface FavoritesContextType {
  favoritesCount: number;
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  favorites: number[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToFavorites = (id: number) => {
    setFavorites(prev => [...prev, id]);
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(prev => prev.filter(fav => fav !== id));
  };

  return (
    <FavoritesContext.Provider 
      value={{
        favoritesCount: favorites.length,
        addToFavorites,
        removeFromFavorites,
        favorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
