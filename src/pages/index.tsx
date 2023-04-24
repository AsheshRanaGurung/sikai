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
import { useFieldArray, useForm } from "react-hook-form";

const Test = () => {
  const [switchIndex, setSwitchIndex] = useState<string[]>([]);
  const { register, control } = useForm({
    defaultValues: {
      group: [
        {
          description: "",
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
          solution: "",
        },
      ],
      subGroup: [
        {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
          solution: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "group",
    control,
    rules: {
      required: "Please append atleast one item",
    },
  });

  const {
    fields: subFields,
    append: appendSubField,
    // remove: removeSubField,
  } = useFieldArray({
    name: "subGroup",
    control,
    rules: {
      required: "Please append atleast one item",
    },
  });

  const {
    isOpen: isStatusOpen,
    onOpen: onStatusOpen,
    // onClose: onStatusClose,
  } = useDisclosure();

  const toggleSwitch = (index: string) => {
    onStatusOpen();
    setSwitchIndex((prevArray) => [...prevArray, index]);
  };

  return (
    <>
      <Box bg={sikaai_colors.white} borderRadius={"8px"}>
        <Accordion defaultIndex={0}>
          {fields.map((field, index) => {
            return (
              <AccordionItem key={field.id}>
                <h2>
                  <AccordionButton
                    _expanded={{
                      bg: sikaai_colors.primary,
                      color: sikaai_colors.white,
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
                      Question {`${index + 1}`}
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
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
                          disabled={
                            isStatusOpen && switchIndex.includes(field.id)
                          }
                          value={isStatusOpen && switchIndex.includes(field.id)}
                          toggleSwitch={() => toggleSwitch(field.id)}
                        />
                      </Flex>
                      {isStatusOpen && switchIndex.includes(field.id) && (
                        <FormControl
                          control="input"
                          register={register}
                          name={`group.${index}.description`}
                          placeholder="description"
                        />
                      )}
                    </Box>
                    {(!isStatusOpen || !switchIndex.includes(field.id)) && (
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
                            name={`group.${index}.question`}
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
                                name={`group.${index}.option1`}
                                placeholder="option 1"
                              />
                              <FormControl
                                control="input"
                                register={register}
                                name={`group.${index}.option2`}
                                placeholder="option 2"
                              />
                            </Flex>
                            <Flex gap={5}>
                              <FormControl
                                control="input"
                                register={register}
                                name={`group.${index}.option3`}
                                placeholder="option 3"
                              />
                              <FormControl
                                control="input"
                                register={register}
                                name={`group.${index}.option4`}
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
                              name={`group.${index}.answer`}
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
                            name={`group.${index}.solution`}
                            placeholder="solution"
                          />
                        </Box>
                        <Button>Save</Button>
                      </>
                    )}
                    {isStatusOpen && switchIndex.includes(field.id) && (
                      <Accordion defaultIndex={0}>
                        {subFields.map((subField, subIndex) => {
                          return (
                            <AccordionItem key={subField.id}>
                              <h2>
                                <AccordionButton
                                  _expanded={{
                                    bg: sikaai_colors.sidebar_text,
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
                                    Sub Question {`${subIndex + 1}`}
                                    <button
                                      type="button"
                                      onClick={() => remove(subIndex)}
                                    >
                                      Remove
                                    </button>
                                  </Box>
                                  <AccordionIcon />
                                </AccordionButton>
                              </h2>
                              <AccordionPanel pb={4}>
                                <Flex direction={"column"} gap={5}>
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
                                      name={`subGroup.${index}.${subIndex}.question`}
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
                                          name={`subGroup.${index}.${subIndex}.option1`}
                                          placeholder="option 1"
                                        />
                                        <FormControl
                                          control="input"
                                          register={register}
                                          name={`subGroup.${index}.${subIndex}.option2`}
                                          placeholder="option 2"
                                        />
                                      </Flex>
                                      <Flex gap={5}>
                                        <FormControl
                                          control="input"
                                          register={register}
                                          name={`subGroup.${index}.${subIndex}.option3`}
                                          placeholder="option 3"
                                        />
                                        <FormControl
                                          control="input"
                                          register={register}
                                          name={`subGroup.${index}.${subIndex}.option4`}
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
                                        name={`subGroup.${index}.${subIndex}.answer`}
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
                                      control="input"
                                      register={register}
                                      name={`subGroup.${index}.${subIndex}.solution`}
                                      placeholder="solution"
                                    />
                                  </Box>

                                  <Button>Save</Button>
                                </Flex>
                              </AccordionPanel>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    )}
                    {isStatusOpen && switchIndex.includes(field.id) && (
                      <Flex gap={3} alignItems={"center"}>
                        <Button
                          variant={"round"}
                          type="button"
                          onClick={() => {
                            appendSubField({
                              question: "",
                              option1: "",
                              option2: "",
                              option3: "",
                              option4: "",
                              answer: "",
                              solution: "",
                            });
                          }}
                        >
                          <AddIcon />
                        </Button>
                        <Text>Add sub question</Text>
                      </Flex>
                    )}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>

      <Box bg={sikaai_colors.white} borderRadius={"8px"} mt={3} p={2}>
        <Flex gap={3} alignItems={"center"}>
          <Button
            variant={"round"}
            type="button"
            onClick={() => {
              append({
                description: "",
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: "",
                solution: "",
              });
            }}
          >
            <AddIcon />
          </Button>
          <Text>Add Questions and Solutions</Text>
        </Flex>
      </Box>
    </>
  );
};

export default Test;
