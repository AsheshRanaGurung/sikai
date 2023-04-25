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

const Services = () => {
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
        Header: "Services",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "status",
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
          const onDelete = () => {
            console.log("here");
          };
          const onSetting = () => {
            navigate(`${NAVIGATION_ROUTES.CMAT_SECTION}`);
          };
          const onShowQues = () => {
            console.log("here");
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                onEdit={onEdit}
                onSetting={onSetting}
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

export default Services;
