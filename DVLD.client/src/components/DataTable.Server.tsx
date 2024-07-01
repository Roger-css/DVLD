import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, ReactNode, SetStateAction, memo } from "react";
import { StyledTableRow } from "./UI/StyledTableRow";
import { StyledTableCell } from "./UI/StyledTableCell";
import { FilterOptions } from "../Types/Shared";

type tyPages = {
  totalCount: number;
  hasPrev: boolean;
  hasNext: boolean;
};
type Props<TColumn, TData> = {
  column: ColumnDef<TData, TColumn>[];
  Data: TData[];
  children?: ReactNode;
  handleFiltersChange: Dispatch<SetStateAction<FilterOptions>>;
  pages: tyPages;
};
let DataTable = <TColumn, TData>({
  Data,
  column,
  children,
  handleFiltersChange,
  pages,
}: Props<TColumn, TData>) => {
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
DataTable = memo(DataTable) as <TColumn, TData>({
  Data,
  column,
  children,
  handleFiltersChange,
  pages,
}: Props<TColumn, TData>) => JSX.Element;
export default DataTable;
