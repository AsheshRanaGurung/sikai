import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
} from "@chakra-ui/react";
import { toastSuccess } from "@sikaai/service/service-toast";
import { useCreateQuestion } from "@sikaai/service/sikaai-question";
import { convertToBase64 } from "@sikaai/utils/index";
import httpStatus from "http-status";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AddImageIcon } from "@sikaai/assets/svgs/index";
import { sikaai_colors } from "@sikaai/theme/color";
import Switch from "@sikaai/components/switch";
import SubQuestion from "./subQuestion";
import FormControl from "@sikaai/components/form/FormControl";

const defaultValues = {
  question_text: "",
  question_image_base64: null,
  subject_question_set_id: null as number | null,
  answer_text1: null,
  answer_text2: null,
  answer_text3: null,
  answer_text4: null,
  optionAImage: null,
  optionBImage: null,
  optionCImage: null,
  optionDImage: null,
  answer: "",
  description: "",
  image: null,
};
const QuestionAccordion = () => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: defaultValues,
  });
  const { isOpen: isStatusOpen, onOpen: onStatusOpen } = useDisclosure();
  const { id: questionSetId = "" } = useParams();
  const { mutateAsync: createQuestion, isLoading } = useCreateQuestion();
  const toggleSwitch = () => {
    onStatusOpen();
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
        image: await convertToBase64(questionDetails?.image?.[0]),
      },
    };

    const response = await createQuestion(requestBody);
    if (response.status === httpStatus.CREATED) {
      toastSuccess("Question set created successful");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Accordion defaultIndex={0} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton
              _expanded={{
                bg: sikaai_colors.primary,
                color: sikaai_colors.white,
              }}
              borderRadius={"8px 8px 0 0"}
              bg={sikaai_colors.secondary}
            >
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontWeight={600}
                fontSize={"16px"}
                //   color={sikaai_colors.primary}
              >
                Question
                {/* <button type="button" onClick={() => remove(index)}>
                          <TrashIcon />
                        </button> */}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex direction={"column"} gap={5}>
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
                    disabled={isStatusOpen}
                    value={isStatusOpen}
                    toggleSwitch={toggleSwitch}
                  />
                </Flex>
                <Box>{isStatusOpen && <SubQuestion />}</Box>
              </Box>
              {!isStatusOpen && (
                <>
                  <Box>
                    <Text
                      fontWeight={600}
                      fontSize={"16px"}
                      color={sikaai_colors.primary}
                    >
                      Question
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

                  <Box>
                    <Text
                      fontWeight={600}
                      fontSize={"16px"}
                      color={sikaai_colors.primary}
                    >
                      Options
                    </Text>
                    <SimpleGrid
                      columns={{ base: 2, sm: 1, md: 2, lg: 2, xl: 2 }}
                      spacing={5}
                    >
                      <Grid
                        templateColumns="min-content repeat(6, 1fr)"
                        gap={6}
                      >
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
                      </Grid>
                      <Grid
                        templateColumns="min-content repeat(6, 1fr)"
                        gap={6}
                      >
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
                      </Grid>
                      <Grid
                        templateColumns="min-content repeat(6, 1fr)"
                        gap={6}
                      >
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
                      </Grid>
                      <Grid
                        templateColumns="min-content repeat(6, 1fr)"
                        gap={6}
                      >
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
                      />
                    </Flex>
                  </Box>

                  <HStack
                    justifyContent={"space-around"}
                    gap={3}
                    wrap={"nowrap"}
                  >
                    <Text
                      fontWeight={600}
                      fontSize={"16px"}
                      color={sikaai_colors.primary}
                    >
                      Solution
                    </Text>
                    <FormControl
                      control="editor"
                      name={`description`}
                      placeholder="description"
                      data={watch("description")}
                      // height={"50"}
                      onChange={(data: string) => setValue("description", data)}
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
                  <Button type="submit" isLoading={isLoading}>
                    Save
                  </Button>
                </>
              )}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </form>
  );
};
export default QuestionAccordion;
