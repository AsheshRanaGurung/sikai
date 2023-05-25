import { Box, Flex, Grid, Spacer, Text } from "@chakra-ui/react";
import {
  BlueTickIcon,
  DotIcon,
  DoubleCommentIcon,
  RightArrowIcon,
} from "@sikaai/assets/svgs";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useGetForum } from "@sikaai/service/sikaai-forum";
import { sikaai_colors } from "@sikaai/theme/color";
import { timeAgo } from "@sikaai/utils/timeAgo";
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const navigate = useNavigate();

  // react queries
  const { data: forum } = useGetForum();
  // react queries end

  return (
    <>
      <BreadCrumb
        title={{
          name: "Forum",
          route: `${NAVIGATION_ROUTES.FORUM}`,
        }}
        items={[]}
      />

      {/* TODO: make component */}
      <Box bgColor={sikaai_colors.white} p={4} borderRadius={"8px"}>
        {forum?.map(forumItem => {
          return (
            <Grid
              key={forumItem.id}
              gap={4}
              p={4}
              alignItems={"center"}
              bgColor={sikaai_colors.light_gray_box}
              borderRadius={"8px"}
              border={`1px solid ${sikaai_colors.light_gray_border}`}
              onClick={() =>
                navigate(`${NAVIGATION_ROUTES.FORUM_ANSWER}/${forumItem.id}`)
              }
              my={3}
              cursor={"pointer"}
              templateColumns="max-content 1fr max-content max-content max-content"
            >
              <DoubleCommentIcon />
              <Box>
                <Text fontWeight={600} color={sikaai_colors.light_gray_text}>
                  {forumItem.question_text}
                </Text>
                <Flex
                  gap={3}
                  fontSize={"13px"}
                  fontWeight={450}
                  alignItems={"center"}
                  mt={3}
                >
                  <Text>Started by </Text>
                  <Text color={sikaai_colors.primary}>
                    {forumItem.full_name}
                  </Text>
                  <DotIcon />
                  <Text>{forumItem.total_comments} comments</Text>
                  <DotIcon />
                  <Text color={sikaai_colors.light_gray}>
                    <>{timeAgo(forumItem.created_at)}</>
                  </Text>
                </Flex>
              </Box>
              <Spacer />
              {/* TODO: when role === admin replied to comment blue tick */}
              {/* backend api waiting */}
              {forumItem.is_admin_comment && <BlueTickIcon />}
              <RightArrowIcon />
            </Grid>
          );
        })}
      </Box>
    </>
  );
};

export default Forum;
