import {
  Box,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
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
      {/* TODO: change colorscheme to primary */}
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          {/* TODO: discussion with design */}
          <Tab>Recent</Tab>
          {/* <Tab>Popular</Tab>
          <Tab>Pending Reply</Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* TODO: make component */}
            <Box bgColor={sikaai_colors.white} p={4} borderRadius={"8px"}>
              {forum?.map(forumItem => {
                return (
                  <Flex
                    key={forumItem.id}
                    gap={4}
                    p={4}
                    alignItems={"center"}
                    bgColor={sikaai_colors.light_gray_box}
                    borderRadius={"8px"}
                    border={`1px solid ${sikaai_colors.light_gray_border}`}
                    onClick={() =>
                      navigate(
                        `${NAVIGATION_ROUTES.FORUM_ANSWER}/${forumItem.id}`
                      )
                    }
                    my={3}
                  >
                    <DoubleCommentIcon />
                    <Box>
                      <Text
                        fontWeight={600}
                        color={sikaai_colors.light_gray_text}
                      >
                        {forumItem.question_text}
                      </Text>
                      <Flex
                        gap={3}
                        fontSize={"13px"}
                        fontWeight={450}
                        alignItems={"center"}
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
                    {/* <BlueTickIcon /> */}
                    <RightArrowIcon />
                  </Flex>
                );
              })}
            </Box>
          </TabPanel>
          {/* <TabPanel>
            <p>two!</p>
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Forum;
