import { Stack, useDisclosure } from "@chakra-ui/react";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";

const FAQ = () => {
  const columns = useMemo(
    () => [
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
        Cell: () => {
          const onEdit = () => {
            onModalOpen();
          };
          const onDelete = () => {
            console.log("here");
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onEdit={onEdit} onDelete={onDelete} />
            </Stack>
          );
        },
      },
    ],
    []
  );
  const { register } = useForm();
  const {
    isOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  return (
    <>
      <BreadCrumb
        items={[]}
        title={{
          name: "Frequently Asked Question",
          route: `${NAVIGATION_ROUTES.FAQ}`,
        }}
      />
      <DataTable
        data={[
          {
            question: "1234",
            answer: "link",
            status: "true",
            createddate: "123",
          },
          {
            question: "1234",
            answer: "link",
            status: "true",
            createddate: "123",
          },
        ]}
        columns={columns}
        btnText={"Create FAQs"}
        onAction={onModalOpen}
        //filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
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
