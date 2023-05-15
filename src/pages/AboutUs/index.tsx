import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import DropzoneComponent from "@sikaai/components/form/DropzoneComponent";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import {
  IAboutUs,
  useEditAboutUs,
  useFetchAboutUs,
  useSaveVideo,
} from "@sikaai/service/service-aboutUs";
import { toastSuccess } from "@sikaai/service/service-toast";
import httpStatus from "http-status";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Cell } from "react-table";

const initialValue = {
  heading: "",
  sub_heading: "",
  description: "",
};

const AboutUs = () => {
  const [editId, setEditId] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState<Blob[]>([]);
  const [file, setFile] = useState<File | undefined>(undefined);

  // react queries
  const { data: aboutUsData = [] } = useFetchAboutUs();
  const { mutateAsync: editAboutUs, isLoading: isUpdating } = useEditAboutUs();
  const { mutateAsync: createVideo, isLoading: isCreatingVideo } =
    useSaveVideo();
  // react queries end

  const { onOpen, isOpen, onClose } = useDisclosure();

  const { register, reset, handleSubmit } = useForm({
    defaultValues: initialValue,
  });

  const onCloseHandler = () => {
    onClose();
    reset(initialValue);
  };

  const onSubmitHandler = async (data: typeof initialValue) => {
    try {
      const editAboutUsResponse = await editAboutUs({ ...data, id: editId });

      if (editAboutUsResponse?.status == httpStatus.OK) {
        toastSuccess("Updated successfuly");
        onCloseHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editId) {
      const findEditData = aboutUsData?.find(
        item => item.id.toString() == editId
      );

      reset({
        heading: findEditData?.heading,
        sub_heading: findEditData?.sub_heading,
        description: findEditData?.description,
      });
    }
  }, [editId]);

  useEffect(() => {
    if (acceptedFiles) {
      const intoFile = new File([acceptedFiles[0]], "video");
      setFile(intoFile);
    }
  }, [acceptedFiles]);

  const columns = [
    {
      Header: "SN",
      Cell: (cell: Cell<IAboutUs>) => {
        return <Text>{cell.row.index + 1}</Text>;
      },
    },
    {
      Header: "Created Date",
      Cell: (cell: Cell<IAboutUs>) => {
        return <Text>{cell.row.original.created_at.slice(0, 10)}</Text>;
      },
    },
    { Header: "Heading", accessor: "heading" },
    {
      Header: "Sub-heading",
      accessor: "sub_heading",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Action",
      Cell: (cell: Cell<IAboutUs>) => {
        const onEdit = () => {
          setEditId(cell.row.original.id?.toString());
          onOpen();
        };

        return (
          <Stack alignItems={"flex-start"}>
            <TableActions onEdit={onEdit} />
          </Stack>
        );
      },
    },
  ];

  const onVideUpload = async () => {
    try {
      const saveVideoResponse = await createVideo({ video: file });
      if (saveVideoResponse?.status == httpStatus.OK) {
        toastSuccess("video saved");
        setAcceptedFiles([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <BreadCrumb
        items={[]}
        title={{ name: "About Us", route: `${NAVIGATION_ROUTES.ABOUT_US}` }}
      />
      <Box marginY={5} height={240} width={"100%"}>
        <DropzoneComponent
          setAcceptedFiles={setAcceptedFiles}
          helperText="Please Upload Files of size smaller than 10MB"
          multiple
          accept={{
            // "application/pdf": [".pdf"],
            // "image/png": [".png", ".jpeg", ".jpg"],
            "video/*": [".mp4"],
          }}
        />
      </Box>
      {/* TODO: change this button */}
      <Button
        width={"100%"}
        onClick={onVideUpload}
        marginY={5}
        isLoading={isCreatingVideo}
      >
        Upload Video
      </Button>
      <DataTable data={aboutUsData ?? []} columns={columns} />
      <ModalForm
        isLoading={isUpdating}
        isModalOpen={isOpen}
        title={"Edit About Us"}
        closeModal={onCloseHandler}
        resetButttonText={"Cancel"}
        submitButtonText={"Update"}
        submitHandler={handleSubmit(onSubmitHandler)}
      >
        <FormControl
          control="input"
          size="lg"
          register={register}
          name="heading"
          placeholder={"Enter Heading"}
          label={"Heading"}
          isRequired
        />
        <FormControl
          control="input"
          size="lg"
          register={register}
          name="sub_heading"
          placeholder={"Enter Sub Heading"}
          label={"Sub Heading"}
          isRequired
        />
        <FormControl
          control="textArea"
          size="lg"
          register={register}
          name="description"
          placeholder={"Type Description"}
          label={"Answer"}
          isRequired
        />
      </ModalForm>
    </>
  );
};

export default AboutUs;
