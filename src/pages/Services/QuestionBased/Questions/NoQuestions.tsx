import { Box, Flex, Text } from "@chakra-ui/react";
import { ExcelDownloadIcon, NoDataIcon } from "@sikaai/assets/svgs";
import BulkUpload from "@sikaai/components/bulkUpload";
import { useDownloadExcelTemplate } from "@sikaai/service/sikaai-question";
import { sikaai_colors } from "@sikaai/theme/color";
import httpStatus from "http-status";

const NoQuestions = ({ questionSetId }: { questionSetId: string }) => {
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
      <Flex gap={2} onClick={onDownloadExcelTemplate}>
        <ExcelDownloadIcon />
        <Text color={sikaai_colors.primary} fontWeight={600}>
          Excel Template
        </Text>
      </Flex>
      <BulkUpload subject_set_id={questionSetId} />
      <Box bgColor={sikaai_colors.white}>
        <NoDataIcon />
      </Box>
    </>
  );
};

export default NoQuestions;
