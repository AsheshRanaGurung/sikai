import { Box, Button, Flex, Image, Select, Text } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { toastSuccess } from "@sikaai/service/service-toast";
import {
  useCreateComment,
  useGetComment,
  useGetForumById,
} from "@sikaai/service/sikaai-forum";
import { sikaai_colors } from "@sikaai/theme/color";
import httpStatus from "http-status";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit } = useForm();
  const { mutateAsync: createComment } = useCreateComment();
  const { id: forumId = "" } = useParams();
  const { data: dataForum } = useGetForumById({ id: forumId });
  const { data: dataComments } = useGetComment({ id: forumId });

  const onSubmitHandler = async (commentDetails: any) => {
    const response = await createComment({
      ...commentDetails,
      id: forumId,
    });
    if (response.status === httpStatus.CREATED) {
      toastSuccess("Comment created ");
    }
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
            // src={dataForum?.question_image}
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.2.2080231550.1678086178&semt=robertav1_2_sidr"
            alt="profile"
          />

          <Text>{dataForum?.question_text}</Text>
        </Flex>
        <Box marginLeft={45}>
          <Flex gap={3}>
            <Text color={"blue"}>{dataForum?.created_by}</Text>
            <Text color={sikaai_colors.gray_text}>
              {dataForum && timeAgo(dataForum?.created_at)}
            </Text>
          </Flex>
        </Box>
        <Flex mt={3} gap={3} direction={"column"}>
          <FormControl
            control="input"
            size="lg"
            register={register}
            name="text_content"
            placeholder="Write your answer"
            label={"Your answer"}
          />
          <FormControl
            control="file"
            size="lg"
            register={register}
            name="image"
          />
          <Button onClick={handleSubmit(onSubmitHandler)}>Post</Button>
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
          {dataComments?.map(dataComment => {
            return (
              <>
                <Flex gap={5} marginTop={8}>
                  <Image
                    borderRadius="full"
                    boxSize="36px"
                    // src={dataComment?.image_content}
                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.2.2080231550.1678086178&semt=robertav1_2_sidr"
                    alt="profile"
                  />
                  <Box>
                    <Text>{dataComment?.created_by}</Text>
                    <Text>{timeAgo(dataComment?.created_at)}</Text>
                  </Box>
                </Flex>
                <Box borderBottom={"1px solid gray"} ml={14}>
                  <Text mb={5}>{dataComment?.text_content}</Text>
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
