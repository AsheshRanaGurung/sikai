import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import Switch from "@sikaai/components/switch";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useGetComment, useGetForumById } from "@sikaai/service/sikaai-forum";
import { sikaai_colors } from "@sikaai/theme/color";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ForumAnswer = () => {
  //for date change
  function timeAgo(dateString: Date) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((Number(now) - Number(date)) / 1000);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  }
  //end of date function
  const { id: forumId = "" } = useParams();
  const { data = [] } = useGetForumById({ id: forumId });
  const { data: dataComments = [] } = useGetComment({ id: forumId });
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <BreadCrumb
        title={{ name: "Forum", route: `${NAVIGATION_ROUTES.FORUM}` }}
        items={[
          {
            name: `Answer`,
            route: NAVIGATION_ROUTES.FORUM_ANSWER,
          },
        ]}
      />

      <Box backgroundColor={sikaai_colors.white} p={4} borderRadius={10}>
        <Flex alignItems={"center"} gap={3}>
          <Image
            borderRadius="full"
            boxSize="36px"
            src={data[0]?.question_image}
            alt="profile"
          />

          <Text>{data[0]?.question_text}</Text>
        </Flex>
        <Box marginLeft={45}>
          <Flex gap={3}>
            <Text color={"blue"}>{data[0]?.created_by}</Text>
            <Text color={sikaai_colors.gray_text}>
              {timeAgo(data[0]?.created_at)}
            </Text>
          </Flex>
        </Box>
        <Flex mt={3} gap={3} direction={"column"}>
          <Text color={sikaai_colors.primary_dark}>Your Answer</Text>
          <Input placeholder="write your answer" />
          <Switch value={toggle} label={"Pin"} toggleSwitch={handleToggle} />
          <Input type={"file"} />
          <Button>Post</Button>
        </Flex>
      </Box>

      <Box
        backgroundColor={sikaai_colors.white}
        p={4}
        borderRadius={10}
        mt={10}
      >
        <Flex justifyContent={"space-between"}>
          <Text fontWeight={"bold"} color={sikaai_colors.primary}>
            Comments
          </Text>
          <Select width={"140px"} size={"xs"} color={sikaai_colors.primary}>
            <option>Most Recent</option>
            <option>All Comment</option>
          </Select>
        </Flex>
        <Box>
          {dataComments?.map(({ dataComment }: any) => {
            return (
              <>
                <Flex gap={5} marginTop={8}>
                  <Image
                    borderRadius="full"
                    boxSize="36px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HWZUxsf5n832kg8v768mpz3uIy2UDzIRTADmhqD6Xg&s"
                    alt="Dan Abramov"
                  />
                  <Box>
                    <Text>{dataComment[0]?.created_by}</Text>
                    <Text>{timeAgo(dataComment[0]?.created_at)}</Text>
                  </Box>
                </Flex>
                <Box borderBottom={"1px solid gray"} ml={14}>
                  <Text mb={5}>{dataComment[0]?.text_content}</Text>
                </Box>
              </>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default ForumAnswer;
