import React, {
  Dispatch,
  Fragment,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  TableToggleCommonProps,
  useExpanded,
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";

import {
  Box,
  Button,
  Checkbox as CCheckbox,
  CheckboxProps,
  CSSObject,
  Flex,
  HStack,
  IconButton,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Progress,
  Input,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Search2Icon,
} from "@chakra-ui/icons";
// import { AddIcon } from "@sikaai/assets/svgs";
import { sikaai_colors } from "@sikaai/theme/color";
import { AddCircleIcon } from "@sikaai/assets/svgs";

export function getPager(
  totalRows: number,
  _: number,
  pageLimit: number
): Array<number> {
  if (totalRows <= pageLimit) return [1];
  const totalPages = Math.ceil(totalRows / pageLimit);
  const totalPageArray = Array.from(Array(totalPages), (_, i) => i + 1);
  return totalPageArray;
}

const styleTableWithRightBorder = {
  "& th": {
    boxShadow: "none",
    color: "#585858",
    paddingY: 4,
    paddingX: 2,
    textTransform: "capitalize",
    // TODO: make this dynamic
    maxW: "200px",
  },
  "& tr": {
    "&:nth-of-type(even)": {
      backgroundColor: sikaai_colors.gray,
    },
  },
  "& td": {
    border: 0,
    color: sikaai_colors.gray_text,
    boxShadow: "none",
    paddingY: 4,
    paddingX: 2,
    maxW: "200px",
  },
};

const styleTableWithButtom = {
  "& th": {
    boxShadow: "none",
    paddingY: 3,
    paddingX: 2,
  },
  "& td": {
    boxShadow: "none",
    borderButtomWidth: 1,
    borderButtomStyle: "solid",
    borderButtomColor: "gray.100",
    paddingY: 3,
    paddingX: 2,
  },
};
interface IDataTable {
  columns: any;
  // columns: Column<Record<any, any>>[];
  data: Record<string, any>[];
  // Element to show on expanded
  expandedView?: ReactNode;
  // Should expand all rows
  isAllExpanded?: boolean;
  // Element to show on hover
  hoverView?: ReactElement;
  height?: string;
  width?: string;
  loading?: boolean;
  searchText?: string;
  sortBy?: (sortField: string, sort_order: "asc" | "des") => void;
  sorted?: { sort_by: string; sort_order: "asc" | "des" | string };
  isClientPagination?: boolean;
  paginationProps?: {
    queryPageIndex: number;
    queryPageSize: number;
    totalCount: number;
    pageChange: (queryPageIndex: number) => void;
    pageSizeChange: (queryPageSize: number) => void;
  };
  disableOverflow?: boolean;
  containerStyles?: CSSObject;
  //if table header needs a background color
  headerBackgroundColor?: string;
  //if we need a table with borderbuttom & no rightside border
  rowBottomBorder?: boolean;
  // if we need to add button to the table
  btnText?: string;
  optionGroup?: ReactElement;
  CurrentText?: string;

  onAction?: () => void;
  // if we need to filter the content of the table
  filter?: IFilter[];
  filters?: ReactElement;
  // if we need to disable the button according to permission
  onDisableButton?: boolean;

  // download excel file through export button
  exports?: string;
  onDownload?: () => void;

  // search
  setSearchValue?: (searchValue: string) => void;
}

interface IFilter {
  type: string;
  filterOptions?: ISelectOptions[];
  setFilter?: (value: string) => void | Dispatch<SetStateAction<string>>;
}
interface ISelectOptions {
  label: string;
  value: string | number;
}
/**
 * General datatable component
 * @param props IDataTable
 * @returns JSX Table Element
 */

const DataTable = React.memo(
  ({
    columns,
    data,
    loading,
    isAllExpanded,
    hoverView,
    height,
    width,
    isClientPagination,
    paginationProps,
    searchText,
    containerStyles,
    headerBackgroundColor = "rgba(0, 56, 147, 0.04);",
    btnText,
    optionGroup,
    CurrentText,

    onAction,
    rowBottomBorder,
    onDisableButton,
    filters,
    setSearchValue,
  }: IDataTable) => {
    const tableInstance = useTable(
      {
        columns,
        data,
        initialState: {
          pageIndex: isClientPagination ? 0 : 1,
        },
        manualPagination: !isClientPagination,
        pageCount: isClientPagination
          ? undefined
          : paginationProps
          ? paginationProps.totalCount
          : 0,
        autoResetPage: !isClientPagination,
      },
      useGlobalFilter,
      useSortBy,
      useExpanded,
      usePagination,
      useRowSelect
    );
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      setGlobalFilter,
      page,
      gotoPage,
      setPageSize,
      state: { pageIndex, pageSize },
      ///Pagination
      toggleAllRowsExpanded,
    } = tableInstance;
    const {
      queryPageIndex = 1,
      queryPageSize = 10,
      totalCount,
      pageSizeChange,
      pageChange,
    } = isClientPagination
      ? {
          queryPageIndex: pageIndex + 1,
          queryPageSize: pageSize,
          totalCount: data.length,
          pageSizeChange: setPageSize,
          pageChange: (page: number) => {
            gotoPage(page - 1);
          },
        }
      : paginationProps ?? {};
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    useEffect(() => {
      if (searchText?.trim().length) {
        setGlobalFilter(searchText);
      } else {
        setGlobalFilter("");
      }
    }, [searchText]);
    useEffect(() => {
      toggleAllRowsExpanded(isAllExpanded ?? false);
    }, [isAllExpanded, toggleAllRowsExpanded]);

    const numberOfColumns = columns.reduce(
      (acc: number, column: { columns: string | any[] }) =>
        acc + ("columns" in column ? column.columns.length - 1 : 0),
      columns.length
    );

    return (
      <Box bgColor={sikaai_colors.white} p={4} borderRadius={"8px"}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          rowGap={2}
        >
          <Flex alignItems="center" gap={3}>
            <Flex position="relative">
              <Input
                maxW={356}
                type="text"
                placeholder="Search"
                height="44px"
                fontSize="16px"
                fontFamily="'Urbanist', sans-serif"
                pr={12}
                borderRadius={8}
                onChange={e => {
                  setSearchValue && setSearchValue(e.target.value);
                }}
              />
              <Button
                h="35px"
                w="35px"
                bgColor="transparent"
                color="gray"
                zIndex={10}
                position="absolute"
                right={1}
                top={1}
                borderRadius={6}
                sx={{
                  "&:hover": {
                    bgColor: "transparent",
                    outline: "none",
                  },
                  "&:focus": {
                    bgColor: "transparent",
                    outline: "none",
                  },
                }}
                rightIcon={
                  <Search2Icon
                    h="14px"
                    w="14px"
                    color="gray"
                    bgColor={"transparent"}
                  />
                }
              />
            </Flex>

            {!!filters && <Box bgSize={"md"}>{filters}</Box>}
          </Flex>
          <Flex gap={2}>
            {optionGroup && <Box bgSize={"md"}>{optionGroup}</Box>}
            {CurrentText && (
              <Text background={"#E6F0FA"} p={3} borderRadius={"5px"}>
                {CurrentText}
              </Text>
            )}

            {btnText && (
              <Button
                variant={"primary"}
                size={"fit"}
                leftIcon={<AddCircleIcon />}
                onClick={onAction}
                outline="none"
                border={"none"}
                disabled={onDisableButton}
                sx={{
                  "&::before": {
                    border: "none",
                  },
                  "&::after": {
                    border: "none",
                  },
                  "&:hover": {
                    "svg path": {
                      fill: sikaai_colors.primary,
                    },
                  },
                }}
              >
                {btnText}
              </Button>
            )}
          </Flex>
        </Flex>

        <TableContainer
          height={height}
          width={width}
          whiteSpace="unset"
          sx={containerStyles}
          mt={3}
        >
          {loading && (
            <Box w={"100%"}>
              <Progress size="xs" isIndeterminate />
            </Box>
          )}
          <Table {...getTableProps()} size="sm">
            <Thead
              background={headerBackgroundColor ? headerBackgroundColor : ""}
            >
              {headerGroups.map(headergroup => {
                return (
                  <Tr
                    {...headergroup.getHeaderGroupProps()}
                    key={headergroup.id}
                  >
                    {headergroup.headers.map(column => {
                      return (
                        <Th
                          {...column.getHeaderProps()}
                          color="gray.950"
                          key={column.id}
                        >
                          {column.render("Header")}
                        </Th>
                      );
                    })}
                  </Tr>
                );
              })}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {!(isClientPagination ? page : rows).length && (
                <Tr>
                  <Td
                    colSpan={numberOfColumns}
                    sx={{ textAlign: "center", height: "40vh" }}
                  >
                    <Box
                      sx={{
                        margin: "20px auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* <NoDataIcon /> */}
                    </Box>
                    <Text
                      fontSize={14}
                      textAlign="center"
                      color={sikaai_colors.gray_text}
                    >
                      No data
                    </Text>
                  </Td>
                </Tr>
              )}
              {(isClientPagination ? page : rows).map(row => {
                prepareRow(row);
                return (
                  <Fragment key={row.id}>
                    <Tr
                      {...row.getRowProps()}
                      onMouseEnter={() => {
                        hoverView && setHoveredRow(row.id);
                      }}
                      onMouseLeave={() => hoverView && setHoveredRow(null)}
                      bgColor={
                        hoverView && hoveredRow === row.id
                          ? "gray.100"
                          : "white"
                      }
                      position={
                        hoverView && hoveredRow === row.id
                          ? "relative"
                          : "static"
                      }
                    >
                      {row.cells.map(cell => {
                        return (
                          <Td
                            {...cell.getCellProps()}
                            key={cell.getCellProps().key}
                            position="relative"
                          >
                            {cell.render("Cell")}
                          </Td>
                        );
                      })}
                      {/* Show this view on hover */}
                      {hoverView && hoveredRow === row.id ? (
                        <Flex
                          height="80%"
                          position="absolute"
                          right="5rem"
                          top="50%"
                          transform="translateY(-50%)"
                          bgColor="gray.100"
                        >
                          {React.cloneElement(hoverView, {
                            rowData: { row },
                            onMouseEnter: () => {
                              setHoveredRow(row.id);
                            },
                          })}
                        </Flex>
                      ) : null}
                    </Tr>
                    {/* Show this view on expand */}
                    {row.isExpanded && (
                      <Tr {...row.getRowProps()}>
                        <Td colSpan={columns.length} p={0}></Td>
                      </Tr>
                    )}
                  </Fragment>
                );
              })}
            </Tbody>
          </Table>
          {data.length ? (
            <Pagination
              enabled={!!(paginationProps || isClientPagination)}
              queryPageSize={queryPageSize}
              pageSizeChange={pageSizeChange}
              queryPageIndex={queryPageIndex}
              pageChange={pageChange}
              totalCount={totalCount ?? 0}
            />
          ) : null}
        </TableContainer>
      </Box>
    );
  }
);

interface PaginationProps {
  enabled: boolean;
  queryPageSize: number;
  pageSizeChange?: (size: number) => void;
  queryPageIndex: number;
  pageChange?: (page: number) => void;
  totalCount: number;
}
export const Pagination = ({
  enabled,
  queryPageSize,
  pageSizeChange,
  queryPageIndex,
  pageChange,
  totalCount,
}: PaginationProps) => {
  return enabled ? (
    <Box px={{ base: "4", md: "6" }} p="5" bg={sikaai_colors.white} pt={8}>
      <HStack justifyContent="space-between">
        <HStack spacing={10}>
          <Select
            value={queryPageSize}
            width="81px"
            borderRadius="6px"
            size="sm"
            placeholder="Select option"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              pageSizeChange && pageSizeChange(parseInt(e.target.value));
            }}
          >
            {[5, 10, 20, 30].map((value, index) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })}
          </Select>
          <Text fontSize="sm">
            Showing {queryPageSize > totalCount ? totalCount : queryPageSize} of{" "}
            {totalCount}
          </Text>
        </HStack>
        <HStack>
          <IconButton
            aria-label="Search services"
            size="sm"
            bgColor={sikaai_colors.gray}
            borderRadius={"29px"}
            height="40px"
            width="40px"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            disabled={queryPageIndex == 1}
            onClick={() => {
              pageChange && pageChange(queryPageIndex - 1);
            }}
            icon={<ChevronLeftIcon />}
          />
          <Box bgColor={sikaai_colors.gray} borderRadius="50px 50px 50px 50px">
            {getPager(totalCount, queryPageIndex, queryPageSize).map(
              (page, index) => {
                return (
                  <Button
                    type="submit"
                    key={index}
                    mr={2}
                    sx={{
                      bgColor:
                        queryPageIndex === page
                          ? sikaai_colors.primary
                          : sikaai_colors.gray,
                      borderRadius: "50%",
                      w: "40px",
                      h: "40px",
                      transition: "all 300ms ease-in-out",
                      textAlign: "center",
                      lineHeight: "40px",
                      color:
                        queryPageIndex === page ? sikaai_colors.white : "#000",
                      "&:hover": {
                        bgColor: sikaai_colors.primary,
                        color: sikaai_colors.white,
                      },
                    }}
                    fontSize="18px"
                    fontFamily="'Urbanist', sans-serif"
                    cursor="pointer"
                    onClick={() => {
                      pageChange?.(page);
                    }}
                  >
                    {page}
                  </Button>
                );
              }
            )}
          </Box>
          <IconButton
            aria-label="Search services"
            size="sm"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            bgColor={sikaai_colors.gray}
            borderRadius={"29px"}
            height="40px"
            width="40px"
            onClick={() => {
              pageChange && pageChange(queryPageIndex + 1);
            }}
            disabled={queryPageIndex * queryPageSize >= totalCount}
            icon={<ChevronRightIcon />}
          />
        </HStack>
      </HStack>
    </Box>
  ) : null;
};

const Checkbox = (checkboxProps: TableToggleCommonProps & CheckboxProps) => {
  const { indeterminate, ...rest } = checkboxProps;
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (checkboxRef.current && typeof indeterminate === "boolean") {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [checkboxRef, indeterminate]);
  return <CCheckbox ref={checkboxRef} {...rest} />;
};

export default DataTable;
Checkbox.displayName = "Checkbox";
DataTable.displayName = "DataTable";
export { Checkbox };
