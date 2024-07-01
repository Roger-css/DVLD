import { ColumnDef } from "@tanstack/react-table";
import { DriversView } from "../../Types/Drivers";
import Button from "@mui/material/Button";
import { Dispatch } from "react";
import { FilterOptions } from "../../Types/Shared";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ShortDateString from "../../Utils/ShortDateString";

const OrderBy = {
  asc: 1,
  desc: 2,
};
type Props = {
  filterOptions: FilterOptions;
  handleFilterOptions: Dispatch<React.SetStateAction<FilterOptions>>;
};
export const DriverColumns = ({
  handleFilterOptions,
  filterOptions,
}: Props): ColumnDef<DriversView, unknown>[] => [
  {
    accessorKey: "id",
    header: () => {
      const { asc, desc } = OrderBy;
      return (
        <Button
          onClick={() =>
            handleFilterOptions((p) => ({
              ...p,
              orderBy: p.orderBy == desc ? asc : desc,
            }))
          }
          sx={{ color: "white", minWidth: "auto" }}
        >
          Id {filterOptions.orderBy == desc ? <ExpandLess /> : <ExpandMore />}
        </Button>
      );
    },
    cell: ({ getValue }) => getValue(),
    size: 50,
  },
  {
    accessorKey: "personId",
    header: "Person Id",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "nationalNo",
    header: "National Number",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => ShortDateString(new Date(getValue() as string)),
  },
  {
    accessorKey: "activeLicense",
    header: "Active License",
    cell: ({ getValue }) => getValue(),
  },
];
