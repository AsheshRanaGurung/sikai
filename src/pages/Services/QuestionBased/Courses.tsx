import {
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import {
  useGetCourse,
  useGetCourseById,
  useUpdateCourse,
} from "@sikaai/service/sikaai-course";
import { sikaai_colors } from "@sikaai/theme/color";
import httpStatus from "http-status";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CellProps } from "react-table";

const defaultValues = {
  courseName: "",
  description: "",
  totalQuestions: 0,
  negativeMarking: "",
  timer: "",
};

const Courses = () => {
  const [courseId, setCourseId] = useState("");
  const [edit, setEdit] = useState(false);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const navigate = useNavigate();

  const { register, reset, handleSubmit } = useForm({
    defaultValues: defaultValues,
  });

  // For customized breadcrumb
  const { service = "", serviceId = "" } = useParams();
  const decodedService = decodeURIComponent(service);
  const encodedService = encodeURIComponent(service);
  //

  // react queries
  const { data: tableData = [], isFetching } = useGetCourse(serviceId);
  const { data: course } = useGetCourseById(courseId);
  const { mutateAsync: createCourse } = useUpdateCourse();
  // react queries end

  const columns = useMemo(
    () => [
      { Header: "Services", accessor: "name" },
      { Header: "Description", accessor: "description" },
      { Header: "Total Marks", accessor: "course_info.total_questions" },
      { Header: "Negative Marking", accessor: "course_info.deduction_mark" },
      { Header: "Timer", accessor: "course_info.time_limit" },
      {
        Header: "Created Date",
        Cell: ({ row }: CellProps<{ created_at: string }>) => {
          const date = row.original?.created_at.substring(0, 10);
          return date;
        },
      },
      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ name: string; id: string }>) => {
          const encodedName = encodeURIComponent(row.original?.name);
          const onEdit = () => {
            setCourseId(row.original?.id);
            setEdit(true);
            onModalOpen();
          };
          // const onDelete = () => {
          //   console.log("here");
          // };
          const onSetting = () => {
            navigate(
              `${NAVIGATION_ROUTES.SUBJECTS}/${encodedService}/${serviceId}/${encodedName}/${row.original.id}`
            );
          };
          const onShowQues = () => {
            navigate(
              `${NAVIGATION_ROUTES.MODEL_SET}/${encodedService}/${serviceId}/${encodedName}/${row.original?.id}`
            );
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                onEdit={onEdit}
                onSetting={onSetting}
                onShowQues={onShowQues}
                // onDelete={onDelete}
              />
            </Stack>
          );
        },
      },
    ],
    []
  );

  const onSubmitHandler = async (courseDetails: typeof defaultValues) => {
    const data = {
      id: courseId,
      name: courseDetails.courseName,
      description: courseDetails.description,
      course_info: {
        deduction_mark: courseDetails.negativeMarking,
        time_limit: courseDetails.timer,
        total_questions: courseDetails.totalQuestions,
      },
    };
    const response = await createCourse(data);
    try {
      if (response.status === httpStatus.OK) {
        setEdit(false);
        setCourseId("");
        onModalClose();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (course) {
      reset({
        ...defaultValues,
        courseName: course?.name,
        description: course?.description,
        totalQuestions: course?.course_info?.total_questions,
        negativeMarking: course?.course_info?.deduction_mark,
        timer: course?.course_info?.time_limit,
      });
    }
  }, [course]);

  return (
    <>
      <BreadCrumb
        title={{ name: "Services", route: `${NAVIGATION_ROUTES.SERVICES}` }}
        items={[
          {
            name: decodedService || "",
            route: "",
          },
        ]}
      />
      <DataTable
        columns={columns}
        data={tableData || []}
        loading={isFetching}
        // btnText={"Add new course"}
        // onAction={onModalOpen}
      />
      <ModalForm
        title={"Edit new course"}
        isModalOpen={isModalOpen}
        closeModal={onModalClose}
        resetButttonText={"Cancel"}
        submitHandler={handleSubmit(onSubmitHandler)}
        submitButtonText={edit ? "Update" : "Add"}
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem>
            <FormControl
              control="input"
              type="number"
              name="totalQuestions"
              register={register}
              label={"Total Questions"}
              placeholder={"total questions"}
              color={sikaai_colors.primary}
            />
          </GridItem>
          <GridItem>
            <FormControl
              control="input"
              type="number"
              name="negativeMarking"
              register={register}
              label={"Negative Marking"}
              placeholder={"negative marking"}
              color={sikaai_colors.primary}
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
                color={sikaai_colors.primary}
              />
              <Text mt={9} fontWeight={400} fontSize={"14px"}>
                Minutes
              </Text>
            </Flex>
          </GridItem>
          <GridItem></GridItem>
        </Grid>
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
      </ModalForm>
    </>
  );
};

export default Courses;
