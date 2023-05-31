import {
  Box,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import FormControl from "@sikaai/components/form/FormControl";
import { sikaai_colors } from "@sikaai/theme/color";
import { AddImageIcon } from "@sikaai/assets/svgs/index";
import { ImageCancel } from "@sikaai/assets/svgs/index";
import {
  FieldErrorsImpl,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import React from "react";

export interface IdefaultForm {
  parent_content: string;
  question_text: string;
  question_image_base64: FileList | null;
  answer_text1: string;
  answer_text2: string;
  answer_text3: string;
  answer_text4: string;
  optionAImage: FileList | null;
  optionBImage: FileList | null;
  optionCImage: FileList | null;
  optionDImage: FileList | null;
  answer: string;
  description: string;
  image: FileList | null;
}

interface ICKform {
  watch: UseFormWatch<Partial<IdefaultForm>>;
  errors: FieldErrorsImpl<IdefaultForm>;
  setValue: UseFormSetValue<Partial<IdefaultForm>>;
  register: UseFormRegister<Partial<IdefaultForm>>;
}

const CKForm: React.FC<ICKform> = ({ watch, errors, setValue, register }) => {
  return (
    <>
      <Box>
        <Text fontWeight={600} fontSize={"16px"} color={sikaai_colors.primary}>
          Question :
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
        <Text fontWeight={600} fontSize={"16px"} color={sikaai_colors.primary}>
          Options :
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

      <Text fontWeight={600} fontSize={"16px"} color={sikaai_colors.primary}>
        Solution :
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
      {watch("image") && (
        <HStack alignItems={"top"} marginLeft={"2px"}>
          <Image
            height="55px"
            width="55px"
            src={URL.createObjectURL(watch("image")?.[0] as unknown as Blob)}
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
    </>
  );
};

export default CKForm;
