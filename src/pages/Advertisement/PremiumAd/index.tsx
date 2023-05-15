import { useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useForm } from "react-hook-form";

const PremiumAd = () => {
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  const { register } = useForm();
  const columns = [
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
      accessor: "action",
    },
  ];
  return (
    <>
      <div>
        <BreadCrumb
          title={{
            name: "Advertisement",
            route: `${NAVIGATION_ROUTES.ADVERTISEMENT}`,
          }}
          items={[
            {
              name: `Premium Ads`,
              route: NAVIGATION_ROUTES.PREMIUM_AD,
            },
          ]}
        />

        <DataTable
          data={[]}
          columns={columns}
          btnText={"Add New Advertisement"}
          onAction={onOpen}
          // filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

        <ModalForm
          isModalOpen={isOpen}
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
      </div>
    </>
  );
};

export default PremiumAd;
