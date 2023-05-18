import { Stack, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import DropzoneComponent from "@sikaai/components/form/DropzoneComponent";
import FormControl from "@sikaai/components/form/FormControl";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import {
  useCreateAdvertisement,
  useDeleteAdvertisement,
  useGetAdPlacementPages,
  useGetAdvertisement,
  useUpdateAdvertisement,
} from "@sikaai/service/sikaai-advertisement";
import { formatSelectOptions } from "@sikaai/utils/formatOptions";
import httpStatus from "http-status";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CellProps } from "react-table";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// TODO: change this to OMIT
interface IAdsFormData {
  name: string;
  ad_type: string;
  display_status: boolean;
  page: { label: string; value: string }[];
}

const defaultValues: IAdsFormData = {
  name: "",
  ad_type: "",
  display_status: false,
  page: [],
};

const validationSchema = Yup.object({
  //todo
  page: Yup.array()
    .min(1, "Please select one field")
    .required("This field is required"),
});

const BasicAd = () => {
  const [updateId, setUpdateId] = useState("");
  const [previewBanner, setPreviewBanner] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState<Blob[]>([]);
  const {
    isOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  //react query start
  const { data: advertisementData = [], isFetching } =
    useGetAdvertisement("basic");
  const { data: adPlacement = [] } = useGetAdPlacementPages();
  const { mutateAsync: createAdvertisement } = useCreateAdvertisement();
  const { mutateAsync: deleteAdvertisement } = useDeleteAdvertisement();
  const { mutateAsync: updateAds } = useUpdateAdvertisement();
  //react query end

  // formatSelectOPtions
  const advertisementPlacementOptions = formatSelectOptions({
    data: adPlacement,
    labelKeys: ["name"],
    valueKey: "id",
  });
  // formatSelectOPtions end

  const columns = [
    {
      Header: "Advertisement Banner",
      accessor: "banner",
    },

    // {
    //   Header: "Status",
    //   accessor: "display_status",
    // },
    {
      Header: "Upload Date",
      accessor: "created_at",
    },
    {
      Header: "Action",
      Cell: ({ row }: CellProps<{ id: string }>) => {
        const onEdit = () => {
          setUpdateId(row.original?.id);
          setIsUpdate(true);
          onModalOpen();
        };
        const onDelete = () => {
          deleteAdvertisement({ id: row?.original?.id });
        };

        return (
          <Stack alignItems={"flex-start"}>
            <TableActions onEdit={onEdit} onDelete={onDelete} />
          </Stack>
        );
      },
    },
  ];

  useEffect(() => {
    const editData = advertisementData?.find(item => item.id == +updateId);
    reset({
      ...editData,
      page: advertisementPlacementOptions.filter(
        (item: { value: string; label: string }) => {
          return editData?.page.includes(item?.value);
        }
      ),
    });
    setPreviewBanner(editData?.banner || "");
  }, [updateId]);

  const onSubmitHandler = async (advertisementDetails: IAdsFormData) => {
    if (isUpdate && updateId !== null) {
      const response = await updateAds({
        ...advertisementDetails,
        id: updateId,
        ad_type: "1",
        banner: acceptedFiles?.[0],
        page: advertisementDetails?.page?.map(({ value }) => value)[0],
      });
      if (response.status === httpStatus.OK) {
        onCloseHandler();
      }
    } else {
      const response = await createAdvertisement({
        ...advertisementDetails,
        ad_type: "1",
        banner: acceptedFiles?.[0],
        page: advertisementDetails?.page?.map(({ value }) => value)[0],
      });

      if (response.status === httpStatus.OK) {
        onCloseHandler();
      }
    }
  };

  const onCloseHandler = () => {
    onModalClose();
    reset(defaultValues);
    setAcceptedFiles([]);
    setPreviewBanner("");
    setIsUpdate(false);
  };

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
              name: `Basic Ads`,
              route: NAVIGATION_ROUTES.PREMIUM_AD,
            },
          ]}
        />

        <DataTable
          data={advertisementData}
          columns={columns}
          btnText={"Add New Advertisement"}
          onAction={onModalOpen}
          loading={isFetching}
          // filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

        <ModalForm
          isModalOpen={isOpen}
          title={isUpdate ? "Edit Advertisement" : "Upload Advertisement"}
          closeModal={onCloseHandler}
          resetButttonText={"Cancel"}
          submitButtonText={isUpdate ? "Update" : "Upload"}
          submitHandler={handleSubmit(onSubmitHandler)}
        >
          <>
            <DropzoneComponent
              setAcceptedFiles={setAcceptedFiles}
              helperText="Please upload files"
              imagePreview={previewBanner}
              multiple
              accept={{
                "image/png": [".png", ".jpeg", ".jpg"],
              }}
            />

            {/* <FormControl
              control="input"
              size="lg"
              register={register}
              name="link"
              placeholder={"https://go.com"}
              label={"Advertisement Link"}
              error={errors?.link?.message ?? ""}
            /> */}

            <FormControl
              control="multiSelect"
              options={advertisementPlacementOptions}
              label={"Choose the placement of advertisement"}
              name="page"
              register={register}
              placeholder={"Choose the placement of Advertisement"}
              selectControl={control}
              error={errors?.page?.message ?? ""}
            />
          </>
        </ModalForm>
      </div>
    </>
  );
};

export default BasicAd;
