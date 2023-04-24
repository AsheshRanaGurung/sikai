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
import { sikaai_colors } from "@sikaai/theme/color";
import { useState } from "react";
import { useForm } from "react-hook-form";

function MyComponent({ key }: { key: number }) {
  const [formDisabled, setFormDisabled] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmitHandler = async (questionDetails: any) => {
    setFormDisabled(true);
    console.log(questionDetails, "sub");
    // response has an id
    // save that id
    // append that id in the request body
    // send it in next request
  };

  return (
    <>
      <Accordion defaultIndex={[0]} allowToggle>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                  {`Sub Question ${key}`}
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
                  name={`description`}
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
                    name={`question`}
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
                        name={`option1`}
                        placeholder="option 1"
                        disabled={formDisabled}
                      />
                      <FormControl
                        control="input"
                        register={register}
                        name={`option2`}
                        placeholder="option 2"
                        disabled={formDisabled}
                      />
                    </Flex>
                    <Flex gap={5}>
                      <FormControl
                        disabled={formDisabled}
                        control="input"
                        register={register}
                        name={`option3`}
                        placeholder="option 3"
                      />
                      <FormControl
                        disabled={formDisabled}
                        control="input"
                        register={register}
                        name={`option4`}
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
                    name={`solution`}
                    placeholder="solution"
                  />
                </Box>

                <Button type="submit" onClick={handleSubmit(onSubmitHandler)}>
                  Save
                </Button>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </form>
      </Accordion>
    </>
  );
}

function MainComponent2() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const myComponents = Array.from({ length: clickCount }, (_, i) => (
    <MyComponent key={i} />
  ));

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

export default MainComponent2;
