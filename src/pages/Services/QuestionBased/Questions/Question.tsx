import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { sikaai_colors } from "@sikaai/theme/color";
import { useNavigate, useParams } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useState } from "react";
import QuestionAccordion from "./QuestionAccordion";
import httpStatus from "http-status";
import { ExcelDownloadIcon } from "@sikaai/assets/svgs";
import { useDownloadExcelTemplate } from "@sikaai/service/sikaai-question";
import BulkUpload from "@sikaai/components/bulkUpload";

function Question() {
  const [clickCount, setClickCount] = useState(0);
  const { id: questionSetId = "" } = useParams();
  // TODO loader
  const { mutateAsync: downloadExcelTemplate } = useDownloadExcelTemplate();

  const navigate = useNavigate();
  const routeChange = () => {
    navigate(`${NAVIGATION_ROUTES.SERVICES}`);
  };

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  const myComponents = Array.from({ length: clickCount }, (_, i) => (
    <Box borderRadius={"8px"} p={1} key={i}>
      <QuestionAccordion />
    </Box>
  ));

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
      <Flex gap={2} onClick={onDownloadExcelTemplate}>
        <ExcelDownloadIcon />
        <Text color={sikaai_colors.primary} fontWeight={600}>
          Excel Template
        </Text>
      </Flex>
      <BulkUpload subject_set_id={questionSetId} />
      <Flex direction={"column"} gap={4}>
        <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3}>
          {myComponents}
        </Box>
        <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3}>
          <Flex gap={3} alignItems={"center"}>
            <Button variant={"round"} onClick={handleClick}>
              <AddIcon />
            </Button>
            <Text>Add Question</Text>
          </Flex>
        </Box>

        <Box bg={sikaai_colors.white} borderRadius={"8px"} p={3}>
          <Flex>
            <Spacer />
            <Flex gap={2}>
              <Button variant={"reset"}>Cancel</Button>
              <Button onClick={routeChange}>Finish</Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default Question;
