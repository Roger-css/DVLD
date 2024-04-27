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
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { ReactNode } from "react";
type FilterOptions = {
  gender: number;
  page: number;
  pageSize: number;
  orderBy: string;
};
type tyPages = {
  totalCount: number;
  hasPrev: boolean;
  hasNext: boolean;
};
type Props<TColumn, TData> = {
  column: ColumnDef<TData, TColumn>[];
  Data: TData[];
  children?: ReactNode;
  handleFiltersChange: React.Dispatch<React.SetStateAction<FilterOptions>>;
  pages: tyPages;
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
const DataTable = <TColumn, TData>({
  Data,
  column,
  children,
  handleFiltersChange,
  pages,
}: // filteringOptions,
// handleFiltersChange,
Props<TColumn, TData>) => {
  const table = useReactTable({
    columns: column,
    data: Data || [],
    getCoreRowModel: getCoreRowModel(),
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
                        padding={
                          typeof header.column.columnDef.header != "string"
                            ? `checkbox`
                            : "normal"
                        }
                        key={header.id}
                        sx={{ textAlign: "center" }}
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
                          sx={{ textAlign: "center" }}
                          key={cell.id}
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
          onChange={(_e, value) =>
            handleFiltersChange((p) => ({ ...p, page: value }))
          }
          count={pages.totalCount}
          color="primary"
          hideNextButton={!pages.hasNext}
          hidePrevButton={!pages.hasPrev}
        />
      </div>
    </div>
  );
};
const memoized = React.memo(DataTable);
export default memoized;
