import { Button, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import QuestionAccordion from "./QuestionAccordion";
import httpStatus from "http-status";
import { ExcelDownloadIcon } from "@sikaai/assets/svgs";
import { useDownloadExcelTemplate } from "@sikaai/service/sikaai-question";
import BulkUpload from "@sikaai/components/bulkUpload";

function Question() {
  const { id: questionSetId = "" } = useParams();

  // TODO loader
  const { mutateAsync: downloadExcelTemplate } = useDownloadExcelTemplate();

  const onDownloadExcelTemplate = async () => {
    const response: any = await downloadExcelTemplate();

    if (response?.status === httpStatus.OK) {
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "question.csv");
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <>
      {/* bulk upload */}
      <Flex gap={3} mb={4}>
        <BulkUpload subject_set_id={questionSetId} />
        <Button
          leftIcon={<ExcelDownloadIcon />}
          variant={"primaryOutline"}
          onClick={onDownloadExcelTemplate}
          size={"md"}
        >
          Excel Template
        </Button>
      </Flex>
      {/* bulk upload end */}

      <Flex direction={"column"} gap={3}>
        <QuestionAccordion />
      </Flex>
    </>
  );
}

export default Question;
