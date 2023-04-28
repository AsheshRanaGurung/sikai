// QUESTION SET === SUBJECT SET
import { Stack, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { toastSuccess } from "@sikaai/service/service-toast";
import {
  useCreateQuestionSet,
  useGetQuestionSet,
} from "@sikaai/service/sikaai-question";
import httpStatus from "http-status";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CellProps } from "react-table";

const QuestionSet = () => {
  const { register, handleSubmit } = useForm();
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
        Cell: () => {
          // const onEdit = () => {
          //   onModalOpen();
          // };
          const onShowQues = () => {
            navigate(NAVIGATION_ROUTES.CREATE_QUESTION_SET);
          };
          // const onDelete = () => {
          //   console.log("here");
          // };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                // onEdit={onEdit}
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

  // React queries
  const { mutateAsync: createQuestionSet } = useCreateQuestionSet();
  const { data: tableData = [], isFetching } = useGetQuestionSet();
  // React queries end

  const onSubmitHandler = async (questionSetDetails: any) => {
    const response = await createQuestionSet({
      ...questionSetDetails,
      subject_id: subjectId,
    });
    if (response.status === httpStatus.OK) {
      toastSuccess("Question set created successful");
    }
  };

  return (
    <>
      <div>
        <BreadCrumb
          title={{ name: "Services", route: `${NAVIGATION_ROUTES.SERVICES}` }}
          items={[
            {
              name: service,
              route: `${NAVIGATION_ROUTES.SERVICES}`,
            },
            {
              name: course,
              route: `${NAVIGATION_ROUTES.COURSES}/${encodedService}/${serviceId}`,
            },
            {
              name: subject,
              route: `${NAVIGATION_ROUTES.SUBJECTS}/${encodedService}/${serviceId}/${encodedCourse}/${courseId}`,
            },
          ]}
        />

        <DataTable
          // data={[
          //   {
          //     questionSet: "1234",
          //     status: "true",
          //     uploadDate: "123",
          //   },
          //   {
          //     questionSet: "1234",
          //     status: "true",
          //     uploadDate: "123",
          //   },
          // ]}
          data={tableData || []}
          loading={isFetching}
          columns={columns}
          btnText={"Create question Set"}
          onAction={onModalOpen}
          filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

        <ModalForm
          isModalOpen={isModalOpen}
          title={"Add question set"}
          closeModal={onModalClose}
          resetButttonText={"Cancel"}
          submitButtonText={"Upload"}
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
