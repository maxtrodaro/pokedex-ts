import { Box, Flex, Text, Image, Heading, HStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { ReactComponent as EmptyFavorite } from "../../assets/svg/emptyFavorite.svg";
import { ReactComponent as FullFavorite } from "../../assets/svg/fullFavorite.svg";

import { useFavoriteContext } from "../../contexts/favorites";
import { Pokemon } from "../../services/pokemons/interfaces";
import { PokemonTypeColors } from "../../theme";

const PokemonCard: React.FC<Pokemon> = ({ id, name, sprite, types }) => {
  const [favoriteSelected, setFavoriteSelected] = useState<string | null>("");
  const { favorites, handleFavorite } = useFavoriteContext();
  
  const formatFavorite = favoriteSelected?.length
    ? JSON.parse(favoriteSelected)
    : "[]";

  const backgroundColors = types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  });

  useEffect(() => {
    Promise.resolve().then(function () {
      return setFavoriteSelected(localStorage.getItem("favorites"));
    });
  }, [favorites]);

  return (
    <Box
      _hover={{ transform: "scale(1.05)" }}
      as="section"
      background="white"
      borderRadius="10px"
      boxShadow="xl"
      transition="0.3s ease-in-out"
      w="100%"
    >
      <Flex
        align="center"
        borderRadius="10px 10px 0 0"
        style={{
          backgroundColor: backgroundColors[0].medium,
        }}
        justify="center"
        mx="auto"
        py="20"
        w="100%"
        pos="relative"
      >
        <Box
          onClick={() => handleFavorite({ id, name, sprite, types })}
          cursor="pointer"
          pos="absolute"
          right="10px"
          top="10px"
        >
          {favoriteSelected?.length &&
          formatFavorite?.find((favorite: Pokemon) => favorite.id === id) ? (
            <FullFavorite data-cy="fullFavorite" />
          ) : (
            <EmptyFavorite data-cy="emptyFavorite" />
          )}
        </Box>
        <Box bottom="0" pos="absolute" zIndex="20">
          <Box
            bottom="8px"
            borderRadius="50%"
            height="90px"
            pos="absolute"
            style={{
              backgroundColor: backgroundColors[0].light,
            }}
            w="90px"
            zIndex="-10"
          ></Box>
          <Image src={sprite} alt="Pokémon Raro" />
        </Box>
      </Flex>
      <Box py="4" textAlign="center">
        <Heading
          as="h1"
          color="black"
          data-cy="cardName"
          fontSize="24px"
          fontWeight="600"
          textTransform="capitalize"
        >
          {name}
        </Heading>
        <HStack align="center" justify="center" mt="2" spacing="4">
          {types.map(({ type }, index) => (
            <Text
              fontSize="14px"
              fontWeight="700"
              key={`${id}-${type.name}`}
              style={{ color: backgroundColors[index].medium }}
              textTransform="uppercase"
            >
              {type.name}
            </Text>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default PokemonCard;
