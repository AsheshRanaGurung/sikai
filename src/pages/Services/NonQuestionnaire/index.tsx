import { Box, Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import {
  useCreateSubjects,
  useDeleteSubjects,
  useGetCourseSubjects,
  useUpdateCourseSubjects,
} from "@sikaai/service/service-itTraining";
import { useGetForm, useGetFormById } from "@sikaai/service/sikaai-form";
import { sikaai_colors } from "@sikaai/theme/color";
import httpStatus from "http-status";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CellProps } from "react-table";

const initialValue = {
  id: "",
  name: "",
  description: "",
  course_link: "",
  is_active: false,
};

const NonQuestionnaire = () => {
  const [editId, setEditId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
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
  const columnSubjects = [
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
      accessor: "course_link",
    },
    {
      Header: "Actions",
      Cell: ({ row }: CellProps<{ id: string }>) => {
        const onEdit = () => {
          setEditId(row.original.id?.toString());
          setIsEdit(true);
          onSubjectModalOpen();
        };
        const onDelete = () => {
          deleteSubjects(row.original.id);
        };
        return (
          <Stack alignItems={"flex-start"}>
            <TableActions onEdit={onEdit} onDelete={onDelete} />
          </Stack>
        );
      },
    },
  ];

  // React queries
  const { data: tableData = [], isLoading: tableDataLoading } = useGetForm({
    id: id,
  });
  const { data, isFetching } = useGetFormById({ id: modalId });
  const { data: subjectsData = [] } = useGetCourseSubjects();
  const { mutateAsync: updateSubjects } = useUpdateCourseSubjects();
  const { mutateAsync: createSubjects } = useCreateSubjects();
  const { mutateAsync: deleteSubjects } = useDeleteSubjects();
  // React queries end
  const { register, reset, handleSubmit } = useForm({
    defaultValues: initialValue,
  });

  const {
    isOpen: isSubjectModalOpen,
    onOpen: onSubjectModalOpen,
    onClose: onSubjectModalClose,
  } = useDisclosure();

  const onCloseHandler = () => {
    reset(initialValue);
    setEditId("");
    setIsEdit(false);
    onSubjectModalClose();
  };

  useEffect(() => {
    if (editId) {
      const findEditData = subjectsData?.find(item => item.id == +editId);
      reset({
        name: findEditData?.name,
        description: findEditData?.description,
        course_link: findEditData?.course_link,
      });
    }
  }, [editId]);

  const onEditHandler = async (data: typeof initialValue) => {
    const updateSubjectsResponse = await updateSubjects({
      ...data,
      id: editId,
    });
    if (updateSubjectsResponse?.status == httpStatus.OK) {
      onCloseHandler();
    }
  };

  const onCreateHandler = async (subjectDetails: typeof initialValue) => {
    const response = await createSubjects({ ...subjectDetails });
    if (response.status === httpStatus.CREATED) {
      onCloseHandler();
    }
  };

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
          data={subjectsData}
          columns={columnSubjects}
          btnText={"Add Subjects"}
          onAction={onSubjectModalOpen}
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
        <ModalForm
          title={isEdit ? "Edit" : "Add"}
          isModalOpen={isSubjectModalOpen}
          closeModal={onCloseHandler}
          resetButttonText={"Cancel"}
          submitButtonText={isEdit ? "Update" : "Create"}
          submitHandler={
            isEdit ? handleSubmit(onEditHandler) : handleSubmit(onCreateHandler)
          }
        >
          <FormControl
            register={register}
            control={"input"}
            size={"lg"}
            name={"name"}
            placeholder={"Enter subject name"}
            label={"Subject"}
            isRequired
          />
          <FormControl
            register={register}
            control={"textArea"}
            size={"lg"}
            name={"description"}
            placeholder={"Type here"}
            label={"Description"}
            isRequired
          />
          <FormControl
            register={register}
            control={"input"}
            size={"lg"}
            name={"course_link"}
            placeholder={"Enter the link"}
            label={"Link"}
            isRequired
          />
        </ModalForm>
      </Flex>
    </>
  );
};

export default NonQuestionnaire;
