import { Box, Button, Flex } from "@chakra-ui/react";

import FormControl from "@sikaai/components/form/FormControl";
import { IQuestion, useCreateQuestion } from "@sikaai/service/sikaai-question";
import { convertToBase64 } from "@sikaai/utils/index";
import httpStatus from "http-status";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import CKForm, { IdefaultForm } from "../QuestionCKform";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";
import { defaultValues as subDefaultVAlues } from "./QuestionUploadForm";

interface IQuestionDetails {
  parent_content?: string;
  question_text: string;
  question_image_base64: FileList | null;
  answer_text1: string | null;
  answer_text2: string | null;
  answer_text3: string | null;
  answer_text4: string | null;
  optionAImage: FileList | null;
  optionBImage: FileList | null;
  optionCImage: FileList | null;
  optionDImage: FileList | null;
  answer: string;
  description: string;
  image: FileList | null;
}

const subQuestionSchema = Yup.object().shape(
  {
    parent_content: Yup.string().required("This field is required"),

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
const MyComponent = () => {
  const defaultValues = {
    parent_content: "",
    ...subDefaultVAlues,
  };
  console.log(defaultValues, "defaultValues");
  const { mutateAsync: createQuestion, isLoading } = useCreateQuestion();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(subQuestionSchema),
  });
  const { id: questionSetId = "" } = useParams();

  // Access optional params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parentId = queryParams.get("parentId");
  // end

  const onSubmitHandler = async (questionDetails: IQuestionDetails) => {
    let requestBody: IQuestion = {
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

    if (questionDetails.parent_content) {
      requestBody = {
        ...requestBody,
        parent_content: questionDetails.parent_content ?? null,
      };
    }

    const response = await createQuestion(
      parentId ? { ...requestBody, parent_id: +parentId } : requestBody
    );

    if (response.status === httpStatus.CREATED) {
      console.log("navigation to view page");
    }
  };

  return (
    <>
      {/* TODO: check this */}
      {/* <form onSubmit={handleSubmit(onSubmitHandler)}> */}
      <form>
        <Flex direction={"column"} gap={5}>
          {!parentId && (
            <FormControl
              control="textArea"
              register={register}
              label="Description"
              name={`parent_content`}
              placeholder="  description"
              error={errors?.parent_content?.message || ""}
            />
          )}
          <>
            <CKForm
              watch={watch as UseFormWatch<Partial<IdefaultForm>>}
              errors={errors}
              setValue={setValue as UseFormSetValue<Partial<IdefaultForm>>}
              register={register as UseFormRegister<Partial<IdefaultForm>>}
            />
            <Button
              onClick={handleSubmit(onSubmitHandler)}
              isLoading={isLoading}
            >
              Save
            </Button>
          </>
        </Flex>
      </form>
    </>
  );
};

function SubQuestion() {
  return (
    <Box borderRadius={"8px"}>
      <MyComponent />;
    </Box>
  );
}

export default SubQuestion;
