import {
  Box,
  Flex,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import React from "react";

import { ReactComponent as PokeballSplash } from "../../assets/svg/splashPokemon.svg";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SplashScreen: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 3s linear`;

  return (
    <Flex
      align="center"
      background="linear-gradient(45deg, #3B4DCC, #000, #3B4DCC, #000);"
      justify="center"
      h="100vh"
      pos="relative"
      w="100%"
    >
      <Box animation={animation}>
        <PokeballSplash />
      </Box>
    </Flex>
  );
};

export default SplashScreen;
