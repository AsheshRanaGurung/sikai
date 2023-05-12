// QUESTION SET === SUBJECT SET
import { Stack, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { toastSuccess } from "@sikaai/service/service-toast";
import {
  useCreateQuestionSet,
  useDeleteQuestionSet,
  useGetQuestionSet,
  useGetQuestionSetById,
  useUpdateQuestionSet,
} from "@sikaai/service/sikaai-question";
import httpStatus from "http-status";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CellProps } from "react-table";

const defaultValues = {
  name: "",
};

const QuestionSet = () => {
  const [isEdit, setEdit] = useState(false);
  const [questionSetId, setQuestionSetId] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
  });

  const navigate = useNavigate();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  // const {
  //   isOpen: isStatusOpen,
  //   onOpen: onStatusOpen,
  //   onClose: onStatusClose,
  // } = useDisclosure();

  const {
    service = "",
    serviceId = "",
    course = "",
    courseId = "",
    subject = "",
    subjectId = "",
  } = useParams();

  const encodedService = encodeURIComponent(service);
  const encodedCourse = encodeURIComponent(course);

  // React queries
  const { mutateAsync: createQuestionSet } = useCreateQuestionSet();
  const { data: tableData = [], isFetching } = useGetQuestionSet(subjectId);
  const { data: questionSet } = useGetQuestionSetById({ id: questionSetId });
  const { mutateAsync: updateQuestionSet } = useUpdateQuestionSet();
  const { mutateAsync: deleteQuestionSet } = useDeleteQuestionSet();
  // React queries end

  const columns = useMemo(
    () => [
      {
        Header: "Question Set",
        accessor: "name",
      },

      // {
      //   Header: "Status",
      //   Cell: () => {
      //     const toggleSwitch = () => {
      //       if (isStatusOpen) {
      //         onStatusClose();
      //       } else {
      //         onStatusOpen();
      //       }
      //     };
      //     return <Switch value={false} toggleSwitch={toggleSwitch} />;
      //   },
      // },
      {
        Header: "Upload Date",
        Cell: ({ row }: CellProps<{ created_at: string }>) => {
          const date = row.original?.created_at.substring(0, 10);
          return date;
        },
      },
      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setEdit(true);
            setQuestionSetId(row?.original?.id);
            onModalOpen();
          };
          const onShowQues = () => {
            navigate(
              `${NAVIGATION_ROUTES.CREATE_QUESTION_SET}/${row.original?.id}`
            );
          };
          const onDelete = () => {
            deleteQuestionSet({ id: row?.original?.id });
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                onEdit={onEdit}
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

  const onSubmitHandler = async (questionSetDetails: typeof defaultValues) => {
    if (isEdit) {
      const response = await updateQuestionSet({
        ...questionSetDetails,
        id: questionSetId,
      });
      if (response.status === httpStatus.OK) {
        reset(defaultValues);
        setEdit(false);
        setQuestionSetId("");
        onModalClose();
        toastSuccess("Question set updated successfuly");
      }
    } else {
      const response = await createQuestionSet({
        ...questionSetDetails,
        subject_id: subjectId,
      });
      if (response.status === httpStatus.OK) {
        reset(defaultValues);
        onModalClose();
        toastSuccess("Question set created successfuly");
      }
    }
  };

  useEffect(() => {
    if (isEdit && !!questionSetId) {
      reset({ ...defaultValues, name: questionSet?.name });
    }
  }, [questionSet]);

  return (
    <>
      <div>
        <BreadCrumb
          title={{ name: "Services", route: `${NAVIGATION_ROUTES.SERVICES}` }}
          items={[
            {
              name: service,
              route: `${NAVIGATION_ROUTES.COURSES}/${encodedService}/${serviceId}`,
            },
            {
              name: course,
              route: `${NAVIGATION_ROUTES.SUBJECTS}/${encodedService}/${serviceId}/${encodedCourse}/${courseId}`,
            },
            {
              name: subject,
              route: "",
            },
          ]}
        />

        <DataTable
          data={tableData || []}
          loading={isFetching}
          columns={columns}
          btnText={"Create question Set"}
          onAction={onModalOpen}
          // filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

        <ModalForm
          isModalOpen={isModalOpen}
          title={"Add question set"}
          closeModal={onModalClose}
          resetButttonText={"Cancel"}
          submitButtonText={"Create"}
          submitHandler={handleSubmit(onSubmitHandler)}
        >
          <FormControl
            control="input"
            size="lg"
            register={register}
            name="name"
            placeholder={"Service Name"}
            label={"Service Name"}
          />
        </ModalForm>
      </div>
    </>
  );
};

export default QuestionSet;
