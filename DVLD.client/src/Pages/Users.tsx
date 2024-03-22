import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Modal,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { user } from "../Types/User";
import usePrivate from "../hooks/usePrivate";
import DataTable from "../components/DataTable.Memory";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import UserDetails from "../components/UserDetails";
interface Filters {
  [key: string]: string;
  none: string;
  Id: string;
  UserName: string;
  FullName: string;
  PersonId: string;
  IsActive: string;
}
const FilterMode: Filters = {
  none: "None",
  Id: "Id",
  PersonId: "Person Id",
  UserName: "User Name",
  FullName: "Full Name",
  IsActive: "Is Active",
};
const allFilters = () => {
  const arrOfFilters = [];
  for (const key in FilterMode) {
    arrOfFilters.push(FilterMode[key]);
  }
  return arrOfFilters;
};
const Index = () => {
  const [filter, setFilter] = useState<keyof Filters>(FilterMode.none);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<number | null>(null);
  const [filterText, setFilterText] = useState("");
  const Debounced = useDebounce(filterText);
  const [activeFilter, setActiveFilter] = useState("3");
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [updatePassword, setUpdatePassword] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [DataSet, setDataSet] = useState<user[]>([]);
  const axios = usePrivate();
  const deleteUser = async (id: number) => {
    try {
      const Success = await axios.delete(`User/${id}`);
      if (Success) setRefreshData(!refreshData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const RequestingData = async () => {
      try {
        let SearchTermKey = Object.keys(FilterMode).find(
          (e) => FilterMode[e] === filter
        );
        SearchTermKey = filter == FilterMode.none ? "" : SearchTermKey;
        const SearchTermValue =
          filter == FilterMode.IsActive ? activeFilter : filterText;
        const body = {
          SearchTermKey: SearchTermKey,
          SearchTermValue,
        };
        const response = await axios.post("User/Get", body, {
          signal: controller.signal,
        });
        if (response) {
          setDataSet(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    RequestingData();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Debounced, activeFilter, refreshData]);
  const COLUMNS = useMemo(
    (): ColumnDef<user, unknown>[] => [
      {
        accessorKey: "id",
        header: ({ header }) => {
          return (
            <Button
              onClick={() =>
                header.column.toggleSorting(
                  header.column.getIsSorted() == "asc"
                )
              }
              sx={{ color: "white", minWidth: "auto" }}
            >
              Id{" "}
              {header.column.getIsSorted() == "desc" ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
              {
                //need some adjustments
              }
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
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "userName",
        header: "User Name",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "isActive",
        header: "Is Active",
        cell: ({ getValue }) => {
          const isActive = getValue() as boolean;
          return (
            <div>
              <CheckBox
                checked={isActive}
                icon={<DarkModeIcon />}
                checkedIcon={<WbSunnyIcon />}
                color={isActive ? "warning" : "default"}
              />
            </div>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
            null
          );
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [openDialog, setOpenDialog] = useState(false);
          const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          };
          const handleClose = () => {
            setAnchorEl(null);
          };
          const handleCloseDialog = () => {
            setOpenDialog(false);
          };
          const handleOpenDialog = () => {
            setOpenDialog(true);
          };
          const open = Boolean(anchorEl);
          const id = row.original.id;
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
                  horizontal: "right",
                }}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setModalData(id);
                        setReadOnly(true);
                        setOpenModal(true);
                        setUpdatePassword(false);
                        setModalTitle("Person Details");
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon>
                        <PsychologyAltIcon />
                      </ListItemIcon>
                      <ListItemText primary="Show details" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setModalData(id);
                        setReadOnly(false);
                        setUpdatePassword(true);
                        setModalTitle("Update person details");
                        setOpenModal(true);
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon>
                        <DisplaySettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Update" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleOpenDialog();
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon>
                        <PersonRemoveIcon />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
              <Dialog open={openDialog}>
                <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete the user with ID {id}?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleCloseDialog}
                    autoFocus
                    variant="outlined"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      deleteUser(id);
                      handleCloseDialog();
                    }}
                    autoFocus
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="w-10/12 mx-auto">
      <section className="flex justify-between mt-10 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center ml-6">
            <div className="flex ml-3">
              <select
                className="h-10 mx-3 text-center text-white rounded-lg outline-none users mainColorBg"
                value={filter}
                onChange={(e) => {
                  setFilterText("");
                  setFilter(e.target.value);
                }}
              >
                {allFilters().map((f, i) => {
                  return (
                    <option className="text-white" key={i} value={f}>
                      {f}
                    </option>
                  );
                })}
              </select>
              {filter !== FilterMode.none && filter !== FilterMode.IsActive && (
                <TextField
                  size="small"
                  placeholder={`Search by ${filter}`}
                  value={filterText}
                  type={
                    filter == FilterMode.Id || filter == FilterMode.PersonId
                      ? "number"
                      : "text"
                  }
                  sx={{ width: "250px" }}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              )}
              {filter == FilterMode.IsActive && (
                <div>
                  <Select
                    size="small"
                    value={activeFilter}
                    label="Age"
                    onChange={(e) => setActiveFilter(e.target.value)}
                  >
                    <MenuItem value={"3"}>All</MenuItem>
                    <MenuItem value={"2"}>not Active</MenuItem>
                    <MenuItem value={"1"}>Active</MenuItem>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            setModalData(null);
            setModalTitle("Add new user");
            setOpenModal(true);
          }}
        >
          <PersonAddIcon />
        </Button>
      </section>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div>
          <UserDetails
            updatePassword={updatePassword}
            title={modalTitle}
            handleClose={setOpenModal}
            readOnly={readOnly}
            userId={modalData}
          />
        </div>
      </Modal>
      <main>
        <DataTable
          Data={DataSet}
          // @ts-expect-error react.Memo problem
          column={COLUMNS}
        />
      </main>
    </div>
  );
};

export default Index;
