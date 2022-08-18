import { Box } from "@chakra-ui/react";
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <Box maxW={["100%", "760px", "960px"]} mx="auto" p="1rem" w="100%">
      {children}
    </Box>
  );
};

export default Layout;
