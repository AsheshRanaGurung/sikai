import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LocationIcon } from "@sikaai/assets/svgs";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { sikaai_colors } from "@sikaai/theme/color";
import { useForm } from "react-hook-form";

import MapComponent from "./MapComponent";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import {
  useGetContact,
  useGetContactById,
  useUpdateContact,
} from "@sikaai/service/service-contactUs";
import { CellProps } from "react-table";
import { useEffect, useState } from "react";
import httpStatus from "http-status";

const defaultValues = {
  heading: "",
  description: "",
  created_at: "",
};

const ContactUs = () => {
  const [updateId, setUpdateId] = useState("");
  const { data: contactDetails = [], isFetching: tableDataFetching } =
    useGetContact();
  const { mutateAsync: updateContact } = useUpdateContact();
  const { data: contact } = useGetContactById(updateId);
  const {
    isOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
  });
  useEffect(() => {
    if (contact) {
      reset({
        ...defaultValues,
        heading: contact.heading,
        description: contact.description,
      });
    }
  }, [contact, updateId]);

  const columns = [
    {
      Header: "Heading",
      accessor: "heading",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Actions",
      Cell: ({
        row,
      }: CellProps<{ id: string; heading: string; description: string }>) => {
        const onEdit = () => {
          setUpdateId(row.original?.id);
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

  const onSubmit = async (contactDetails: typeof defaultValues) => {
    const response = await updateContact({ ...contactDetails, id: +updateId });

    if (response?.status === httpStatus.OK) {
      onModalClose();
      setUpdateId("");
      reset(defaultValues);
    }
  };

  return (
    <>
      <BreadCrumb
        items={[]}
        title={{ name: "Contact Us", route: `${NAVIGATION_ROUTES.CONTACT_US}` }}
      />
      <Box mb={5}>
        <Grid templateColumns="repeat(1, 4fr 2fr)" gap={6} marginTop={"20px"}>
          <GridItem
            w={"100%"}
            h={"400px"}
            borderRadius={"16px"}
            background={sikaai_colors.white}
            overflow={"hidden"}
          >
            <MapComponent latitude={27} longitude={85} />
          </GridItem>
          <GridItem
            w={"100%"}
            height="400px"
            borderRadius={"16px"}
            background={sikaai_colors.white}
            display={"flex"}
            flexDir={"column"}
            p={4}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "10px",
              }}
              // onSubmit={handleSubmit(onSubmitHandler)}
            >
              <Flex>
                <LocationIcon />
                <Text ml={4}>
                  Locate your address through Longitude and Latitude
                </Text>
              </Flex>
              <FormControl
                control="input"
                size="lg"
                register={register}
                name="longitude"
                label={"Longitude"}
                placeholder={"longitude"}
              />
              <FormControl
                control="input"
                size="lg"
                register={register}
                name="latitude"
                label={"Latitude"}
                placeholder={"latitude"}
              />
              <Flex justify={"flex-start"} gap={5}>
                <Button variant="primary" type="submit">
                  Save
                </Button>
                <Button variant="reset">Cancel</Button>
              </Flex>
            </form>
          </GridItem>
        </Grid>
      </Box>
      <DataTable
        data={contactDetails}
        columns={columns}
        loading={tableDataFetching}
      />
      <ModalForm
        isModalOpen={isOpen}
        title={"Edit"}
        closeModal={onModalClose}
        resetButttonText={"Cancel"}
        submitButtonText={"Edit"}
        submitHandler={handleSubmit(onSubmit)}
      >
        <>
          <FormControl
            control="input"
            size="lg"
            register={register}
            name="heading"
            placeholder={"heading"}
            label={"Heading"}
            isRequired
          />
          <FormControl
            control="textArea"
            size="lg"
            register={register}
            name="description"
            placeholder={"description"}
            label={"Description"}
            isRequired
          />
        </>
      </ModalForm>
    </>
  );
};
export default ContactUs;
