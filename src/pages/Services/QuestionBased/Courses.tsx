import {
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useGetCourse } from "@sikaai/service/sikaai-course";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CellProps } from "react-table";

const Courses = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const navigate = useNavigate();
  const { register } = useForm();

  // react queries
  const { data: tableData = [], isLoading } = useGetCourse();
  // react queries end

  const columns = useMemo(
    () => [
      { Header: "Services", accessor: "name" },
      { Header: "Description", accessor: "description" },
      { Header: "Timer", accessor: "timer" },
      { Header: "Negative Marking", accessor: "negMarking" },
      {
        Header: "Created Date",
        Cell: ({ row }: CellProps<{ created_at: string }>) => {
          const date = row.original?.created_at.substring(0, 10);
          return date;
        },
      },
      {
        Header: "Action",
        Cell: () => {
          const onEdit = () => {
            onModalOpen();
          };
          const onDelete = () => {
            console.log("here");
          };
          const onSetting = () => {
            navigate(`${NAVIGATION_ROUTES.SUBJECTS}`);
          };
          const onShowQues = () => {
            console.log("here");
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                onEdit={onEdit}
                onSetting={onSetting}
                onShowQues={onShowQues}
                onDelete={onDelete}
              />
            </Stack>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <DataTable
        columns={columns}
        data={tableData || []}
        loading={isLoading}
        btnText={"Add new course"}
        onAction={onModalOpen}
      />
      <ModalForm
        title={"Add new course"}
        isModalOpen={isModalOpen}
        closeModal={onModalClose}
        resetButttonText={"Cancel"}
        submitButtonText={"Add"}
      >
        <FormControl
          control="input"
          type="text"
          name="courseName"
          register={register}
          label={"Course Name"}
          placeholder={"course name"}
        />
        <FormControl
          control="input"
          type="text"
          name="description"
          register={register}
          label={"Description"}
          placeholder={"description"}
        />
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem>
            <FormControl
              control="input"
              type="number"
              name="negativeMarking"
              register={register}
              label={"Negative Marking"}
              placeholder={"negative marking"}
              size={"lg"}
            />
          </GridItem>
          <GridItem>
            <Flex alignItems={"center"} gap={2}>
              <FormControl
                control="input"
                type="number"
                name="timer"
                register={register}
                label={"Set Timer"}
                placeholder={"set timer"}
                size={"lg"}
              />
              <Text mt={9} fontWeight={400} fontSize={"14px"}>
                Minutes
              </Text>
            </Flex>
          </GridItem>
          <GridItem></GridItem>
        </Grid>
      </ModalForm>
    </>
  );
};

export default Courses;
