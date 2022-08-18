import {
  Box,
  Flex,
  Button,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import React from "react";

import { usePaginationContext } from "../../contexts/pagination";

import { ReactComponent as PokeballSplashLoading } from "../../assets/svg/splashPokemonLoading.svg";

type LoadMoreProps = {
  isLoading: boolean;
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadMore: React.FC<LoadMoreProps> = ({ isLoading = false }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { pagination, handlePagination } = usePaginationContext();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 3s linear`;

  const handleLoadMore = () =>
    handlePagination({
      ...pagination,
      limit: pagination?.limit + 12,
    });

  return (
    <Flex justify="center" mx="auto" my="10" w="100%">
      <Button
        background="blue"
        color="white"
        isLoading={isLoading}
        onClick={() => handleLoadMore()}
        spinner={
          <Box animation={animation}>
            <PokeballSplashLoading />
          </Box>
        }
      >
        Carregar mais
      </Button>
    </Flex>
  );
};

export default LoadMore;
