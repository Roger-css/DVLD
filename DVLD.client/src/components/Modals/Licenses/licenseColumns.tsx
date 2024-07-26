import { ColumnDef } from "@tanstack/react-table";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Popover,
} from "@mui/material";
import { LicenseView } from "../../../Types/License";
import ShortDateString from "../../../Utils/ShortDateString";
import { useState } from "react";
import LocalLicenseInfo from "./LocalLicenseInfo";

export const localLicensesColumns: ColumnDef<LicenseView, unknown>[] = [
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
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [showLicenseDetails, setShowLicenseDetails] = useState(false);
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl);
      const applicationId = row.original.applicationId;
      return (
        <div>
          <Button
            onClick={handleClick}
            sx={{ color: "black", fontSize: "20px", pt: "0" }}
          >
            ...
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: -54,
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setShowLicenseDetails(true);
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="/public/driver-license_3783197.png"
                      alt=""
                      width="32px"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Show License" />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
          <Modal
            open={showLicenseDetails}
            onClose={() => setShowLicenseDetails(false)}
          >
            <div className="ModalBox">
              <LocalLicenseInfo applicationId={applicationId} />
            </div>
          </Modal>
        </div>
      );
    },
  },
];
export const internationalLicensesColumns: ColumnDef<LicenseView, unknown>[] = [
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
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
];
