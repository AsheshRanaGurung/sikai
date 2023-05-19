import { useDisclosure, Text } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import {
  useCreateModalSets,
  useDeleteModalSets,
  useGetModalSets,
  useGetModalSetsById,
  useGetSubjectSets,
  useUpdateModalSets,
} from "@sikaai/service/sikaai-modelSet";
import { formatSelectOptions } from "@sikaai/utils/formatOptions";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CellProps } from "react-table";
import Skeleton from "@sikaai/components/skeleton";

const defaultValues = {
  name: "",
  // code: "",
  verbalAbility: "",
  quantitiveAbility: "",
  logicalReasoning: "",
  generalAwareness: "",
};

const schema = Yup.object({
  name: Yup.string().required("This field is required"),
  // code: Yup.string().required("This field is required"),
  verbalAbility: Yup.string().required("This field is required"),
  quantitiveAbility: Yup.string().required("This field is required"),
  logicalReasoning: Yup.string().required("This field is required"),
  generalAwareness: Yup.string().required("This field is required"),
});

export interface ModalSetReq {
  name: string;
  // code: string;
  verbalAbility: string;
  quantitiveAbility: string;
  logicalReasoning: string;
  generalAwareness: string;
}

const ModelSet = () => {
  const [deleteId, setDeleteId] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    service = "",
    serviceId = "",
    course = "",
    courseId = "",
  } = useParams();

  const encodedService = encodeURIComponent(service);
  const encodedCourse = encodeURIComponent(course);

  // react queries
  const { data: modalSets = [], isFetching: tableDataFetching } =
    useGetModalSets({ course_id: courseId });
  const { data: courses } = useGetSubjectSets({
    courseId,
  });
  const { mutateAsync: createModalSet, isLoading } = useCreateModalSets();
  const { data: modalSet, isFetching: isFetchingModalSet } =
    useGetModalSetsById(editId);
  const { mutateAsync: deleteModalSet, isLoading: isDeleteingModal } =
    useDeleteModalSets();
  const { mutateAsync: updateModalSet, isLoading: updatingModalSet } =
    useUpdateModalSets();
  // react queries end

  const subjectSets =
    courses && courses?.subjects.map(subject => subject.subject_question_sets);

  const verbalAbilityOptions =
    subjectSets &&
    subjectSets[0] &&
    formatSelectOptions({
      data: subjectSets[0],
      labelKeys: ["name"],
      valueKey: "id",
    });

  const quantitativeAbilityOptions =
    subjectSets &&
    subjectSets[1] &&
    formatSelectOptions({
      data: subjectSets[1],
      labelKeys: ["name"],
      valueKey: "id",
    });

  const logicalReasoningOptions =
    subjectSets &&
    subjectSets[3] &&
    formatSelectOptions({
      data: subjectSets[3],
      labelKeys: ["name"],
      valueKey: "id",
    });

  const generalAwarenessOptions =
    subjectSets &&
    subjectSets[2] &&
    formatSelectOptions({
      data: subjectSets[2],
      labelKeys: ["name"],
      valueKey: "id",
    });

  const onSubmitHandler = (data: ModalSetReq) => {
    if (isEdit) {
      try {
        updateModalSet({
          id: editId,
          name: data?.name,
          // code: data?.code,
          courseId,
          subject_question_sets: [
            +data?.generalAwareness,
            +data?.quantitiveAbility,
            +data?.logicalReasoning,
            +data?.verbalAbility,
          ],
        });
        onModalClose();
        reset(defaultValues);
        setEdit(false);
        setEditId("");
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        createModalSet({
          name: data?.name,
          // code: data?.code,
          courseId,
          subject_question_sets: [
            +data?.generalAwareness,
            +data?.quantitiveAbility,
            +data?.logicalReasoning,
            +data?.verbalAbility,
          ],
        });
        onModalClose();
        reset(defaultValues);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const columns = useMemo(
    () => [
      { Header: "Code", accessor: "code" },
      { Header: "Question Set", accessor: "name" },
      {
        Header: "Upload Date",
        Cell: ({ row }: CellProps<{ created_at: string; id: string }>) => {
          const date = row.original?.created_at.substring(0, 10);
          return date;
        },
      },
      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setEdit(true);
            setEditId(row?.original?.id);
            onModalOpen();
          };
          const onDelete = () => {
            setDeleteId(row?.original?.id);
            onDeleteModalOpen();
          };
          return <TableActions onEdit={onEdit} onDelete={onDelete} />;
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (isEdit) {
      reset({
        ...defaultValues,
        name: modalSet?.name,
        // code: modalSet?.code,
        verbalAbility: modalSet?.subject_question_sets?.[3]?.id.toString(),
        quantitiveAbility: modalSet?.subject_question_sets?.[1]?.id.toString(),
        logicalReasoning: modalSet?.subject_question_sets?.[2]?.id.toString(),
        generalAwareness: modalSet?.subject_question_sets?.[0]?.id.toString(),
      });
    }
  }, [modalSet]);

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
        data={modalSets || []}
        btnText={"Create New Model Set"}
        onAction={onModalOpen}
        loading={tableDataFetching}
      />

      <ModalForm
        title={isEdit ? "Edit Question Set" : "Create Question Set"}
        isModalOpen={isModalOpen}
        closeModal={() => {
          setEdit(false);
          setEditId("");
          onModalClose();
          reset(defaultValues);
        }}
        resetButttonText={"Cancel"}
        submitButtonText={isEdit ? "Edit" : "Create"}
        isLoading={isLoading || updatingModalSet}
        submitHandler={handleSubmit(onSubmitHandler)}
      >
        {isFetchingModalSet ? (
          <Skeleton count={5} height={"40px"} />
        ) : (
          <>
            <FormControl
              control="input"
              label={"Model Question Set Name"}
              name={"name"}
              placeholder={"Name of model set"}
              register={register}
              error={errors?.name?.message || ""}
              required
            />
            <FormControl
              control="select"
              options={verbalAbilityOptions || []}
              label={"Choose among Verbal Ability"}
              name={"verbalAbility"}
              placeholder={"Choose question set"}
              register={register}
              error={errors?.verbalAbility?.message || ""}
              required
            />
            <FormControl
              control="select"
              options={quantitativeAbilityOptions || []}
              label={"Choose among Quantitative Ability"}
              name={"quantitiveAbility"}
              placeholder={"Choose question set"}
              register={register}
              error={errors?.quantitiveAbility?.message || ""}
              required
            />

            {encodedCourse === "CMAT" && (
              <>
                <FormControl
                  control="select"
                  options={logicalReasoningOptions || []}
                  label={"Choose among Logical Reasoning"}
                  name={"logicalReasoning"}
                  placeholder={"Choose question set"}
                  register={register}
                  error={errors?.logicalReasoning?.message || ""}
                  required
                />
                <FormControl
                  control="select"
                  options={generalAwarenessOptions || []}
                  label={"Choose among General Awareness"}
                  name={"generalAwareness"}
                  placeholder={"Choose question set"}
                  register={register}
                  error={errors?.generalAwareness?.message || ""}
                  required
                />
              </>
            )}
          </>
        )}
        {/* <FormControl
          control="input"
          label={"Code"}
          name={"code"}
          placeholder={"Code"}
          register={register}
          error={errors?.code?.message || ""}
          required
        /> */}
      </ModalForm>

      <ModalForm
        title={"Delete"}
        isModalOpen={isDeleteModalOpen}
        isLoading={isDeleteingModal}
        submitButtonText={"Delete"}
        resetButttonText={"Cancel"}
        submitHandler={() => {
          deleteModalSet(deleteId);
          onDeleteModalClose();
        }}
        closeModal={onDeleteModalClose}
        modalSize={"sm"}
      >
        <Text>Are you sure you want to delete?</Text>
      </ModalForm>
    </>
  );
};

export default ModelSet;
