import { ColumnDef } from "@tanstack/react-table";
import Button from "@mui/material/Button";
import { Dispatch } from "react";
import { FilterOptions, OrderBy } from "../../Types/Shared";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ShortDateString from "../../Utils/ShortDateString";
import { IntLicense } from "../../Types/License";

type Props = {
  orderBy: OrderBy;
  handleFilterOptions: Dispatch<React.SetStateAction<FilterOptions>>;
};
export const IntLicensesColumns = ({
  handleFilterOptions,
  orderBy,
}: Props): ColumnDef<IntLicense, unknown>[] => [
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
          Id {orderBy == desc ? <ExpandLess /> : <ExpandMore />}
        </Button>
      );
    },
    cell: ({ getValue }) => getValue(),
    size: 50,
  },
  {
    accessorKey: "applicationId",
    header: "Application Id",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "driverId",
    header: "Driver Id",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "issueUsingLocalDrivingLicenseId",
    header: "L.License Id",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ getValue }) => ShortDateString(new Date(getValue() as string)),
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
    cell: ({ getValue }) => ShortDateString(new Date(getValue() as string)),
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
    cell: ({ getValue }) => ((getValue() as boolean) == true ? "Yes" : "No"),
  },
];
