import { Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import DropzoneComponent from "@sikaai/components/form/DropzoneComponent";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import {
  IAboutUs,
  IAboutUsMedia,
  useEditAboutUs,
  useFetchAboutUs,
  useGetVideoData,
  useUpdateVideoData,
} from "@sikaai/service/service-aboutUs";
import httpStatus from "http-status";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Cell } from "react-table";

const initialValue = {
  heading: "",
  sub_heading: "",
  description: "",
};
const initialValueMedia = {
  heading: "",
  video: "",
  description: "",
};

const AboutUs = () => {
  const { data: aboutUsData = [] } = useFetchAboutUs();
  const { data: videoData } = useGetVideoData();
  const { mutateAsync: editAboutUs, isLoading } = useEditAboutUs();
  const { mutateAsync: editVideoData, isLoading: isLoadingVideo } =
    useUpdateVideoData();

  const [editId, setEditId] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState<Blob[]>([]);
  const [editTable, setEditTable] = useState(false);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const { register, reset, handleSubmit } = useForm({
    defaultValues: initialValue,
  });
  const {
    register: registerMedia,
    reset: resetMedia,
    handleSubmit: handleSubmitMedia,
  } = useForm({
    defaultValues: initialValueMedia,
  });

  const onCloseHandler = () => {
    setEditId("");
    setEditTable(false);
    setPreviewVideo("");
    onModalClose();
  };

  useEffect(() => {
    if (editId && editTable) {
      const findEditData = aboutUsData?.find(
        item => item.id.toString() == editId
      );
      reset({
        heading: findEditData?.heading,
        sub_heading: findEditData?.sub_heading,
        description: findEditData?.description,
      });
    } else {
      const findEditMediaData = videoData?.find(
        item => item.id.toString() == editId
      );
      resetMedia({
        heading: findEditMediaData?.heading,

        description: findEditMediaData?.description,
      });
      setPreviewVideo(findEditMediaData?.video || "");
    }
  }, [editId, editTable]);

  const onSubmitHandler = async (data: typeof initialValue) => {
    const editAboutUsResponse = await editAboutUs({
      ...data,
      id: editId,
    });
    if (editAboutUsResponse?.status == httpStatus.OK) {
      onCloseHandler();
    }
  };

  const onSubmitMediaHandler = async (data: typeof initialValueMedia) => {
    const editVideoResponse = await editVideoData({
      ...data,
      video: acceptedFiles?.[0],
    });
    if (editVideoResponse?.status == httpStatus.OK) {
      onCloseHandler();
    }
  };

  const columns = [
    {
      Header: "Heading",
      accessor: "heading",
    },
    {
      Header: "Sub Heading",
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
          setEditTable(true);
          onModalOpen();
        };
        return (
          <Stack alignItems={"flex-start"}>
            <TableActions onEdit={onEdit} />
          </Stack>
        );
      },
    },
  ];

  const columnMedia = [
    {
      Header: "Heading",
      accessor: "heading",
    },

    {
      Header: "Video",
      accessor: "video",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Action",
      Cell: (cell: Cell<IAboutUsMedia>) => {
        return (
          <Stack alignItems={"flex-start"}>
            <TableActions
              onEdit={() => {
                setEditId(cell.row.original.id?.toString());
                onModalOpen();
              }}
            />
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <BreadCrumb
        items={[]}
        title={{ name: "About Us", route: `${NAVIGATION_ROUTES.ABOUT_US}` }}
      />
      <Flex flexDir={"column"} gap={10}>
        <DataTable columns={columnMedia} data={videoData ?? []} />
        <DataTable columns={columns} data={aboutUsData} />
      </Flex>

      <ModalForm
        isModalOpen={isModalOpen}
        title={"Edit"}
        closeModal={onCloseHandler}
        resetButttonText={"Cancel"}
        submitButtonText={"Update"}
        submitHandler={
          editTable
            ? handleSubmit(onSubmitHandler)
            : handleSubmitMedia(onSubmitMediaHandler)
        }
        isLoading={editTable ? isLoading : isLoadingVideo}
      >
        <FormControl
          control={"input"}
          size="lg"
          register={editTable ? register : registerMedia}
          name={"heading"}
          placeholder={"Enter heading"}
          label={"Heading"}
          isRequired
        />
        {editTable ? (
          <FormControl
            control={"input"}
            size="lg"
            register={register}
            name={"sub_heading"}
            placeholder={"Enter sub-heading"}
            label={"Sub Heading"}
            isRequired
          />
        ) : (
          <>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Video
            </Text>
            <DropzoneComponent
              setAcceptedFiles={setAcceptedFiles}
              helperText="Please Upload files of size smaller than 10MB"
              videoPreview={previewVideo}
              multiple
              accept={{ "video/*": [".mp4"] }}
            />
          </>
        )}
        <FormControl
          control={"textArea"}
          size={"lg"}
          register={editTable ? register : registerMedia}
          name={"description"}
          placeholder={"Type here"}
          label={"Description"}
          isRequired
        />
      </ModalForm>
    </>
  );
};

export default AboutUs;
