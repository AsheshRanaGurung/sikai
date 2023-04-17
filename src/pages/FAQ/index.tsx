import { useDisclosure } from "@chakra-ui/react";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const columns = [
    {
      Header: "Question",
      accessor: "question",
    },
    {
      Header: "Answer",
      accessor: "answer",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Created Date",
      accessor: "createddate",
    },
    {
      Header: "Action",
      accessor: "action",
    },
  ];
  const { register } = useForm();
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  return (
    <>
      <BreadCrumb items={[]} title="Frequently Asked Question" />
      <DataTable
        data={[]}
        columns={columns}
        btnText={"Create FAQs"}
        onAction={() => navigate(NAVIGATION_ROUTES.FAQ_CREATE)}
        filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
      />

      <ModalForm
        isModalOpen={isOpen}
        title={"Edit FAQ"}
        closeModal={onModalClose}
        resetButttonText={"Cancel"}
        submitButtonText={"Update"}
      >
        <>
          <FormControl
            control="input"
            size="lg"
            register={register}
            name="question "
            placeholder={"Edit questions"}
            label={"Question"}
          />
          <FormControl
            control="input"
            size="lg"
            register={register}
            name="answer"
            placeholder={"Edit answer"}
            label={"Answer"}
          />
        </>
      </ModalForm>
    </>
  );
};
export default FAQ;
