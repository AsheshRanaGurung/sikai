import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { PageNotFoundIcon } from "@sikaai/assets/svgs";
import { sikaai_colors } from "@sikaai/theme/color";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Flex alignItems={"center"} direction={"column"} justifyContent={"center"}>
      <PageNotFoundIcon />
      <Text fontSize="2xl" color={sikaai_colors.primary} fontWeight="600">
        404: Nothing Found.
      </Text>
      <Text fontSize="xl" color={sikaai_colors.gray}>
        We can’t seem to find the page you’re looking for.
      </Text>
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme={sikaai_colors.primary}
        variant="primary"
        width="auto"
        onClick={() => navigate("/", { replace: false })}
      >
        Go Back to Dashboard
      </Button>
    </Flex>
  );
};

export default PageNotFound;
