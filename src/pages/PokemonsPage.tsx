import { Box, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import ButtonTabs from "../components/ButtonTabs/ButtonTabs";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import LoadMore from "../components/LoadMore/LoadMore";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import PokemonContainer from "../components/PokemonContainer/PokemonContainer";
import Search from "../components/Search/Search";
import SplashScreen from "../components/SplashScreen/SplashScreen";
import Title from "../components/Title/Title";

import { Pokemon } from "../services/pokemons/interfaces";
import pokeapi from "../services";
import { theme } from "../theme";
import { useFavoriteContext } from "../contexts/favorites";
import { usePaginationContext } from "../contexts/pagination";

const PokemonsPage: React.FC = () => {
  const { favorites } = useFavoriteContext();
  const { pagination } = usePaginationContext();
  const isFirstRun = useRef(true);
  const [isSplashLoading, setIsSplashLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabActive, setTabActive] = useState<string>("all");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    setIsLoading(true);
    pokeapi.pokemons.list(pagination).then((data) => {
      tabActive === "all" ? setPokemons(data) : setPokemons(favorites);
      setIsLoading(false);
    });
  }, [pagination, tabActive, favorites]);

  useEffect(() => {
    setIsSplashLoading(true);

    setTimeout(() => {
      setIsSplashLoading(false);
    }, 2000);
  }, [setIsSplashLoading]);

  useEffect(() => {
    if (!isFirstRun.current) {
      favorites && localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      isFirstRun.current = false;
    }
  }, [favorites]);

  return (
    <ChakraProvider theme={theme}>
      {isSplashLoading ? (
        <SplashScreen />
      ) : (
        <Box background="whiteBackground" pt="56px" minHeight="100vh">
          <Header />
          <Layout>
            <Title />
            <Flex
              align={["center", "center", "flex-start"]}
              as={Flex}
              direction={["column", "column", "row"]}
              gridGap={4}
              justify="space-between"
              mt="4"
              pos="relative"
            >
              <Search isLoading={isLoading} />
              <ButtonTabs setTabActive={setTabActive} tabActive={tabActive} />
            </Flex>
            {pokemons.length ? (
              <>
                <PokemonContainer>
                  {pokemons?.map((pokemon: Pokemon) => (
                    <PokemonCard key={pokemon.id} {...pokemon} />
                  ))}
                </PokemonContainer>
                {tabActive === "all" && <LoadMore isLoading={isLoading} />}
              </>
            ) : (
              <Heading color="black" mt="10" textAlign="center">
                Não foi encontrado nenhum Pokémon
              </Heading>
            )}
          </Layout>
        </Box>
      )}
    </ChakraProvider>
  );
};

export default PokemonsPage;
