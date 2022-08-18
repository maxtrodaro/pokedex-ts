import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as PokeballTitle } from "../../assets/svg/pokeballTitle.svg";

const Title: React.FC = () => (
  <Flex align="center" justify={["center", "flex-start"]}>
    <PokeballTitle />
    <Heading color="black" fontSize="36px" lineHeight="54px" ml="2">
      Pokédex
    </Heading>
  </Flex>
);

export default Title;
