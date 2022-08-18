import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import { usePaginationContext } from "../../contexts/pagination";

import { ReactComponent as PokeballIcon } from "../../assets/svg/logoPokemon.svg";

const Header: React.FC = () => {
  const { handlePagination } = usePaginationContext();

  const handleReinitialize = () =>
    handlePagination({
      limit: 12,
      offset: 0,
    });

  return (
    <Box as="header">
      <Flex
        align="center"
        background="blue"
        justify="center"
        pos="fixed"
        py=".5rem"
        top="0"
        w="100%"
        zIndex="999"
      >
        <PokeballIcon cursor="pointer" onClick={() => handleReinitialize()} />
      </Flex>
    </Box>
  );
};

export default Header;
