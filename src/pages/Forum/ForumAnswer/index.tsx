import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PinIcon, ThreeDotsIcon } from "@sikaai/assets/svgs";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { toastSuccess } from "@sikaai/service/service-toast";
import {
  useCreateComment,
  useDeleteComment,
  useGetComment,
  useGetCommentById,
  useGetForumById,
  useUpdateComment,
} from "@sikaai/service/sikaai-forum";
import { sikaai_colors } from "@sikaai/theme/color";
import { timeAgo } from "@sikaai/utils/timeAgo";
import httpStatus from "http-status";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

// TODO: use defaultValues
const defaultValues = {
  text_content: "",
};

const ForumAnswer2 = () => {
  const [commentId, setCommentId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
  });
  const { id: forumId = "" } = useParams();

  // react queries
  const { mutateAsync: createComment } = useCreateComment();
  const { data: dataForum } = useGetForumById({ id: forumId });
  const { data: dataComments } = useGetComment({ id: forumId });
  const { data: dataComment } = useGetCommentById({
    forum_id: forumId,
    id: commentId,
  });
  const { mutateAsync: updateComment } = useUpdateComment();
  const { mutateAsync: deleteComment } = useDeleteComment();
  // react queries end

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isUnpinModalOpen,
    onOpen: onUnpinModalOpen,
    onClose: onUnpinModalClose,
  } = useDisclosure();

  // TODO: remove this any
  const onSubmitHandler = async (commentDetails: any) => {
    if (isEdit) {
      const response = await updateComment({
        ...commentDetails,
        forum_id: forumId,
        id: commentId,
      });
      if (response.status === httpStatus.OK) {
        // TODO: remove toast from here to service
        setIsEdit(false);
        setCommentId("");
        onEditModalClose();
        reset(defaultValues);
        toastSuccess("Comment updated ");
      }
    } else {
      const response = await createComment({
        ...commentDetails,
        id: forumId,
      });
      if (response.status === httpStatus.CREATED) {
        // TODO: remove toast from here to service
        reset(defaultValues);
        toastSuccess("Comment created ");
      }
    }
  };

  const handleDelete = async () => {
    const response = await deleteComment({ forum_id: forumId, id: deleteId });
    try {
      if (response.status === httpStatus.NO_CONTENT) {
        onModalClose();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isEdit) {
      reset({ ...defaultValues, text_content: dataComment?.text_content });
    }
    // TODO: check if the dependency array content is correct or not
  }, [commentId]);

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
          {/* <FormControl
            control="file"
            size="lg"
            register={register}
            name="image_content"
          /> */}
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
              <div key={dataComment?.id}>
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
                  <Box bgColor={sikaai_colors.gray} borderRadius={"8px"} p={4}>
                    <Flex justifyContent={"space-between"}>
                      <Flex gap={5}>
                        <Flex direction={"column"}>
                          <Text fontSize={"16px"} fontWeight={500}>
                            {/* TODO: if not admin then dynamic data handle */}
                            {(dataComment?.is_admin && "Admin") ||
                              dataComment?.is_admin}
                          </Text>
                          <Text
                            fontSize={"12px"}
                            fontWeight={400}
                            color={sikaai_colors.gray_text_subtext}
                          >
                            {timeAgo(dataComment?.created_at)}
                          </Text>
                        </Flex>
                        {dataComment.is_pinned_comment && <PinIcon />}
                      </Flex>
                      <Box>
                        {/*  TODO popover design change*/}
                        <Popover>
                          <PopoverTrigger>
                            <Button variant={"ghost"}>
                              <ThreeDotsIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Button
                                variant={"ghost"}
                                onClick={() => {
                                  setCommentId(dataComment?.id);
                                  setIsEdit(true);
                                  onEditModalOpen();
                                }}
                                size={"lg"}
                              >
                                Edit
                              </Button>
                            </PopoverBody>
                            <PopoverBody>
                              <Button
                                variant={"ghost"}
                                onClick={onUnpinModalOpen}
                                size={"lg"}
                              >
                                Unpin
                              </Button>
                            </PopoverBody>
                            <PopoverBody>
                              <Button
                                variant={"ghost"}
                                onClick={() => {
                                  setDeleteId(dataComment?.id);
                                  onModalOpen();
                                }}
                                size={"lg"}
                              >
                                Delete
                              </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Box>
                    </Flex>

                    <Text>{dataComment?.text_content}</Text>
                  </Box>
                </Grid>
              </div>
            );
          })}
        </Box>
      </Box>

      {/* TODO: make generic for unpin and delete */}
      <ModalForm
        title={"Unpin"}
        isModalOpen={isUnpinModalOpen}
        closeModal={onUnpinModalClose}
        resetButttonText={"Close"}
        submitButtonText={"Unpin"}
        modalSize={"sm"}
      >
        <Text>Are you sure you want to unpin the comment?</Text>
      </ModalForm>

      {/* edit */}
      <ModalForm
        title={"Edit"}
        isModalOpen={isEditModalOpen}
        closeModal={onEditModalClose}
        resetButttonText={"Close"}
        submitButtonText={"Edit"}
        submitHandler={handleSubmit(onSubmitHandler)}
        // TODO: remove this comment
        // modalSize={"sm"}
      >
        <FormControl
          control="input"
          size="lg"
          register={register}
          name="text_content"
          placeholder="Write your answer"
          label={"Write your answer..."}
        />
        {/* TODO: image upload */}
      </ModalForm>

      {/* delete */}
      <ModalForm
        title={"Delete"}
        isModalOpen={isModalOpen}
        closeModal={onModalClose}
        resetButttonText={"Close"}
        submitButtonText={"Delete"}
        handleSubmit={() => handleDelete()}
        modalSize={"sm"}
      >
        <Text>Are you sure you want to delete?</Text>
      </ModalForm>
    </>
  );
};

export default ForumAnswer2;
