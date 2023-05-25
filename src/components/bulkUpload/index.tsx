import { Button } from "@chakra-ui/react";
import { ExcelIcon } from "@sikaai/assets/svgs";
import { useBulkUpload } from "@sikaai/service/sikaai-question";
import httpStatus from "http-status";
import { useForm } from "react-hook-form";
import FormControl from "../form/FormControl";

const defaultValues = {
  csv_file: null as FileList | null,
};

const BulkUpload = ({ subject_set_id }: { subject_set_id: string }) => {
  const { handleSubmit, register } = useForm({ defaultValues });
  const { mutateAsync: bulkUpload, isLoading } = useBulkUpload();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onSubmitHandler({ csv_file: event.target.files });
    }
  };

  const onSubmitHandler = async (bulkData: typeof defaultValues) => {
    try {
      const response = await bulkUpload({
        csv_file: bulkData.csv_file?.[0] || null,
        subject_set_id,
      });
      if (response.status === httpStatus.CREATED) {
        console.log("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Button
        leftIcon={<ExcelIcon />}
        size="md"
        isLoading={isLoading}
        onClick={() => {
          const fileInput = document.getElementById(
            "upload-csv"
          ) as HTMLInputElement;
          fileInput.click();
        }}
      >
        Upload XSL File
      </Button>
      <FormControl
        id="upload-csv"
        label=""
        control="file"
        name="csv_file"
        register={register}
        display="none"
        onChange={handleFileInputChange}
      />
    </form>
  );
};

export default BulkUpload;
