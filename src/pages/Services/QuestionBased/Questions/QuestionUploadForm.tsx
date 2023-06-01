import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import { toastSuccess } from "@sikaai/service/service-toast";
import { useCreateQuestion } from "@sikaai/service/sikaai-question";
import { convertToBase64 } from "@sikaai/utils/index";
import httpStatus from "http-status";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { sikaai_colors } from "@sikaai/theme/color";
import Switch from "@sikaai/components/switch";
import SubQuestion from "./subQuestion";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import CKForm, { IdefaultForm } from "../QuestionCKform";

export const defaultValues = {
  question_text: "",
  question_image_base64: null as FileList | null,
  answer_text1: "" as null | string,
  answer_text2: "" as null | string,
  answer_text3: "" as null | string,
  answer_text4: "" as null | string,
  optionAImage: null as FileList | null,
  optionBImage: null as FileList | null,
  optionCImage: null as FileList | null,
  optionDImage: null as FileList | null,
  answer: "",
  description: "",
  image: null as FileList | null,
};

const questionSchema = Yup.object().shape(
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

const QuestionUploadForm = () => {
  const navigate = useNavigate();

  // Access optional params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parentId = queryParams.get("parentId");
  // end

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(questionSchema),
  });

  const {
    isOpen: isStatusOpen,
    onOpen: onStatusOpen,
    onClose: onStatusClose,
  } = useDisclosure();
  const { id: questionSetId = "" } = useParams();
  const { mutateAsync: createQuestion, isLoading } = useCreateQuestion();

  const toggleSwitch = () => {
    if (isStatusOpen) {
      onStatusClose();
    } else {
      onStatusOpen();
    }
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
        solution_image_base64: await convertToBase64(
          questionDetails?.image?.[0]
        ),
      },
    };

    const response = await createQuestion(requestBody);
    if (response.status === httpStatus.CREATED) {
      reset(defaultValues);
      toastSuccess("Question set created successful");
      navigate(`${NAVIGATION_ROUTES.VIEW_QUESTION_SET}/${questionSetId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box borderRadius={"8px"} p={3} bg={sikaai_colors.white}>
        <Flex
          direction={"column"}
          borderRadius={"8px"}
          p={3}
          gap={5}
          bg={sikaai_colors.white}
        >
          {!parentId && (
            <Box>
              <Flex gap={5}>
                <Text
                  fontWeight={600}
                  fontSize={"16px"}
                  color={sikaai_colors.primary}
                >
                  Description
                </Text>
                <Switch value={isStatusOpen} toggleSwitch={toggleSwitch} />
              </Flex>

              <Box>{isStatusOpen && <SubQuestion />}</Box>
            </Box>
          )}

          {!isStatusOpen &&
            (parentId ? (
              <SubQuestion />
            ) : (
              <>
                <CKForm
                  watch={watch as UseFormWatch<Partial<IdefaultForm>>}
                  errors={errors}
                  setValue={setValue as UseFormSetValue<Partial<IdefaultForm>>}
                  register={register as UseFormRegister<Partial<IdefaultForm>>}
                />

                {/* button */}
                <Box>
                  <Flex pt={3}>
                    <Spacer />
                    <Flex gap={4}>
                      <Button type="submit" isLoading={isLoading}>
                        Save
                      </Button>
                      <Button
                        variant={"reset"}
                        onClick={() => {
                          navigate(
                            `${NAVIGATION_ROUTES.VIEW_QUESTION_SET}/${questionSetId}`
                          );
                        }}
                      >
                        Cancel
                      </Button>
                      {/* <Button onClick={routeChange}>Finish</Button> */}
                    </Flex>
                  </Flex>
                </Box>
                {/* end */}
              </>
            ))}
        </Flex>
      </Box>
    </form>
  );
};
export default QuestionUploadForm;
