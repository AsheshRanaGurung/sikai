import { Stack, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import Skeleton from "@sikaai/components/skeleton";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import {
  useGetServiceById,
  useGetServices,
  useUpdateServices,
} from "@sikaai/service/sikaai-services";
import httpStatus from "http-status";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CellProps } from "react-table";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const defaultValues = {
  name: "",
  description: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
});

const Services = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [isEdit, setEdit] = useState(false);
  const [updateId, setUpdateId] = useState("");
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
        Header: "Created Date",
        Cell: ({ row }: CellProps<{ created_at: string }>) => {
          const date = row.original?.created_at?.substring(0, 10);
          return date;
        },
      },
      {
        Header: "Action",
        Cell: ({
          row,
        }: CellProps<{ id: string; service_type: string; name: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original?.id);
            setEdit(true);
            onModalOpen();
          };
          // const onDelete = () => {
          // };
          const onView = () => {
            const encodedName = encodeURIComponent(row.original?.name);
            if (row.original?.service_type === "1") {
              navigate(
                `${NAVIGATION_ROUTES.COURSES}/${encodedName}/${row.original?.id}`
              );
            } else if (row.original?.service_type === "2") {
              navigate(
                `${NAVIGATION_ROUTES.FORM}/${encodedName}/${row.original?.id}`
              );
            } else {
              navigate(
                `${NAVIGATION_ROUTES.NON_QUESTIONNAIRE}/${encodedName}/${row.original?.id}`
              );
            }
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                onEdit={onEdit}
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
  const { mutateAsync: updateService, isLoading: isUpdatingService } =
    useUpdateServices();
  const { data: service, isFetching: serviceLoading } =
    useGetServiceById(updateId);
  // React queries end

  const onSubmitHandler = async (serviceDetails: typeof defaultValues) => {
    const response = await updateService({ ...serviceDetails, id: updateId });

    if (response?.status === httpStatus.OK) {
      onModalClose();
      setUpdateId("");
      setEdit(false);
      reset(defaultValues);
    }
  };

  useEffect(() => {
    if (service) {
      reset({
        ...defaultValues,
        name: service.name,
        description: service.description,
      });
    }
  }, [updateId, isEdit]);

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
          // filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

        <ModalForm
          isLoading={isUpdatingService}
          isModalOpen={isModalOpen}
          title={"Edit service"}
          closeModal={() => {
            setEdit(false);
            reset(defaultValues);
            onModalClose();
          }}
          resetButttonText={"Cancel"}
          submitButtonText={isEdit ? "Edit" : "Add"}
          submitHandler={handleSubmit(onSubmitHandler)}
        >
          {serviceLoading ? (
            <Skeleton count={4} height={"40px"} />
          ) : (
            <>
              <FormControl
                control="input"
                size="lg"
                register={register}
                name="name"
                placeholder={"Service Name"}
                label={"Service Name"}
                error={errors?.name?.message || ""}
              />
              <FormControl
                control="textArea"
                size="lg"
                register={register}
                name="description"
                placeholder={"Description"}
                label={"Description"}
                error={errors?.description?.message || ""}
              />
            </>
          )}
        </ModalForm>
      </div>
    </>
  );
};

export default Services;
