import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import { useFieldArray, useForm } from "react-hook-form";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { PlusIcon, TrashIcon } from "@sikaai/assets/svgs";
import { sikaai_colors } from "@sikaai/theme/color";

const CreateFAQ = () => {
  const { control, register } = useForm({
    defaultValues: {
      faq: [
        {
          question: "",
          answer: "",
        },
      ],
    },
  });
  const { append, fields, remove } = useFieldArray({ control, name: "faq" });
  return (
    <>
      <BreadCrumb
        title="Frequently Asked Question"
        items={[{ name: "create FAQ", route: NAVIGATION_ROUTES.FAQ_CREATE }]}
      />
      <Text
        fontWeight={"bold"}
        fontSize={"sm"}
        mb={"10px"}
        color={sikaai_colors.gray_text}
      >
        Create FAQ
      </Text>
      {fields.map((item, index) => {
        return (
          <Box
            backgroundColor={"white"}
            padding={5}
            borderRadius={"8px"}
            mt={"10px"}
            key={item.id}
          >
            <Flex justifyContent={"flex-end"}>
              <TrashIcon onClick={() => remove(index)} />
            </Flex>
            <FormControl
              control="input"
              size="md"
              register={register}
              name={`test.${index}.question`}
              placeholder="Enter question"
              label={"Question"}
              mb={"10px"}
            />
            <FormControl
              control="input"
              size="md"
              register={register}
              name={`test.${index}.answer`}
              placeholder="Enter answer"
              label={"Answer"}
            />
          </Box>
        );
      })}

      <Flex
        backgroundColor={sikaai_colors.white}
        padding={5}
        borderRadius={"8px"}
        mt={"10px"}
        align={"center"}
        gap={"4"}
      >
        <Box
          borderRadius={"full"}
          backgroundColor={sikaai_colors.primary_light}
          p={"2"}
          onClick={() => {
            append({
              question: "",
              answer: "",
            });
          }}
        >
          <PlusIcon />
        </Box>
        <Text fontSize={"sm"}>Add More</Text>
      </Flex>
      <Flex
        backgroundColor={sikaai_colors.white}
        padding={5}
        borderRadius={"8px"}
        mt={"10px"}
        align={"center"}
        gap={"4"}
        justifyContent={"flex-end"}
      >
        <Button variant="reset">Cancel</Button>
        <Button variant="primary" type="submit">
          Publish
        </Button>
      </Flex>
    </>
  );
};

export default CreateFAQ;
