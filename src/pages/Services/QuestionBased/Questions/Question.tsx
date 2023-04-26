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
  useDisclosure,
} from "@chakra-ui/react";
import FormControl from "@sikaai/components/form/FormControl";
import Switch from "@sikaai/components/switch";
import { sikaai_colors } from "@sikaai/theme/color";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubQuestion from "./subQuestion";

function MyComponent() {
  const { register, handleSubmit } = useForm();
  const { isOpen: isStatusOpen, onOpen: onStatusOpen } = useDisclosure();

  const toggleSwitch = () => {
    onStatusOpen();
  };

  const onSubmitHandler = (data: any) => {
    console.log(data);
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
                Question 1
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
                      name={`question`}
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
                        <FormControl
                          control="input"
                          register={register}
                          name={`option1`}
                          placeholder="option 1"
                        />
                        <FormControl
                          control="input"
                          register={register}
                          name={`option2`}
                          placeholder="option 2"
                        />
                      </Flex>
                      <Flex gap={5}>
                        <FormControl
                          control="input"
                          register={register}
                          name={`option3`}
                          placeholder="option 3"
                        />
                        <FormControl
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
                      name={`solution`}
                      placeholder="solution"
                    />
                  </Box>
                  <Button type="submit">Save</Button>
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
    <MyComponent key={i} />
  ));

  return (
    <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3}>
      {myComponents}
      <Flex gap={3} alignItems={"center"} mt={3}>
        <Button variant={"round"} onClick={handleClick}>
          <AddIcon />
        </Button>
        <Text>Add Question</Text>
      </Flex>
    </Box>
  );
}

export default Question;
