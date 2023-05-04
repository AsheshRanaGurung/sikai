import { AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import FormControl from "@sikaai/components/form/FormControl";
import Switch from "@sikaai/components/switch";
import { sikaai_colors } from "@sikaai/theme/color";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubQuestion from "./subQuestion";
import { useCreateQuestion } from "@sikaai/service/sikaai-question";
import { useParams } from "react-router-dom";
import { toastSuccess } from "@sikaai/service/service-toast";
import httpStatus from "http-status";

// const defaultValues = {
//   question_text: "",
//   // question_image: "",
//   subject_question_set_id: null as number | null,
//   answer_text1: "",
//   answer_text2: "",
//   answer_text3: "",
//   answer_text4: "",
//   answer: "",
//   description: "",
//   // image: "",
// };

function MyComponent() {
  const { register, handleSubmit } = useForm();
  const { isOpen: isStatusOpen, onOpen: onStatusOpen } = useDisclosure();

  const { id: questionSetId = "" } = useParams();

  const { mutateAsync: createQuestion, isLoading } = useCreateQuestion();

  const toggleSwitch = () => {
    onStatusOpen();
  };

  const onSubmitHandler = async (questionDetails: any) => {
    const requestBody = {
      question_text: questionDetails?.question_text,
      subject_question_set_id: +questionSetId ?? 0,
      options: [
        {
          answer_text: questionDetails?.answer_text1,
          is_correct: questionDetails?.answer === "A" ? true : false,
        },
        {
          answer_text: questionDetails?.answer_text2,
          is_correct: questionDetails?.answer === "B" ? true : false,
        },
        {
          answer_text: questionDetails?.answer_text3,
          is_correct: questionDetails?.answer === "C" ? true : false,
        },
        {
          answer_text: questionDetails?.answer_text4,
          is_correct: questionDetails?.answer === "D" ? true : false,
        },
      ],
      solution: {
        description: questionDetails?.description,
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
                    <FormControl
                      control="input"
                      register={register}
                      name={`question_text`}
                      placeholder="question"
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
                    <Flex gap={3} direction={"column"}>
                      <Flex gap={5}>
                        {/* TODO: change margin top to something else */}
                        <Text color={sikaai_colors.primary} mt={2}>
                          A:
                        </Text>
                        <FormControl
                          control="input"
                          register={register}
                          name={`answer_text1`}
                          placeholder="option A"
                        />
                        <Text color={sikaai_colors.primary} mt={2}>
                          B:
                        </Text>
                        <FormControl
                          control="input"
                          register={register}
                          name={`answer_text2`}
                          placeholder="option B"
                        />
                      </Flex>
                      <Flex gap={5}>
                        <Text color={sikaai_colors.primary} mt={2}>
                          C:
                        </Text>
                        <FormControl
                          control="input"
                          register={register}
                          name={`answer_text3`}
                          placeholder="option C"
                        />
                        <Text color={sikaai_colors.primary} mt={2}>
                          D:
                        </Text>
                        <FormControl
                          control="input"
                          register={register}
                          name={`answer_text4`}
                          placeholder="option D"
                        />
                      </Flex>
                    </Flex>
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

                  <Box>
                    <Text
                      fontWeight={600}
                      fontSize={"16px"}
                      color={sikaai_colors.primary}
                    >
                      Solution
                    </Text>

                    <FormControl
                      control="input"
                      register={register}
                      name={"description"}
                      placeholder="solution"
                    />
                  </Box>
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
}

function Question() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const myComponents = Array.from({ length: clickCount }, (_, i) => (
    // TODO: refactor this code
    <Box borderRadius={"8px"} p={1} key={i}>
      <MyComponent />
    </Box>
  ));

  return (
    <Flex direction={"column"} gap={4}>
      <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3}>
        {myComponents}
      </Box>
      <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3}>
        <Flex gap={3} alignItems={"center"}>
          <Button variant={"round"} onClick={handleClick}>
            <AddIcon />
          </Button>
          <Text>Add Question</Text>
        </Flex>
      </Box>

      <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3}>
        <Flex>
          <Spacer />
          <Flex gap={2}>
            <Button variant={"reset"}>Cancel</Button>
            <Button>Finish</Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Question;
