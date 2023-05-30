import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { toastSuccess } from "@sikaai/service/service-toast";
import { useCreateQuestion } from "@sikaai/service/sikaai-question";
import { convertToBase64 } from "@sikaai/utils/index";
import httpStatus from "http-status";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddImageIcon } from "@sikaai/assets/svgs/index";
import { ImageCancel } from "@sikaai/assets/svgs/index";
import { sikaai_colors } from "@sikaai/theme/color";
import Switch from "@sikaai/components/switch";
import SubQuestion from "./subQuestion";
import FormControl from "@sikaai/components/form/FormControl";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";

const defaultValues = {
  question_text: "",
  question_image_base64: null as FileList | null,
  subject_question_set_id: null as number | null,
  answer_text1: "",
  answer_text2: "",
  answer_text3: "",
  answer_text4: "",
  optionAImage: null as FileList | null,
  optionBImage: null as FileList | null,
  optionCImage: null as FileList | null,
  optionDImage: null as FileList | null,
  answer: "",
  description: "",
  image: null,
};

const schema = Yup.object().shape(
  {
    question_text: Yup.string().when("question_image_base64", {
      is: null,
      then: () => Yup.string().required("Please enter your question"),
      otherwise: () => Yup.string(),
    }),
    question_image_base64: Yup.mixed().when("question_text", {
      is: "",
      then: () => Yup.mixed().required("This field is required").nullable(),
      otherwise: () => Yup.mixed().nullable(),
    }),
    answer_text1: Yup.string().when("optionAImage", {
      is: null,
      then: () => Yup.string().required("This field is required"),
      otherwise: () => Yup.string(),
    }),
    optionAImage: Yup.mixed().when("answer_text1", {
      is: "",
      then: () => Yup.mixed().required("This field is required").nullable(),
      otherwise: () => Yup.mixed().nullable(),
    }),
    answer_text2: Yup.string().when("optionBImage", {
      is: null,
      then: () => Yup.string().required("This field is required"),
      otherwise: () => Yup.string(),
    }),
    optionBImage: Yup.mixed().when("answer_text2", {
      is: "",
      then: () => Yup.mixed().required("This field is required").nullable(),
      otherwise: () => Yup.mixed().nullable(),
    }),
    answer_text3: Yup.string().when("optionCImage", {
      is: null,
      then: () => Yup.string().required("This field is required"),
      otherwise: () => Yup.string(),
    }),
    optionCImage: Yup.mixed().when("answer_text3", {
      is: "",
      then: () => Yup.mixed().required("This field is required").nullable(),
      otherwise: () => Yup.mixed().nullable(),
    }),
    answer_text4: Yup.string().when("optionDImage", {
      is: null,
      then: () => Yup.string().required("This field is required"),
      otherwise: () => Yup.string(),
    }),
    optionDImage: Yup.mixed().when("answer_text4", {
      is: "",
      then: () => Yup.mixed().required("This field is required").nullable(),
      otherwise: () => Yup.mixed().nullable(),
    }),
    answer: Yup.string().required("This field is required"),
    description: Yup.string().when("image", {
      is: null,
      then: () => Yup.string().required("This field is required"),
      otherwise: () => Yup.string(),
    }),
    image: Yup.mixed().when("description", {
      is: "",
      then: () => Yup.mixed().required("This field is required").nullable(),
      otherwise: () => Yup.mixed().nullable(),
    }),
  },
  [
    ["question_text", "question_image_base64"],
    ["description", "image"],
    ["answer_text4", "optionDImage"],
    ["answer_text3", "optionCImage"],
    ["answer_text2", "optionBImage"],
    ["answer_text1", "optionAImage"],
  ]
);

const QuestionAccordion = () => {
  const navigate = useNavigate();

  // Access optional params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parentId = queryParams.get("parentId");
  // end

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    isOpen: isStatusOpen,
    onOpen: onStatusOpen,
    onClose: onStatusClose,
  } = useDisclosure();
  const { id: questionSetId = "" } = useParams();
  const { mutateAsync: createQuestion, isLoading } = useCreateQuestion();

  const toggleSwitch = () => {
    if (isStatusOpen) {
      onStatusClose();
    } else {
      onStatusOpen();
    }
  };

  const onSubmitHandler = async (questionDetails: typeof defaultValues) => {
    const requestBody = {
      question_text: questionDetails?.question_text,
      question_image_base64: await convertToBase64(
        questionDetails?.question_image_base64?.[0]
      ),
      subject_question_set_id: +questionSetId ?? 0,
      options: [
        {
          answer_text: questionDetails?.answer_text1,
          answer_image_base64: await convertToBase64(
            questionDetails?.optionAImage?.[0]
          ),
          is_correct: questionDetails?.answer === "A",
        },
        {
          answer_text: questionDetails?.answer_text2,
          answer_image_base64: await convertToBase64(
            questionDetails?.optionBImage?.[0]
          ),
          is_correct: questionDetails?.answer === "B",
        },
        {
          answer_text: questionDetails?.answer_text3,
          answer_image_base64: await convertToBase64(
            questionDetails?.optionCImage?.[0]
          ),
          is_correct: questionDetails?.answer === "C",
        },
        {
          answer_text: questionDetails?.answer_text4,
          answer_image_base64: await convertToBase64(
            questionDetails?.optionDImage?.[0]
          ),
          is_correct: questionDetails?.answer === "D",
        },
      ],
      solution: {
        description: questionDetails?.description,
        solution_image_base64: await convertToBase64(
          questionDetails?.image?.[0]
        ),
      },
    };

    const response = await createQuestion(requestBody);
    if (response.status === httpStatus.CREATED) {
      reset(defaultValues);
      toastSuccess("Question set created successful");
      navigate(`${NAVIGATION_ROUTES.VIEW_QUESTION_SET}/${questionSetId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box borderRadius={"8px"} p={3} bg={sikaai_colors.white}>
        <Flex
          direction={"column"}
          borderRadius={"8px"}
          p={3}
          gap={5}
          bg={sikaai_colors.white}
        >
          {!parentId && (
            <Box>
              <Flex gap={5}>
                <Text
                  fontWeight={600}
                  fontSize={"16px"}
                  color={sikaai_colors.primary}
                >
                  Description
                </Text>
                <Switch
                  // disabled={isStatusOpen}
                  value={isStatusOpen}
                  toggleSwitch={toggleSwitch}
                />
              </Flex>

              <Box>{isStatusOpen && <SubQuestion />}</Box>
            </Box>
          )}

          {!isStatusOpen &&
            (parentId ? (
              <SubQuestion />
            ) : (
              <>
                <Box>
                  <Text
                    fontWeight={600}
                    fontSize={"16px"}
                    color={sikaai_colors.primary}
                  >
                    Question :
                  </Text>
                  <Flex gap={3}>
                    <FormControl
                      control="editor"
                      name={`question_text`}
                      placeholder="option A"
                      data={watch("question_text")}
                      onChange={(data: string) =>
                        setValue("question_text", data)
                      }
                      error={
                        errors?.question_text?.message ||
                        errors?.question_image_base64?.message ||
                        ""
                      }
                    />
                    <Tooltip
                      label="Select Image"
                      placement={"top"}
                      bg="white"
                      border="none"
                      boxShadow={"base"}
                    >
                      <FormLabel
                        htmlFor="questionImage"
                        alignSelf={"center"}
                        sx={{
                          "& svg": {
                            "& > circle": {
                              fill: watch("question_image_base64")
                                ? "green"
                                : "#585FCD",
                            },
                          },
                        }}
                      >
                        <AddImageIcon />
                      </FormLabel>
                    </Tooltip>
                  </Flex>
                  <FormControl
                    width="250px"
                    control="file"
                    register={register}
                    name={"question_image_base64"}
                    id="questionImage"
                    display="none"
                  />
                </Box>
                {watch("question_image_base64") && (
                  <HStack alignItems={"top"} marginLeft={"2px"}>
                    <Image
                      height="55px"
                      width="55px"
                      src={URL.createObjectURL(
                        watch("question_image_base64")?.[0] as Blob
                      )}
                      alt="this is image"
                    />
                    <Box
                      onClick={() => {
                        setValue("question_image_base64", null);
                      }}
                    >
                      <ImageCancel style={{ cursor: "pointer" }} />
                    </Box>
                  </HStack>
                )}

                <Box>
                  <Text
                    fontWeight={600}
                    fontSize={"16px"}
                    color={sikaai_colors.primary}
                  >
                    Options :
                  </Text>
                  <SimpleGrid
                    columns={{ base: 2, sm: 1, md: 2, lg: 2, xl: 2 }}
                    spacing={5}
                  >
                    <Grid templateColumns="min-content repeat(6, 1fr)" gap={6}>
                      <GridItem colSpan={1}>
                        <Text
                          color={sikaai_colors.primary}
                          mt={2}
                          textAlign={"right"}
                        >
                          A:
                        </Text>
                      </GridItem>
                      <GridItem colSpan={5}>
                        <FormControl
                          control="input"
                          name={`answer_text1`}
                          placeholder="option A"
                          register={register}
                          error={
                            errors?.answer_text1?.message ||
                            errors?.optionAImage?.message ||
                            ""
                          }
                        />
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Tooltip
                          label="Select Image"
                          placement={"top"}
                          bg="white"
                          border="none"
                          boxShadow={"base"}
                        >
                          <FormLabel
                            htmlFor="optionImageA"
                            alignSelf="center"
                            sx={{
                              "& svg": {
                                "& > circle": {
                                  fill: watch("optionAImage")
                                    ? "green"
                                    : "#585FCD",
                                },
                              },
                            }}
                          >
                            <AddImageIcon />
                          </FormLabel>
                        </Tooltip>
                        <FormControl
                          width="250px"
                          control="file"
                          register={register}
                          name={"optionAImage"}
                          id="optionImageA"
                          display="none"
                        />
                      </GridItem>
                      <GridItem colSpan={6}>
                        {watch("optionAImage") && (
                          <HStack alignItems={"top"} marginLeft={"2px"}>
                            <Image
                              height="55px"
                              width="55px"
                              src={URL.createObjectURL(
                                watch("optionAImage")?.[0] as Blob
                              )}
                              alt="this is image"
                            />
                            <Box
                              onClick={() => {
                                setValue("optionAImage", null);
                              }}
                            >
                              <ImageCancel style={{ cursor: "pointer" }} />
                            </Box>
                          </HStack>
                        )}
                      </GridItem>
                    </Grid>
                    <Grid templateColumns="min-content repeat(6, 1fr)" gap={6}>
                      <GridItem colSpan={1}>
                        <Text
                          color={sikaai_colors.primary}
                          mt={2}
                          textAlign={"right"}
                        >
                          B:
                        </Text>
                      </GridItem>
                      <GridItem colSpan={5}>
                        <FormControl
                          control="input"
                          register={register}
                          name={`answer_text2`}
                          placeholder="option B"
                          error={
                            errors?.answer_text2?.message ||
                            errors?.optionBImage?.message ||
                            ""
                          }
                        />
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Tooltip
                          label="Select Image"
                          placement={"top"}
                          bg="white"
                          border="none"
                          boxShadow={"base"}
                        >
                          <FormLabel
                            htmlFor="optionBImage"
                            alignSelf={"center"}
                            sx={{
                              "& svg": {
                                "& > circle": {
                                  fill: watch("optionBImage")
                                    ? "green"
                                    : "#585FCD",
                                },
                              },
                            }}
                          >
                            <AddImageIcon />
                          </FormLabel>
                        </Tooltip>
                        <FormControl
                          id="optionBImage"
                          width="250px"
                          control="file"
                          register={register}
                          name={"optionBImage"}
                          display="none"
                        />
                      </GridItem>
                      <GridItem colSpan={6}>
                        {watch("optionBImage") && (
                          <HStack alignItems={"top"} marginLeft={"2px"}>
                            <Image
                              height="55px"
                              width="55px"
                              src={URL.createObjectURL(
                                watch("optionBImage")?.[0] as Blob
                              )}
                              alt="this is image"
                            />
                            <Box
                              onClick={() => {
                                setValue("optionBImage", null);
                              }}
                            >
                              <ImageCancel style={{ cursor: "pointer" }} />
                            </Box>
                          </HStack>
                        )}
                      </GridItem>
                    </Grid>

                    <Grid templateColumns="min-content repeat(6, 1fr)" gap={6}>
                      <GridItem colSpan={1}>
                        <Text
                          color={sikaai_colors.primary}
                          mt={2}
                          textAlign={"right"}
                        >
                          C:
                        </Text>
                      </GridItem>
                      <GridItem colSpan={5}>
                        <FormControl
                          control="input"
                          register={register}
                          name={`answer_text3`}
                          placeholder="option C"
                          error={
                            errors?.answer_text3?.message ||
                            errors?.optionCImage?.message ||
                            ""
                          }
                        />
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Tooltip
                          label="Select Image"
                          placement={"top"}
                          bg="white"
                          border="none"
                          boxShadow={"base"}
                        >
                          <FormLabel
                            htmlFor="optionCImage"
                            alignSelf={"center"}
                            sx={{
                              "& svg": {
                                "& > circle": {
                                  fill: watch("optionCImage")
                                    ? "green"
                                    : "#585FCD",
                                },
                              },
                            }}
                          >
                            <AddImageIcon />
                          </FormLabel>
                        </Tooltip>
                        <FormControl
                          id="optionCImage"
                          width="250px"
                          control="file"
                          register={register}
                          name={"optionCImage"}
                          display="none"
                        />
                      </GridItem>
                      <GridItem colSpan={6}>
                        {watch("optionCImage") && (
                          <HStack alignItems={"top"} marginLeft={"2px"}>
                            <Image
                              height="55px"
                              width="55px"
                              src={URL.createObjectURL(
                                watch("optionCImage")?.[0] as Blob
                              )}
                              alt="this is image"
                            />
                            <Box
                              onClick={() => {
                                setValue("optionCImage", null);
                              }}
                            >
                              <ImageCancel style={{ cursor: "pointer" }} />
                            </Box>
                          </HStack>
                        )}
                      </GridItem>
                    </Grid>
                    <Grid templateColumns="min-content repeat(6, 1fr)" gap={6}>
                      <GridItem
                        colSpan={1}
                        flexDirection={"row"}
                        alignItems={"center"}
                      >
                        <Text
                          color={sikaai_colors.primary}
                          mt={2}
                          textAlign={"right"}
                        >
                          D:
                        </Text>
                      </GridItem>
                      <GridItem colSpan={5}>
                        <FormControl
                          control="input"
                          register={register}
                          name={`answer_text4`}
                          placeholder="option D"
                          error={
                            errors?.answer_text4?.message ||
                            errors?.optionDImage?.message ||
                            ""
                          }
                        />
                      </GridItem>
                      <GridItem colSpan={1} flexDirection={"row"}>
                        <Tooltip
                          label="Select Image"
                          placement={"top"}
                          bg="white"
                          border="none"
                          boxShadow={"base"}
                        >
                          <FormLabel
                            htmlFor="optionDImage"
                            alignSelf="center"
                            sx={{
                              "& svg": {
                                "& > circle": {
                                  fill: watch("optionDImage")
                                    ? "green"
                                    : "#585FCD",
                                },
                              },
                            }}
                          >
                            <AddImageIcon />
                          </FormLabel>
                        </Tooltip>
                        <FormControl
                          id="optionDImage"
                          width="250px"
                          control="file"
                          register={register}
                          name={"optionDImage"}
                          display="none"
                        />
                      </GridItem>
                      <GridItem colSpan={6}>
                        {watch("optionDImage") && (
                          <HStack alignItems={"top"} marginLeft={"2px"}>
                            <Image
                              height="55px"
                              width="55px"
                              src={URL.createObjectURL(
                                watch("optionDImage")?.[0] as Blob
                              )}
                              alt="this is image"
                            />
                            <Box
                              onClick={() => {
                                setValue("optionDImage", null);
                              }}
                            >
                              <ImageCancel style={{ cursor: "pointer" }} />
                            </Box>
                          </HStack>
                        )}
                      </GridItem>
                    </Grid>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Flex gap={6}>
                    <Text
                      fontWeight={600}
                      fontSize={"16px"}
                      color={sikaai_colors.primary}
                      whiteSpace={"nowrap"}
                    >
                      Choose the correct Answer :
                    </Text>
                    <FormControl
                      control="radio"
                      options={[
                        {
                          label: "A",
                          value: "A",
                        },
                        {
                          label: "B",
                          value: "B",
                        },
                        {
                          label: "C",
                          value: "C",
                        },
                        {
                          label: "D",
                          value: "D",
                        },
                      ]}
                      register={register}
                      name={`answer`}
                      error={errors?.answer?.message || ""}
                    />
                  </Flex>
                </Box>

                <Text
                  fontWeight={600}
                  fontSize={"16px"}
                  color={sikaai_colors.primary}
                >
                  Solution :
                </Text>
                <HStack justifyContent={"space-around"} gap={3} wrap={"nowrap"}>
                  <FormControl
                    control="editor"
                    name={`description`}
                    placeholder="description"
                    data={watch("description")}
                    // height={"50"}
                    onChange={(data: string) => setValue("description", data)}
                    error={
                      errors?.description?.message ||
                      errors?.image?.message ||
                      ""
                    }
                  />
                  {/* <FormControl
                      
                        flexGrow={1}
                        control="input"
                        register={register}
                        name={"description"}
                        placeholder="solution"
                      /> */}
                  <Box width={"6.5%"}>
                    <Tooltip
                      label="Select Image"
                      placement={"top"}
                      bg="white"
                      border="none"
                      boxShadow={"base"}
                    >
                      <FormLabel
                        htmlFor="image"
                        style={{ alignSelf: "center" }}
                        sx={{
                          "& svg": {
                            "& > circle": {
                              fill: watch("image") ? "green" : "#585FCD",
                            },
                          },
                        }}
                      >
                        <AddImageIcon />
                      </FormLabel>
                    </Tooltip>
                    <FormControl
                      id="image"
                      control="file"
                      register={register}
                      name={"image"}
                      display="none"
                    />
                  </Box>
                </HStack>
                {watch("image") && (
                  <HStack alignItems={"top"} marginLeft={"2px"}>
                    <Image
                      height="55px"
                      width="55px"
                      src={URL.createObjectURL(
                        watch("image")?.[0] as unknown as Blob
                      )}
                      alt="this is image"
                    />
                    <Box
                      onClick={() => {
                        setValue("image", null);
                        // reset({
                        //   ...watch(),
                        //   image: null as FileList | null,
                        // });
                      }}
                    >
                      <ImageCancel style={{ cursor: "pointer" }} />
                    </Box>
                  </HStack>
                )}

                <Button type="submit" isLoading={isLoading}>
                  Save
                </Button>
              </>
            ))}
        </Flex>
      </Box>
    </form>
  );
};
export default QuestionAccordion;
