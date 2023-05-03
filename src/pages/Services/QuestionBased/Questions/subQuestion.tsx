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
  Text,
} from "@chakra-ui/react";
import FormControl from "@sikaai/components/form/FormControl";
import { useCreateQuestion } from "@sikaai/service/sikaai-question";
import { sikaai_colors } from "@sikaai/theme/color";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
//   parent_content: "",
//   // image: "",
// };

const MyComponent = ({ index }: { index: number }) => {
  const [parentId, setParentId] = useState<number | null>(null);
  const { mutateAsync: createQuestion, isLoading } = useCreateQuestion();
  const [formDisabled, setFormDisabled] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmitHandler = async (questionDetails: any) => {
    setFormDisabled(true);
    const requestBody = {
      question_text: questionDetails?.question_text,
      subject_question_set_id: questionDetails?.subject_question_set_id ?? 0,
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
    createQuestion(
      parentId ? { ...requestBody, parent_id: parentId } : requestBody
    ).then((data: any) => {
      setParentId(data?.parent_id);
    });
    // response has an id
    // save that id
    // append that id in the request body
    // send it in next request
  };

  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle>
        <form>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{
                  bg: sikaai_colors.secondary,
                  color: sikaai_colors.black,
                }}
                borderRadius={"8px 8px 0 0"}
              >
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontWeight={600}
                  fontSize={"16px"}
                  //   color={sikaai_colors.primary}
                >
                  {`Sub Question ${index}`}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex direction={"column"} gap={5}>
                {/*  */}
                <FormControl
                  control="input"
                  register={register}
                  name={`parent_content`}
                  placeholder="description"
                  disabled={formDisabled}
                />
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
                    disabled={formDisabled}
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
                      <FormControl
                        control="input"
                        register={register}
                        name={`answer_text1`}
                        placeholder="option 1"
                        disabled={formDisabled}
                      />
                      <FormControl
                        control="input"
                        register={register}
                        name={`answer_text2`}
                        placeholder="option 2"
                        disabled={formDisabled}
                      />
                    </Flex>
                    <Flex gap={5}>
                      <FormControl
                        disabled={formDisabled}
                        control="input"
                        register={register}
                        name={`answer_text3`}
                        placeholder="option 3"
                      />
                      <FormControl
                        disabled={formDisabled}
                        control="input"
                        register={register}
                        name={`answer_text4`}
                        placeholder="option 4"
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
                      disabled={formDisabled}
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
                      //   value ={"true"}
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
                    disabled={formDisabled}
                    control="input"
                    register={register}
                    name={`description`}
                    placeholder="solution"
                  />
                </Box>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  onClick={handleSubmit(onSubmitHandler)}
                >
                  Save
                </Button>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </form>
      </Accordion>
    </>
  );
};

function SubQuestion() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const myComponents = Array.from({ length: clickCount }, (_, i) => {
    return <MyComponent key={i} index={i + 1} />;
  });

  return (
    <Box borderRadius={"8px"}>
      {myComponents}
      <Flex gap={3} alignItems={"center"} mt={3}>
        <Button variant={"round"} onClick={handleClick}>
          <AddIcon />
        </Button>
        <Text>Add sub question</Text>
      </Flex>
    </Box>
  );
}

export default SubQuestion;
