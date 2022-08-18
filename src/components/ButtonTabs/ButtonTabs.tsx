import { HStack, Button } from "@chakra-ui/react";
import React, { useCallback } from "react";

import { usePaginationContext } from "../../contexts/pagination";

type ButtonProps = {
  tabActive: string;
  setTabActive: (type: string) => void;
};

const ButtonTabs: React.FC<ButtonProps> = ({ setTabActive, tabActive }) => {
  const { handlePagination } = usePaginationContext();

  const toggleTabs = useCallback(
    (type: string, reinitialize?: boolean) => {
      setTabActive(type);

      reinitialize &&
        handlePagination({
          limit: 12,
          offset: 0,
        });
    },
    [handlePagination, setTabActive]
  );

  return (
    <HStack align="center" spacing="2">
      <Button
        background={tabActive === "all" ? "black" : "transparent"}
        borderRadius="20px"
        color={tabActive === "all" ? "white" : "black"}
        data-cy="allPokemons"
        onClick={() => toggleTabs("all", true)}
        outlineColor="transparent"
      >
        All pokémons
      </Button>
      <Button
        background={tabActive === "favorite" ? "black" : "transparent"}
        borderRadius="20px"
        color={tabActive === "favorite" ? "white" : "black"}
        data-cy="favoritePokemons"
        onClick={() => toggleTabs("favorite")}
        outlineColor="transparent"
      >
        Favorites
      </Button>
    </HStack>
  );
};

export default ButtonTabs;
