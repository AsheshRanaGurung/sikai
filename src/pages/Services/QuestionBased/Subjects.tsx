import { Stack, useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@sikaai/components/common/breadCrumb";
import ModalForm from "@sikaai/components/common/Modal/Modal";
import DataTable from "@sikaai/components/common/table";
import Filter from "@sikaai/components/common/table/filter";
import TableActions from "@sikaai/components/common/table/TableActions";
import FormControl from "@sikaai/components/form/FormControl";
import Switch from "@sikaai/components/switch";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useGetSubjects } from "@sikaai/service/sikaai-subjects";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CellProps } from "react-table";

const Subjects = () => {
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

  const { service = "", course = "" } = useParams();
  const encodedService = encodeURIComponent(service);
  const encodedCourse = encodeURIComponent(course);

  // react queries
  const { data: tableData = [], isLoading } = useGetSubjects();
  // react queries end

  const columns = useMemo(
    () => [
      {
        Header: "Section",
        accessor: "name",
      },
      {
        Header: "Status",
        Cell: () => {
          const toggleSwitch = () => {
            if (isStatusOpen) {
              onStatusClose();
            } else {
              onStatusOpen();
            }
          };
          return <Switch value={false} toggleSwitch={toggleSwitch} />;
        },
      },
      {
        Header: "Created Date",
        Cell: ({ row }: CellProps<{ created_at: string }>) => {
          const date = row.original?.created_at.substring(0, 10);
          return date;
        },
      },
      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          // const onEdit = () => {
          //   onModalOpen();
          // };
          const onShowQues = () => {
            const encodedName = encodeURIComponent(row.original?.name);
            navigate(
              `${NAVIGATION_ROUTES.QUESTION_SET}/${encodedService}/${encodedCourse}/${encodedName}/${row.original?.id}`
            );
          };
          // const onDelete = () => {
          //   console.log("here");
          // };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                // onEdit={onEdit}
                onShowQues={onShowQues}
                // onDelete={onDelete}
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
        <BreadCrumb
          title={{ name: "Services", route: `${NAVIGATION_ROUTES.SERVICES}` }}
          items={[
            { name: service, route: `${NAVIGATION_ROUTES.SERVICES}` },
            {
              name: course,
              route: `${NAVIGATION_ROUTES.COURSES}/${encodedService}`,
            },
          ]}
        />

        <DataTable
          data={tableData || []}
          columns={columns}
          loading={isLoading}
          btnText={"Create new section"}
          onAction={onModalOpen}
          filters={<Filter filter={[{ type: "Date" }, { type: "Status" }]} />}
        />

        <ModalForm
          isModalOpen={isModalOpen}
          title={"Add service"}
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

export default Subjects;
