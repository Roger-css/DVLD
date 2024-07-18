import { ColumnDef } from "@tanstack/react-table";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button } from "@mui/material";
import { LicenseView } from "../../../Types/License";

export const Columns: ColumnDef<LicenseView, unknown>[] = [
  {
    accessorKey: "id",
    header: ({ header }) => {
      return (
        <Button
          onClick={() =>
            header.column.toggleSorting(header.column.getIsSorted() == "asc")
          }
          sx={{ color: "white", minWidth: "auto" }}
        >
          Id{" "}
          {header.column.getIsSorted() == "desc" ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
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
    accessorKey: "className",
    header: "Class Name",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
];
