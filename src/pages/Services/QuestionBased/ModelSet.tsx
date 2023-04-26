import { Divider, useDisclosure } from "@chakra-ui/react";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import Switch from "@sikaai/components/switch";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const ModelSet = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isStatusOpen,
    onOpen: onStatusOpen,
    onClose: onStatusClose,
  } = useDisclosure();

  const toggleSwitch = () => {
    onStatusOpen();
    if (isStatusOpen) {
      onStatusClose();
    }
  };
  const { register, handleSubmit } = useForm();

  const onSubmitHandler = (data: any, e: any) => {
    e.preventDefault();
    console.log(data);
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
        <Switch
          value={isStatusOpen}
          label={"Negative Marking"}
          toggleSwitch={toggleSwitch}
        />
        {isStatusOpen && (
          <>
            <FormControl
              control="input"
              label={"Enter Deduction number"}
              name={"deductionNumber"}
              placeholder={"deduction number"}
              register={register}
            />

            <Divider />
          </>
        )}
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
