import { Box, Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import TableActions from "@sikaai/components/common/table/TableActions";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useGetForm, useGetFormById } from "@sikaai/service/sikaai-form";
import { useGetServiceCourse } from "@sikaai/service/sikaai-services";
import { sikaai_colors } from "@sikaai/theme/color";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CellProps } from "react-table";

const NonQuestionnaire = () => {
  const { id = "", service = "" } = useParams();

  // For customized breadcrumb
  const decodedService = decodeURIComponent(service);
  //

  const [modalId, setModalId] = useState("");
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  // TODO: sidebar can be refactored
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

  const subjectColumns = useMemo(
    () => [
      {
        Header: "Subjects",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Link",
        accessor: "link",
      },
      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setModalId(row.original?.id);
            onModalOpen();
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
    ],
    []
  );

  // React queries
  const { data: tableData = [], isLoading: tableDataLoading } = useGetForm({
    id: id,
  });
  const { data, isFetching } = useGetFormById({ id: modalId });
  const { data: serviceCourse, isFetching: serviceCourseLoading } =
    useGetServiceCourse({ serviceId: id });
  // React queries end

  return (
    <>
      <BreadCrumb
        title={{ name: "Services", route: `${NAVIGATION_ROUTES.SERVICES}` }}
        items={[
          {
            name: decodedService,
            route: `${NAVIGATION_ROUTES.NON_QUESTIONNAIRE}/${decodedService}/${id}`,
          },
        ]}
      />
      <Text
        color={sikaai_colors.primary}
        fontWeight={600}
        fontSize={"16px"}
        mb={3}
      >
        Subjects
      </Text>
      <Flex direction={"column"} gap={5}>
        <DataTable
          data={serviceCourse || []}
          columns={subjectColumns}
          loading={serviceCourseLoading}
        />
        {/* <Box mt={5}> */}
        <DataTable
          data={tableData || []}
          loading={tableDataLoading}
          columns={columns}
          filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />
        {/* </Box> */}

        <ModalForm
          isLoading={isFetching}
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
                  {data?.full_name}
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  {data?.email}
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  {data?.address}
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  {data?.phone_number}
                </Text>
                <Text fontSize={"16px"} mb={2}>
                  {data?.college}
                </Text>
              </Box>
            </Flex>
            <Box border="1px" borderColor={sikaai_colors.gray} p={2}>
              <Text fontSize={"16px"}>{data?.content}</Text>
            </Box>
          </>
        </ModalForm>
      </Flex>
    </>
  );
};

export default NonQuestionnaire;
