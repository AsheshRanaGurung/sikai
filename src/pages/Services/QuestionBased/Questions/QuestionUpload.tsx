import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { sikaai_colors } from "@sikaai/theme/color";
import { useNavigate, useParams } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import QuestionAccordion from "./QuestionAccordion";
import httpStatus from "http-status";
import { ExcelDownloadIcon } from "@sikaai/assets/svgs";
import { useDownloadExcelTemplate } from "@sikaai/service/sikaai-question";
import BulkUpload from "@sikaai/components/bulkUpload";

function Question() {
  const { id: questionSetId = "" } = useParams();

  // TODO loader
  const { mutateAsync: downloadExcelTemplate } = useDownloadExcelTemplate();

  const navigate = useNavigate();
  const routeChange = () => {
    navigate(`${NAVIGATION_ROUTES.SERVICES}`);
  };

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

        {/* cancel button */}
        <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3}>
          <Flex>
            <Spacer />
            <Flex gap={2}>
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
              <Button onClick={routeChange}>Finish</Button>
            </Flex>
          </Flex>
        </Box>
        {/* end */}
      </Flex>
    </>
  );
}

export default Question;
