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

const AdvanceAd = () => {
  const { register } = useForm();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        Header: "Advertisement Banner",
        accessor: "advertisementBanner",
      },
      {
        Header: "Advertisement Link",
        accessor: "advertisementLink",
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
      <div>
        <BreadCrumb
          title={"Advertisement"}
          items={[
            {
              name: `Advance Ads`,
              route: NAVIGATION_ROUTES.PREMIUM_AD,
            },
          ]}
        />

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
          btnText={"Add New Advertisement"}
          onAction={onModalOpen}
          filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

        <ModalForm
          isModalOpen={isModalOpen}
          title={"Upload Advertisement"}
          closeModal={onModalClose}
          resetButttonText={"Cancel"}
          submitButtonText={"Upload"}
        >
          <>
            <FormControl
              control="file"
              size="lg"
              register={register}
              name="image"
              label={"Upload Image"}
            />
            <FormControl
              control="input"
              size="lg"
              register={register}
              name="link"
              placeholder={"Enter Link"}
              label={"Advertisement Link"}
            />
            <FormControl
              control="select"
              options={[]}
              size="lg"
              register={register}
              name="advertisementPlacement"
              placeholder={"Choose the placement of Advertisement"}
              label={"Choose the placement of advertisement"}
            />
          </>
        </ModalForm>

        {/* <ModalForm
          isModalOpen={isModalOpen}
          title={"Edit service"}
          closeModal={onModalClose}
          resetButttonText={"Cancel"}
          submitButtonText={"Upload"}
        >

        </ModalForm> */}
      </div>
    </>
  );
};

export default AdvanceAd;
