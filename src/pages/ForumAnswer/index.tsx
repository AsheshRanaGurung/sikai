import { Box, Button, Flex, Grid, Image, Select, Text } from "@chakra-ui/react";
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
import { timeAgo } from "@sikaai/utils/timeAgo";
import httpStatus from "http-status";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ForumAnswer2 = () => {
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
            route: ``,
          },
        ]}
      />

      <Box backgroundColor={sikaai_colors.white} p={4} borderRadius={10}>
        <Box backgroundColor={sikaai_colors.gray} p={4} borderRadius={10}>
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
              <Text color={"blue"}>{dataForum?.full_name}</Text>
              <Text color={sikaai_colors.gray_text}>
                {dataForum && timeAgo(dataForum?.created_at)}
              </Text>
            </Flex>
          </Box>
        </Box>
        <Flex mt={5} gap={3} direction={"column"}>
          <FormControl
            control="input"
            size="lg"
            register={register}
            name="text_content"
            placeholder="Write your answer"
            label={"Write your answer..."}
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
                <Grid
                  templateColumns="max-content 1fr"
                  gap={5}
                  // bgColor={sikaai_colors.gray}
                  m={4}
                >
                  {/* TODO: image little distored */}
                  <Image
                    borderRadius="full"
                    boxSize="36px"
                    // src={dataComment?.image_content}
                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.2.2080231550.1678086178&semt=robertav1_2_sidr"
                    alt="profile"
                  />
                  <Box bgColor={sikaai_colors.gray} borderRadius={"8px"} p={2}>
                    <Flex gap={3}>
                      <Text fontSize={"16px"} fontWeight={500}>
                        {/* TODO: if not admin then dynamic data handle */}
                        {(dataComment?.is_admin && "Admin") ||
                          dataComment?.is_admin}
                      </Text>
                    </Flex>
                    {/* TODO: color #737373 */}
                    <Text fontSize={"12px"} fontWeight={400}>
                      {timeAgo(dataComment?.created_at)}
                    </Text>
                    <Text mb={5}>{dataComment?.text_content}</Text>
                  </Box>
                </Grid>
              </>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default ForumAnswer2;
