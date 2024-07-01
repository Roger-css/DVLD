/* eslint-disable react-refresh/only-export-components */
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, memo, useState } from "react";
type Props<TColumn, TData> = {
  column: ColumnDef<TData, TColumn>[];
  Data: TData[];
  children?: ReactNode;
  pageSize?: number;
  color?: string;
};
const StyledTableCell = styled(TableCell)(({ theme, color }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: color ? color : theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
let DataTableMemory = <TColumn, TData>({
  Data,
  column,
  children,
  pageSize,
  color = "#1565c0",
}: Props<TColumn, TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns: column,
    data: Data || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting: sorting,
      pagination: {
        pageSize: pageSize ? pageSize : 10,
        pageIndex: 0,
      },
    },
  });
  return (
    <div>
      <div className="flex">{children}</div>
      {/* main Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <StyledTableCell
                        color={color}
                        padding={
                          typeof header.column.columnDef.header != "string"
                            ? `checkbox`
                            : "normal"
                        }
                        key={header.id}
                        sx={{ textAlign: "center", fontSize: "16px" }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows?.length > 0 &&
              table.getRowModel().rows.map((row) => {
                return (
                  <StyledTableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <StyledTableCell
                          key={cell.id}
                          sx={{ textAlign: "center" }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="h-12 mt-5">
        <Pagination
          showFirstButton
          showLastButton
          count={Math.ceil(Data.length / 10)}
          color="primary"
          hideNextButton={!table.getCanNextPage()}
          hidePrevButton={!table.getCanPreviousPage()}
          onChange={(_, n) => table.setPageIndex(n - 1)}
          variant="outlined"
        />
      </div>
    </div>
  );
};
DataTableMemory = memo(DataTableMemory) as <TColumn, TData>({
  Data,
  column,
  children,
  pageSize,
  color,
}: Props<TColumn, TData>) => JSX.Element;
export default DataTableMemory;
