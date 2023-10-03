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
import Skeleton from "@sikaai/components/skeleton";
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
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  courseName: "",
  description: "",
  totalQuestions: 0,
  negativeMarking: "",
  timer: 0,
};

const vaidationSchema = Yup.object({
  courseName: Yup.string().required("Course Name is required"),
  description: Yup.string().required("Description is required"),
  totalQuestions: Yup.number()
    .required("Total questions is required")
    .typeError("Enter valid number."),
  negativeMarking: Yup.number()
    .required("Negative marking is required")
    .typeError("Enter valid number."),
  timer: Yup.number()
    .required("Value for timer is required")
    .typeError("Enter valid number."),
});

const Courses = () => {
  const [courseId, setCourseId] = useState("");
  const [edit, setEdit] = useState(false);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(vaidationSchema),
  });

  // For customized breadcrumb
  const { service = "", serviceId = "" } = useParams();
  const decodedService = decodeURIComponent(service);
  const encodedService = encodeURIComponent(service);
  //

  // react queries
  const { data: tableData = [], isFetching } = useGetCourse(serviceId);
  const { data: course, isFetching: isFetchingCourse } =
    useGetCourseById(courseId);
  const { mutateAsync: createCourse, isLoading: isUpdatingCourse } =
    useUpdateCourse();
  // react queries end

  const columns = useMemo(
    () => [
<<<<<<< Updated upstream:src/pages/Services/QuestionBased/Courses.tsx
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
=======
      {
        header: "S.N",
        accessorFn: (_cell, index: number) => {
          return index + 1;
        },
      },
      {
        header: "Name",
        accessorKey: "name",
        accessorFn: (_cell: Idata) => {
          return _cell?.user?.name;
>>>>>>> Stashed changes:src/pages/Services/QuestionBased/Courses/index.tsx
        },
      },
      {
        header: "Are you cool?",
        cell: ({
          row,
        }: CellContext<
          {
            coolness: boolean;
          },
          any
        >) => {
          return <p>{coolness}</p>;
        },
      },
    ],
    []
  );

<<<<<<< Updated upstream:src/pages/Services/QuestionBased/Courses.tsx
  const onSubmitHandler = async (courseDetails: typeof defaultValues) => {
    const data = {
      id: courseId,
      name: courseDetails?.courseName,
      description: courseDetails?.description,
      course_info: {
        deduction_mark: courseDetails?.negativeMarking,
        // TODO: check backend request body
        time_limit: courseDetails?.timer.toString(),
        total_questions: courseDetails?.totalQuestions,
      },
    };
    const response = await createCourse(data);
    try {
      if (response?.status === httpStatus.OK) {
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
        timer: +course?.course_info?.time_limit_in_seconds / 60,
      });
    }
  }, [course, edit]);

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
        isLoading={isUpdatingCourse}
        title={"Edit new course"}
        isModalOpen={isModalOpen}
        closeModal={() => {
          reset(defaultValues);
          setEdit(false);
          onModalClose();
        }}
        resetButttonText={"Cancel"}
        submitHandler={handleSubmit(onSubmitHandler)}
        submitButtonText={edit ? "Update" : "Add"}
      >
        {isFetchingCourse ? (
          <Skeleton count={4} height={"40px"} />
        ) : (
          <>
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
                  error={errors?.totalQuestions?.message ?? ""}
                />
              </GridItem>
              <GridItem>
                <FormControl
                  control="input"
                  type="number"
                  name="negativeMarking"
                  steps={0.1}
                  register={register}
                  label={"Negative Marking"}
                  placeholder={"negative marking"}
                  color={sikaai_colors.primary}
                  error={errors?.negativeMarking?.message ?? ""}
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
                    error={errors?.timer?.message ?? ""}
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
              error={errors?.courseName?.message ?? ""}
            />
            <FormControl
              control="textArea"
              type="text"
              name="description"
              register={register}
              label={"Description"}
              placeholder={"description"}
              error={errors?.description?.message ?? ""}
            />
          </>
        )}
      </ModalForm>
    </>
  );
=======
  return <DataTable columns={columns} data={tableData || []} />;
>>>>>>> Stashed changes:src/pages/Services/QuestionBased/Courses/index.tsx
};

export default Courses;
