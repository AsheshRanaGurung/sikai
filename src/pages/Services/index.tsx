import { Stack, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import Switch from "@sikaai/components/switch";
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

  const {
    isOpen: isStatusOpen,
    onOpen: onStatusOpen,
    onClose: onStatusClose,
  } = useDisclosure();

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
      {
        Header: "Status",
        Cell: () => {
          const toggleSwitch = () => {
            if (!isStatusOpen) {
              onStatusOpen();
            } else {
              onStatusClose();
            }
          };
          return <Switch value={isStatusOpen} toggleSwitch={toggleSwitch} />;
        },
      },
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
          const onEdit = () => {
            onModalOpen();
          };
          const onDelete = () => {
            console.log("here");
          };
          const onView = () => {
            navigate(`${NAVIGATION_ROUTES.COURSES}`);
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                onEdit={onEdit}
                onView={onView}
                onDelete={onDelete}
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
        <BreadCrumb title={"Services"} items={[]} />

        <DataTable
          data={tableData || []}
          // data={[
          //   {
          //     advertisementBanner: "1234",
          //     advertisementLink: "link",
          //     status: "true",
          //     uploadDate: "123",
          //   },
          //   {
          //     advertisementBanner: "1234",
          //     advertisementLink: "link",
          //     status: "true",
          //     uploadDate: "123",
          //   },
          // ]}
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
