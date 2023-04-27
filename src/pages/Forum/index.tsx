import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { CommentIcon } from "@sikaai/assets/svgs";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import { sikaai_colors } from "@sikaai/theme/color";
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = "/answer";
    navigate(path);
  };
  return (
    <>
      <BreadCrumb items={[]} title={"Forum"} />
      <Box width={"100%"} backgroundColor={sikaai_colors.white} p={6}>
        <Box
          backgroundColor={sikaai_colors.gray}
          p={4}
          borderRadius={16}
          onClick={routeChange}
          mb={4}
        >
          <Flex alignItems={"center"} gap={3}>
            <Image
              borderRadius="full"
              boxSize="36px"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HWZUxsf5n832kg8v768mpz3uIy2UDzIRTADmhqD6Xg&s"
              alt="Dan Abramov"
            />

            <Text>
              m rem aperiam, eaque ipsa quae ab illo inventore veritatis...m rem
              aperiam, eaque ipsa quae ab illo inventore veritatis...m rem
              aperiam, eaque ipsa quae ab illo inventore veritatis...m rem
              aperiam, eaque ipsa q?
            </Text>
          </Flex>
          <Grid templateColumns="36px repeat(2, max-content)" gap={3}>
            <GridItem></GridItem>
            <GridItem>
              <Text color={"blue"}>Christina Shrestha</Text>
            </GridItem>
            <GridItem>
              <Text color={sikaai_colors.gray_text}>10 minutes</Text>
            </GridItem>
            <GridItem></GridItem>
            <GridItem>
              <Flex alignItems={"center"} gap={3}>
                <CommentIcon />
                <Text>10 Comments</Text>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default Forum;
