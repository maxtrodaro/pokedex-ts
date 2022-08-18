import React, { createContext, useCallback, useState, useContext } from "react";

import { Pokemon } from "../services/pokemons/interfaces";

type Favorite = {
  handleFavorite(itemProp: Pokemon): void;
  favorites: Pokemon[];
};

const FavoriteContext = createContext<Favorite>({} as Favorite);

export const FavoriteProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  const handleFavorite = useCallback((itemProp: Pokemon) => {
    const favoritePokemons = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const filteredFavoritePokemons = favoritePokemons.filter(
      (favorite: Pokemon) => favorite.id !== itemProp.id
    );

    return filteredFavoritePokemons.length < favoritePokemons.length
      ? setFavorites(filteredFavoritePokemons)
      : setFavorites([...favoritePokemons, itemProp]);
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        handleFavorite,
        favorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => useContext(FavoriteContext);
