import { Flex, Spinner as ChakraSpinner } from "@chakra-ui/react";

const Spinner = ({ height }: { height?: string | number }) => {
  // TODO: Add another vairant for small spinner
  return (
    <Flex
      h={height ? height : "100vh"}
      alignItems="center"
      justifyContent="center"
    >
      <ChakraSpinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};

export default Spinner;
