import { Stack, useDisclosure, Text, Flex, Box } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import TableActions from "@sikaai/components/common/table/TableActions";
import { sikaai_colors } from "@sikaai/theme/color";
// import FormControl from "@sikaai/components/form/FormControl";
import { useMemo } from "react";
// import { useForm } from "react-hook-form";

const AbroadStudies = () => {
  // const { register } = useForm();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "College",
        accessor: "College",
      },
      {
        Header: "Date",
        accessor: "Date",
      },
      {
        Header: "Action",
        Cell: () => {
          const onView = () => {
            onModalOpen();
          };
          const onDelete = () => {
            console.log("here");
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onView={onView} onDelete={onDelete} />
            </Stack>
          );
        },
      },
    ],
    []
  );

  // React queries
  // React queries end

  return (
    <>
      <div>
        <BreadCrumb title={"Services"} items={[]} />

        <DataTable
          // data={tableData || []}
          data={[
            {
              advertisementBanner: "1234",
              advertisementLink: "link",
              status: "true",
              uploadDate: "123",
            },
            {
              advertisementBanner: "1234",
              advertisementLink: "link",
              status: "true",
              uploadDate: "123",
            },
          ]}
          // loading={tableDataFetching}
          columns={columns}
          filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

        {/* <ModalForm
          isModalOpen={isModalOpen}
          title={"Edit service"}
          closeModal={onModalClose}
          resetButttonText={"Cancel"}
          submitButtonText={"Upload"}
        >
          <>
            <FormControl
              control="input"
              size="lg"
              register={register}
              name="fullName"
              placeholder={"Full Name"}
              label={"Full Name"}
            />
            <FormControl
              control="input"
              size="lg"
              register={register}
              name="email"
              placeholder={"Email"}
              label={"Email"}
            />
            <FormControl
              control="input"
              size="lg"
              register={register}
              name="address"
              placeholder={"Address"}
              label={"Address"}
            />
            <FormControl
              control="input"
              size="lg"
              register={register}
              name="phoneNumber"
              placeholder={"Phone Number"}
              label={"Phone Number"}
            />
            <FormControl
              control="textArea"
              size="lg"
              register={register}
              name="college"
              placeholder={"College"}
              label={"College"}
            />
            <FormControl
              control="input"
              size="lg"
              register={register}
              name="link"
              placeholder={"Message"}
              label={"Message"}
            />
          </>
        </ModalForm> */}
        <ModalForm
          isModalOpen={isModalOpen}
          title={"User Details"}
          closeModal={onModalClose}
        >
          <>
            <Flex gap={5}>
              <Box>
                <Text fontWeight={600} fontSize={"16px"} mb={2}>
                  Full Name:
                </Text>
                <Text fontWeight={600} fontSize={"16px"} mb={2}>
                  Email:
                </Text>
                <Text fontWeight={600} fontSize={"16px"} mb={2}>
                  Address:
                </Text>
                <Text fontWeight={600} fontSize={"16px"} mb={2}>
                  Phone Number:
                </Text>
                <Text fontWeight={600} fontSize={"16px"} mb={2}>
                  College:
                </Text>
                <Text fontWeight={600} fontSize={"16px"}>
                  Message:
                </Text>
              </Box>
              <Box>
                <Text fontSize={"16px"} mb={2}>
                  Full Name
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  Email
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  Address
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  Phone Number
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  College
                </Text>
              </Box>
            </Flex>
            <Box border="1px" borderColor={sikaai_colors.gray} p={2}>
              <Text fontSize={"16px"}>Message</Text>
            </Box>
          </>
        </ModalForm>
      </div>
    </>
  );
};

export default AbroadStudies;
