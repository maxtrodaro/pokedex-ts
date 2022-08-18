import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Text,
  keyframes,
  usePrefersReducedMotion,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Formik, Form, FormikState } from "formik";
import React from "react";
import * as Yup from "yup";

import FormInput from "../FormInput/FormInput";
import { usePaginationContext } from "../../contexts/pagination";

import { ReactComponent as PokeballSplashLoading } from "../../assets/svg/splashPokemonLoading.svg";

type FormValues = {
  searchInput: string;
};

type SearchProps = {
  isLoading: boolean;
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Search: React.FC<SearchProps> = ({ isLoading = false }) => {
  const initialValues: FormValues = {
    searchInput: "",
  };
  const prefersReducedMotion = usePrefersReducedMotion();
  const { pagination, handlePagination } = usePaginationContext();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 3s linear`;

  const onSubmit = async (values: FormValues) => {
    await handleSearch(values.searchInput);
  };

  const handleSearch = (valueSearch: string) =>
    handlePagination({
      limit: pagination?.limit + 12,
      name: valueSearch,
      offset: 0,
    });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        searchInput: Yup.string().required("Type any Pokémon"),
      })}
    >
      {({ errors, values }: FormikState<FormValues>) => (
        <Flex as={Form} direction="column" w="100%">
          <InputGroup onSubmit={() => onSubmit(values)}>
            <FormInput
              borderRadius="20px"
              border="2px solid"
              borderColor="lightGray"
              color="gray"
              dataCy="searchInput"
              maxLength={50}
              name="searchInput"
              placeholder="Search for a Pokemon"
              size="md"
              variant="outline"
            />
            <InputRightElement
              children={
                isLoading ? (
                  <Button
                    isLoading={isLoading}
                    spinner={
                      <Box animation={animation}>
                        <PokeballSplashLoading />
                      </Box>
                    }
                  >
                    Search
                  </Button>
                ) : (
                  <Search2Icon
                    data-cy="searchButton"
                    color="gray"
                    cursor="pointer"
                  />
                )
              }
              onClick={() => onSubmit(values)}
              right="5px"
            />
          </InputGroup>
          {errors.searchInput && (
            <Text color="red" fontWeight="700" mt="4">
              {errors.searchInput}
            </Text>
          )}
        </Flex>
      )}
    </Formik>
  );
};

export default Search;
