import { Stack, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useGetServices } from "@sikaai/service/sikaai-services";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CellProps } from "react-table";

const Services = () => {
  const { register } = useForm();
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

  const columns = useMemo(
    () => [
      {
        Header: "Services",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      // {
      //   Header: "Status",
      //   Cell: () => {
      //     const toggleSwitch = () => {
      //       if (!isStatusOpen) {
      //         onStatusOpen();
      //       } else {
      //         onStatusClose();
      //       }
      //     };
      //     return <Switch value={isStatusOpen} toggleSwitch={toggleSwitch} />;
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
        Cell: ({
          row,
        }: CellProps<{ id: string; service_type: string; name: string }>) => {
          // const onEdit = () => {
          //   onModalOpen();
          // };
          // const onDelete = () => {
          //   console.log("here");
          // };
          const onView = () => {
            const encodedName = encodeURIComponent(row.original?.name);
            if (row.original?.service_type === "1") {
              navigate(
                `${NAVIGATION_ROUTES.COURSES}/${encodedName}/${row.original?.id}`
              );
            } else {
              navigate(
                `${NAVIGATION_ROUTES.FORM}/${encodedName}/${row.original?.id}`
              );
            }
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                // onEdit={onEdit}
                onView={onView}
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
  const { data: tableData = [], isFetching: tableDataFetching } =
    useGetServices();
  // React queries end

  return (
    <>
      <div>
        <BreadCrumb
          title={{ name: "Services", route: `${NAVIGATION_ROUTES.SERVICES}` }}
          items={[]}
        />

        <DataTable
          data={tableData || []}
          loading={tableDataFetching}
          columns={columns}
          // btnText={"Create new service"}
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

export default Services;
