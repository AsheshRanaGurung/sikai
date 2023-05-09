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

const Roles = () => {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  const { register } = useForm();

  const columns = useMemo(
    () => [
      {
        Header: "Role Name",
        accessor: "roleName",
      },
      {
        Header: "Username",
        accessor: "userName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Contact Number",
        accessor: "contactNumber",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Created Date",
        accessor: "createdDate",
      },
      {
        Header: "Action",
        Cell: () => {
          const onEdit = () => {};
          const onDelete = () => {};
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
  return (
    <>
      <BreadCrumb
        items={[]}
        title={{ name: "Roles", route: `${NAVIGATION_ROUTES.ROLES}` }}
      />
      <DataTable
        data={[
          {
            roleName: "teacher",
            userName: "arya",
            email: "hello@hello.com",
            contactNumber: "984187987265",
            password: "password",
            createdDate: "2054-9-29",
          },
        ]}
        columns={columns}
        btnText={"Roles"}
        onAction={onOpen}
        filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
      />
      <ModalForm
        isModalOpen={isOpen}
        title={"Upload Advertisement"}
        closeModal={onModalClose}
        resetButttonText={"Cancel"}
        submitButtonText={"Create"}
      >
        <FormControl
          control="input"
          size="lg"
          register={register}
          name="roleName"
          label={"Role Name"}
          placeholder={"Name"}
        />
        <FormControl
          control="input"
          size="lg"
          register={register}
          name="userName"
          label={"User Name"}
          placeholder={"User Name"}
        />
        <FormControl
          control="input"
          size="lg"
          register={register}
          name="email"
          label={"Email"}
          placeholder={"Email"}
        />
        <FormControl
          control="input"
          size="lg"
          register={register}
          name="contactNumber"
          label={"Contact Number"}
          placeholder={"Contact Number"}
        />
        <FormControl
          control="input"
          size="lg"
          register={register}
          name="password"
          label={"Password"}
          placeholder={"Password"}
        />
        <FormControl
          control="input"
          size="lg"
          register={register}
          name="createdDate"
          label={"Created Date"}
          placeholder={"Created Date"}
        />
      </ModalForm>
    </>
  );
};

export default Roles;
