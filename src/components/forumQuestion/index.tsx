import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { CommentIcon } from "@sikaai/assets/svgs";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { sikaai_colors } from "@sikaai/theme/color";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForumQuestion = ({ item }: any) => {
  const [forumId, setForumId] = useState("");
  const navigate = useNavigate();
  const routeChange = () => {
    navigate(`${NAVIGATION_ROUTES.FORUM_ANSWER}/${forumId}`);
  };

  useEffect(() => {
    setForumId(item?.id);
  }, [item]);

  return (
    <Box
      backgroundColor={sikaai_colors.gray}
      key={item.id}
      p={4}
      borderRadius={16}
      onClick={() => {
        routeChange();
      }}
      mb={4}
    >
      <Flex alignItems={"center"} gap={3}>
        <Image
          borderRadius="full"
          boxSize="36px"
          src={item.question_image}
          alt="profile_img"
        />

        <Text>{item.question_text}</Text>
      </Flex>
      <Grid templateColumns="36px repeat(2, max-content)" gap={3}>
        <GridItem></GridItem>
        <GridItem>
          <Text color={"blue"}>{item.created_by}</Text>
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
  );
};
