import { Box, Stack, Text, useDisclosure } from "@chakra-ui/react";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import DropzoneComponent from "@sikaai/components/form/DropzoneComponent/DropzoneComponent";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { IAboutUs, useFetchAboutUs } from "@sikaai/service/service-aboutUs";
import { useState } from "react";
import { Cell } from "react-table";

const AboutUs = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<Blob[]>([]);

  const { data: aboutUsData } = useFetchAboutUs();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const columns = [
    {
      Header: "SN",
      Cell: (cell: Cell<IAboutUs>) => {
        return <Text>{cell.row.index + 1}</Text>;
      },
    },
    { Header: "Content", accessor: "content" },
    {
      Header: "Action",
      Cell: () => {
        const onEdit = () => {
          onOpen();
        };
        const onDelete = () => {
          console.log("here");
        };
        return (
          <Stack alignItems={"flex-start"}>
            <TableActions onEdit={onEdit} onDelete={onDelete} />
          </Stack>
        );
      },
    },
  ];
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
      <DataTable data={aboutUsData ?? []} columns={columns} />
      <ModalForm
        isModalOpen={isOpen}
        title={"Add About Us"}
        closeModal={onClose}
        resetButttonText={"Cancel"}
        submitButtonText={"Update"}
      ></ModalForm>
    </>
  );
};

export default AboutUs;
