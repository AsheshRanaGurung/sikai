import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useGetQuestionSetById } from "@sikaai/service/sikaai-question";
import { sikaai_colors } from "@sikaai/theme/color";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionViewAccordion } from "./QuestionViewAccordion";
import parse from "html-react-parser";
import Spinner from "@sikaai/components/spinner";

function ViewQuestion() {
  const { id: questionSetId = "" } = useParams();
  const navigate = useNavigate();

  // react queries
  const { data, isFetching } = useGetQuestionSetById({
    id: questionSetId,
  });
  // react queries end

  if (isFetching) {
    return <Spinner />;
  }

  if (!data) {
    return <> no questions found</>;
  }

  // function customSort(a: any, b: any): number {
  //   // Sort by createdDate in ascending order
  //   if (a.createdDate < b.createdDate) {
  //     return -1;
  //   }
  //   if (a.createdDate > b.createdDate) {
  //     return 1;
  //   }

  //   // If parentid exists, group objects with the same parentid together
  //   if (a.parent?.id && b.parent?.id && a.parent?.id === b.parent?.id) {
  //     return 0;
  //   }

  //   return 0;
  // }

  // if (data) {
  //   data.question?.sort(customSort);
  // }

  return (
    <>
      {data?.question?.map((questionDetails, index) => {
        return (
          <>
            {/* addition of subquestion */}
            {questionDetails?.parent &&
              questionDetails?.id === questionDetails?.parent?.id + 1 && (
                <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3} mt={3}>
                  <Flex
                    gap={3}
                    alignItems={"center"}
                    onClick={() => {
                      const parentId = questionDetails.parent?.id;
                      navigate(
                        `${NAVIGATION_ROUTES.CREATE_QUESTION_SET}/${questionSetId}?parentId=${parentId}`
                      );
                    }}
                  >
                    <Button variant={"round"}>
                      <AddIcon />
                    </Button>
                    <Text>Add Sub Question</Text>
                  </Flex>
                </Box>
              )}
            {/* end */}
            {/* <QuestionViewAccordion
              key={questionDetails?.id}
              questionDetailsProp={questionDetails}
              index={index + 1}
              parentId={questionDetails?.parent?.id}
            /> */}
            <Box
              border={`1px solid ${sikaai_colors.gray_border}`}
              my={3}
              p={4}
              borderRadius={"8px"}
              bgColor={sikaai_colors.white}
              color={sikaai_colors.primary}
              fontWeight={600}
              fontSize={"16px"}
              onClick={() => {
                navigate(
                  `${NAVIGATION_ROUTES.VIEW_QUESTION}/questionSet/${questionSetId}/question/${questionDetails.id}`
                );
              }}
            >
              <HStack>
                <Text>{`${index + 1}.`}</Text>
                <Text>{parse(questionDetails?.question_text)}</Text>
              </HStack>
            </Box>
          </>
        );
      })}
      <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3} mt={2}>
        <Flex
          gap={3}
          alignItems={"center"}
          onClick={() => {
            navigate(
              `${NAVIGATION_ROUTES.CREATE_QUESTION_SET}/${questionSetId}`
            );
          }}
        >
          <Button variant={"round"}>
            <AddIcon />
          </Button>
          <Text>Add Question</Text>
        </Flex>
      </Box>
    </>
  );
}

export default ViewQuestion;
