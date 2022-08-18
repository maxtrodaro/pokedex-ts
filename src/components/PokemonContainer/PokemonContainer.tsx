import { Grid } from "@chakra-ui/react";
import React from "react";

const PokemonContainer: React.FC = ({ children }) => {
  return (
    <Grid
      as="main"
      gap={4}
      mt="10"
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
    >
      {children}
    </Grid>
  );
};

export default PokemonContainer;
