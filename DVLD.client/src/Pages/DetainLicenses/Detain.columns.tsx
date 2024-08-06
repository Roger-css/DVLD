import { ColumnDef } from "@tanstack/react-table";
import Button from "@mui/material/Button";
import { Dispatch, useState } from "react";
import { FilterOptions, OrderBy } from "../../Types/Shared";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ShortDateString from "../../Utils/ShortDateString";
import { DetainedLicensesView } from "../../Types/License";
import {
  Popover,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
type Props = {
  filterOptions: FilterOptions;
  handleFilterOptions: Dispatch<React.SetStateAction<FilterOptions>>;
  handleReleaseLicense: (num: number) => void;
  handleLicenseInfo: (num: number) => void;
};
export const DetainPageColumns = ({
  handleFilterOptions,
  handleLicenseInfo,
  handleReleaseLicense,
  filterOptions,
}: Props): ColumnDef<DetainedLicensesView, unknown>[] => [
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
          D.Id {filterOptions.orderBy == desc ? <ExpandLess /> : <ExpandMore />}
        </Button>
      );
    },
    cell: ({ getValue }) => getValue(),
    size: 50,
  },
  {
    accessorKey: "licenseId",
    header: "L.Id",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "detainDate",
    header: "D.Date",
    cell: ({ getValue }) => ShortDateString(new Date(getValue() as string)),
  },
  {
    accessorKey: "isReleased",
    header: "Is Released",
    cell: ({ getValue }) => ((getValue() as boolean) == true ? "Yes" : "No"),
  },
  {
    accessorKey: "fineFees",
    header: "Fine Fees",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "releaseDate",
    header: "Release Date",
    cell: ({ getValue }) => {
      const val = getValue();
      return val == undefined
        ? ""
        : ShortDateString(new Date(getValue() as string));
    },
  },
  {
    accessorKey: "nationalNo",
    header: "N.No",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "releaseApplicationId",
    header: "Release App.Id",
    cell: ({ getValue }) => (getValue() == undefined ? -1 : getValue()),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl);
      const id = row.original.licenseId;
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
              vertical: "center",
              horizontal: "left",
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleLicenseInfo(id);
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon>
                    <img src="/driver-license_3783197.png" width={"24px"} />
                  </ListItemIcon>
                  <ListItemText primary="Show L.Info" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  disabled={row.original.isReleased}
                  onClick={() => {
                    handleReleaseLicense(id);
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon>
                    <img src="/ReleaseLicense.png" width={"24px"} />
                  </ListItemIcon>
                  <ListItemText primary="Release License" />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </div>
      );
    },
  },
];
