// Pagination
interface IParams {
  tableData: any;
  pageParams: {
    page: number;
    limit: number;
  };
}
export const getPaginatedData = ({
  tableData: tableData,
  pageParams: pageParams,
}: IParams) => {
  const startIndex = pageParams.page * pageParams.limit - pageParams.limit;
  const endIndex = startIndex + pageParams.limit;
  const data = tableData || [];
  return data?.slice(startIndex, endIndex);
};

// Pagination ends
