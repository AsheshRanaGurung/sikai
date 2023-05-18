import { useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ModelSet = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const { register, handleSubmit } = useForm();

  const {
    service = "",
    serviceId = "",
    course = "",
    courseId = "",
  } = useParams();

  const encodedService = encodeURIComponent(service);
  const encodedCourse = encodeURIComponent(course);

  // react queries
  // const {data: subjects, isFetching} = useGetSubjects({courseId});
  // const subjectLength = subjects && subjects.length;
  // for (let i=0; i<subjectLength; i++) {

  //   const {data: subjectSet, isFetching: isFetchingSubjectSet} = useGetQuestionSet({subjectId})
  // }
  // react queries end

  const onSubmitHandler = (data: any, e: any) => {
    console.log(data);
    e.preventDefault();
  };

  const columns = useMemo(
    () => [
      { Header: "Question Set", accessor: "questionSet" },
      { Header: "Status", accessor: "status" },
      { Header: "Upload Date", accessor: "uploadDate" },
      {
        Header: "Action",
        Cell: () => {
          const onEdit = () => {
            console.log("edit");
          };
          const onDelete = () => {
            console.log("delete");
          };
          return <TableActions onEdit={onEdit} onDelete={onDelete} />;
        },
      },
    ],
    []
  );

  return (
    <>
      <BreadCrumb
        title={{ name: "Services", route: `${NAVIGATION_ROUTES.SERVICES}` }}
        items={[
          {
            name: service,
            route: `${NAVIGATION_ROUTES.COURSES}/${encodedService}/${serviceId}`,
          },
          {
            name: course,
            route: `${NAVIGATION_ROUTES.MODEL_SET}/${encodedService}/${serviceId}/${encodedCourse}/${courseId}`,
          },
        ]}
      />
      <DataTable
        columns={columns}
        data={[]}
        btnText={"Create New Model Set"}
        onAction={onModalOpen}
      />

      <ModalForm
        title={"Create Question Set"}
        isModalOpen={isModalOpen}
        closeModal={onModalClose}
        resetButttonText={"Cancel"}
        submitButtonText={"Create"}
        submitHandler={handleSubmit(onSubmitHandler)}
      >
        <FormControl
          control="input"
          label={"Model Question Set Name"}
          name={"modelQuestionSetName"}
          placeholder={"Name of model set"}
          register={register}
        />
        <FormControl
          control="select"
          options={[]}
          label={"Choose among Verbal Ability"}
          name={"verbalAbility"}
          placeholder={"Choose question set"}
          register={register}
        />
        <FormControl
          control="select"
          options={[]}
          label={"Choose among Quantitative Ability"}
          name={"quantitiveAbility"}
          placeholder={"Choose question set"}
          register={register}
        />
        <FormControl
          control="select"
          options={[]}
          label={"Choose among Logical Reasoning"}
          name={"logicalReasoning"}
          placeholder={"Choose question set"}
          register={register}
        />
        <FormControl
          control="select"
          options={[]}
          label={"Choose among General Awareness"}
          name={"generalAwareness"}
          placeholder={"Choose question set"}
          register={register}
        />
      </ModalForm>
    </>
  );
};

export default ModelSet;
