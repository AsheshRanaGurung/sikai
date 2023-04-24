import DataTable from "@sikaai/components/common/table";
import TableActions from "@sikaai/components/common/table/TableActions";
import { useMemo } from "react";

// {
//   "id": 0,
//   "name": "string",
//   "created_at": "2023-04-21T09:02:07.302Z",
//   "is_archived": true
// }

const AddQuestionSet = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Question Set",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Upload Date",
        accessor: "created_at",
      },
      {
        Header: "Action",

        Cell: () => {
          const onEdit = () => {console.log("here")};
          const onDelete = () => {console.log("here")};
          <TableActions onEdit={onEdit} onDelete={onDelete} />;
        },
      },
    ],
    []
  );
  return (
    <>
      <DataTable columns={columns} data={[]} btnText={"Create New Model Set"} />
    </>
  );
};

export default AddQuestionSet;
