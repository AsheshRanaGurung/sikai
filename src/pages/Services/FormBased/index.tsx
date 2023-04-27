import { Stack, useDisclosure, Text, Flex, Box } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import TableActions from "@sikaai/components/common/table/TableActions";
import { useGetForm, useGetFormById } from "@sikaai/service/sikaai-form";
import { sikaai_colors } from "@sikaai/theme/color";
// import FormControl from "@sikaai/components/form/FormControl";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CellProps } from "react-table";
// import { useForm } from "react-hook-form";

const FormBased = () => {
  const { id = "" } = useParams();
  // const { register } = useForm();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const [modalId, setModalId] = useState("");
  const columns = useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "full_name",
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
        accessor: "phone_number",
      },
      {
        Header: "College",
        accessor: "college",
      },
      {
        Header: "Date",
        Cell: ({ row }: CellProps<{ created_at: string }>) => {
          const date = row.original?.created_at.substring(0, 10);
          return date;
        },
      },
      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string }>) => {
          const onView = () => {
            setModalId(row.original?.id);
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
  const { data: tableData = [], isLoading: tableDataLoading } = useGetForm({
    id: id,
  });
  const { data = [] } = useGetFormById({ id: modalId });
  // React queries end

  return (
    <>
      <div>
        <BreadCrumb title={"Services"} items={[]} />

        <DataTable
          data={tableData || []}
          loading={tableDataLoading}
          columns={columns}
          filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

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
                  {data[0]?.full_name}
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  {data[0]?.email}
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  {data[0]?.address}
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  {data[0]?.phone_number}
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  {data[0]?.college}
                </Text>
              </Box>
            </Flex>
            <Box border="1px" borderColor={sikaai_colors.gray} p={2}>
              <Text fontSize={"16px"}>{data[0]?.content}</Text>
            </Box>
          </>
        </ModalForm>
      </div>
    </>
  );
};

export default FormBased;