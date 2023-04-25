import { Stack, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CMATSection = () => {
  const { register } = useForm();
  const navigate = useNavigate();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        Header: "Section",
        accessor: "Section",
      },
      {
        Header: "Status",
        accessor: "Status",
      },
      {
        Header: "Upload Date",
        accessor: "uploadDate",
      },
      {
        Header: "Action",
        Cell: () => {
          const onEdit = () => {
            onModalOpen();
          };
          const onShowQues = () => {
            navigate(NAVIGATION_ROUTES.QUESTION_SET);
          };
          const onDelete = () => {
            console.log("here");
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

  return (
    <>
      <div>
        <BreadCrumb title={"Services"} items={[]} />

        <DataTable
          data={[
            {
              advertisementBanner: "1234",
              advertisementLink: "link",
              status: "true",
              uploadDate: "123",
            },
            {
              advertisementBanner: "1234",
              advertisementLink: "link",
              status: "true",
              uploadDate: "123",
            },
          ]}
          columns={columns}
          btnText={"Create new service"}
          onAction={onModalOpen}
          filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

        <ModalForm
          isModalOpen={isModalOpen}
          title={"Edit service"}
          closeModal={onModalClose}
          resetButttonText={"Cancel"}
          submitButtonText={"Upload"}
        >
          <>
            <FormControl
              control="input"
              size="lg"
              register={register}
              name="link"
              placeholder={"Service Name"}
              label={"Service Name"}
            />
            <FormControl
              control="input"
              size="lg"
              register={register}
              name="link"
              placeholder={"Description"}
              label={"Description"}
            />
          </>
        </ModalForm>
      </div>
    </>
  );
};

export default CMATSection;
