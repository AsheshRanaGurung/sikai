import {
  Flex,
  FormLabel,
  SimpleGrid,
  Grid,
  GridItem,
  HStack,
  Button,
  Box,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddImageIcon } from "@sikaai/assets/svgs";
import FormControl from "@sikaai/components/form/FormControl";
import ImageWithCancelButton from "@sikaai/components/ImageIcon/RemoveImageIcon";
import Spinner from "@sikaai/components/spinner";
import { toastSuccess } from "@sikaai/service/service-toast";
import {
  IOption,
  useGetQuestionSetById,
  useUpdateQuestionSetDetails,
} from "@sikaai/service/sikaai-question";
import { sikaai_colors } from "@sikaai/theme/color";
import { convertToBase64 } from "@sikaai/utils/index";
import httpStatus from "http-status";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const defaultValues = {
  question_text: "",
  question_image_base64: null as FileList | null,
  answer_text1: "" as null | string,
  optionAImage: null as FileList | null,
  answer_text2: "" as null | string,
  optionBImage: null as FileList | null,
  answer_text3: "" as null | string,
  optionCImage: null as FileList | null,
  answer_text4: "" as null | string,
  optionDImage: null as FileList | null,
  answer: "",
  description: "" as null | string,
  image: null as null | FileList,
};
// when you edit then only the image field is required
// if you try to assign the same field with that then there is an error of course

// TODO: simplify this logic
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

const QuestionViewForm = () => {
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

  const { questionSetId = "", id = "" } = useParams();

  // react queries
  const { data, isFetching } = useGetQuestionSetById({
    id: questionSetId,
  });
  const { mutateAsync: updateQuestion, isLoading } =
    useUpdateQuestionSetDetails();
  // react queries end

  // TODO: simplify this logic
  function getAnswer(answerArray: IOption[]) {
    if (answerArray?.[0]?.is_correct) {
      return "A";
    } else if (answerArray?.[1]?.is_correct) {
      return "B";
    } else if (answerArray?.[2]?.is_correct) {
      return "C";
    } else if (answerArray?.[3]?.is_correct) {
      return "D";
    } else {
      return "";
    }
  }

  const onSubmitHandler = async (questionDetails: typeof defaultValues) => {
    const requestBody = {
      //   id: questionDetailsProp?.id,
      id: +id,
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
          // there is a problem when you upload an image and then try to save it
          // but there is already image
          // in that case you cannot convert to base64 since it is null
          // for that you have to prepopulate the value as a file
          // backend sends data as src
          // we send data as base64
          // when we set the data data comes in fileList
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

    const response = await updateQuestion(requestBody);
    if (response.status === httpStatus.OK) {
      toastSuccess("Question set created successful");
    }
  };

  const questionDetailsProp =
    data?.question?.find(item => item.id === +id) || null;

  useEffect(() => {
    if (questionDetailsProp) {
      reset({
        ...defaultValues,
        question_text: questionDetailsProp?.question_text,
        question_image_base64: questionDetailsProp?.question_image,
        answer_text1: questionDetailsProp?.options?.[0]?.answer_text,
        answer_text2: questionDetailsProp?.options?.[1]?.answer_text,
        answer_text3: questionDetailsProp?.options?.[2]?.answer_text,
        answer_text4: questionDetailsProp?.options?.[3]?.answer_text,
        // this doesnot seem to be required
        // except to show the icon green
        optionAImage: questionDetailsProp?.options?.[0]?.answer_image,
        optionBImage: questionDetailsProp?.options?.[1]?.answer_image,
        optionCImage: questionDetailsProp?.options?.[2]?.answer_image,
        optionDImage: questionDetailsProp?.options?.[3]?.answer_image,
        // here
        answer: getAnswer(questionDetailsProp?.options),
        description: questionDetailsProp?.solution?.description,
        image: questionDetailsProp?.solution?.image,
      });
    }
  }, [questionDetailsProp]);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    // TODO: add description portion
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box>
        <Text fontWeight={600} fontSize={"16px"} color={sikaai_colors.primary}>
          Question
        </Text>
        <Flex gap={3}>
          <FormControl
            control="editor"
            name={`question_text`}
            placeholder="option A"
            data={watch("question_text")}
            onChange={(data: string) => setValue("question_text", data)}
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
                    fill: watch("question_image_base64") ? "green" : "#585FCD",
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
      {
        <ImageWithCancelButton
          image={watch("question_image_base64")}
          imageSrc={questionDetailsProp?.question_image}
          onImageRemove={() => setValue("question_image_base64", null)}
        />
      }
      <Box>
        <Text fontWeight={600} fontSize={"16px"} color={sikaai_colors.primary}>
          Options
        </Text>
        <SimpleGrid
          columns={{ base: 2, sm: 1, md: 2, lg: 2, xl: 2 }}
          spacing={5}
        >
          <Grid templateColumns="min-content repeat(6, 1fr)" gap={6}>
            <GridItem colSpan={1}>
              <Text color={sikaai_colors.primary} mt={2} textAlign={"right"}>
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
                        fill: watch("optionAImage") ? "green" : "#585FCD",
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
              {
                <ImageWithCancelButton
                  image={watch("optionAImage")}
                  imageSrc={questionDetailsProp?.options?.[0]?.answer_image}
                  onImageRemove={() => setValue("optionAImage", null)}
                />
              }
            </GridItem>
          </Grid>
          <Grid templateColumns="min-content repeat(6, 1fr)" gap={6}>
            <GridItem colSpan={1}>
              <Text color={sikaai_colors.primary} mt={2} textAlign={"right"}>
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
                        fill: watch("optionBImage") ? "green" : "#585FCD",
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
            {
              <ImageWithCancelButton
                image={watch("optionBImage")}
                imageSrc={questionDetailsProp?.options?.[1]?.answer_image}
                onImageRemove={() => setValue("optionBImage", null)}
              />
            }
          </Grid>
          <Grid templateColumns="min-content repeat(6, 1fr)" gap={6}>
            <GridItem colSpan={1}>
              <Text color={sikaai_colors.primary} mt={2} textAlign={"right"}>
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
                        fill: watch("optionCImage") ? "green" : "#585FCD",
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
            {
              <ImageWithCancelButton
                image={watch("optionCImage")}
                imageSrc={questionDetailsProp?.options?.[2]?.answer_image}
                onImageRemove={() => setValue("optionCImage", null)}
              />
            }
          </Grid>
          <Grid templateColumns="min-content repeat(6, 1fr)" gap={6}>
            <GridItem colSpan={1} flexDirection={"row"} alignItems={"center"}>
              <Text color={sikaai_colors.primary} mt={2} textAlign={"right"}>
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
                        fill: watch("optionDImage") ? "green" : "#585FCD",
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
              {
                <ImageWithCancelButton
                  image={watch("optionDImage")}
                  imageSrc={questionDetailsProp?.options?.[3]?.answer_image}
                  onImageRemove={() => setValue("optionDImage", null)}
                />
              }
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
            Choose the correct Answer
          </Text>
          <FormControl
            control="radio"
            value={
              questionDetailsProp?.options
                ? getAnswer(questionDetailsProp?.options)
                : "A"
            }
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
      <Text fontWeight={600} fontSize={"16px"} color={sikaai_colors.primary}>
        Solution
      </Text>
      <HStack justifyContent={"space-around"} gap={3} wrap={"nowrap"}>
        <FormControl
          control="editor"
          name={`description`}
          placeholder="description"
          data={watch("description")}
          onChange={(data: string) => setValue("description", data)}
          error={errors?.description?.message || errors?.image?.message || ""}
        />

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
      {
        <ImageWithCancelButton
          image={watch("image")}
          imageSrc={questionDetailsProp?.solution?.image}
          onImageRemove={() => setValue("image", null)}
        />
      }
      <Button type="submit" isLoading={isLoading}>
        Edit
      </Button>
    </form>
  );
};

export default QuestionViewForm;
