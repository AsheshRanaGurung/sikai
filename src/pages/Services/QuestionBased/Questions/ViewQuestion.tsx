import { useGetQuestionSetById } from "@sikaai/service/sikaai-question";
import { useParams } from "react-router-dom";
import { QuestionAccordion1 } from "./QuestionAccordion1";

function ViewQuestion() {
  const { id: questionSetId = "" } = useParams();

  // react queries
  // const { data, isFetching } = useGetQuestionSetById({ id: "11" });
  const { data, isFetching } = useGetQuestionSetById({
    id: questionSetId,
  });
  // react queries end
  if (isFetching) {
    return <> loading ...</>;
  }

  if (!data) {
    return <> no questions found</>;
  }

  return (
    <>
      {data?.question?.map((questionDetails, index) => {
        return (
          <QuestionAccordion1
            key={questionDetails?.id}
            questionDetailsProp={questionDetails}
            index={index + 1}
          />
        );
      })}
    </>
  );
}

export default ViewQuestion;
