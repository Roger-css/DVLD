import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Popover,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useEffect, useMemo, useState } from "react";
import PersonDetails from "../../components/PersonDetails";
import DataTable from "../../components/DataTable.Server";
import useDebounce from "../../hooks/useDebounce";
import usePrivate from "../../hooks/usePrivate";
import { ColumnDef } from "@tanstack/react-table";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import { person, personFilters as Filters } from "../../Types/Person";
import allFilters from "../../Helpers/allFilters";
const FilterMode: Filters = {
  none: "None",
  id: "Id",
  nationalNo: "National Number",
  name: "Name",
  phone: "Phone",
  email: "Email",
};

const People = () => {
  const [filter, setFilter] = useState<keyof Filters>(FilterMode.none);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<number | null>(null);
  const [filterText, setFilterText] = useState("");
  const Debounced = useDebounce(filterText);
  const [filterOptions, setFilterOptions] = useState({
    gender: 0,
    page: 1,
    pageSize: 10,
    orderBy: "asc",
  });
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [DataSet, setDataSet] = useState<person[]>([]);
  const [pages, setPages] = useState({
    totalCount: 0,
    hasPrev: false,
    hasNext: false,
  });
  const axios = usePrivate();
  const DeletePerson = async (id: number) => {
    if (!(id > 0)) return;
    try {
      await axios.delete(`person/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const FetchingData = async () => {
      try {
        const FilterString = Object.keys(FilterMode).find(
          (k) => FilterMode[k] === filter
        );
        const gender = filterOptions.gender != 0 ? filterOptions.gender : null;
        const body = {
          SearchTermKey: filterText ? FilterString : "",
          SearchTermValue: filterText,
          page: filterOptions.page,
          pageSize: filterOptions.pageSize,
          gender,
          orderBy: filterOptions.orderBy,
        };
        const response = await axios.post("Person", body, {
          signal: controller.signal,
        });
        if (response) {
          setDataSet(response.data.allPeople);
          setPages(response.data.page);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!openModal) FetchingData();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions, Debounced, openModal]);
  const COLUMNS = useMemo(
    (): ColumnDef<person, unknown>[] => [
      {
        accessorKey: "id",
        header: () => {
          return (
            <Button
              onClick={() =>
                setFilterOptions((p) => ({
                  ...p,
                  orderBy: p.orderBy == "desc" ? "asc" : "desc",
                }))
              }
              sx={{ color: "white", minWidth: "auto" }}
            >
              Id{" "}
              {filterOptions.orderBy == "desc" ? (
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
        accessorKey: "nationalNo",
        header: "National Number",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "name",
        header: "Full Name",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "nationalityCountry",
        header: "Nationality",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "birthDate",
        header: "Date Of Birth",
        cell: ({ getValue }) =>
          new Date(getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return (
            <Tooltip title={value} placement="top-start">
              {value ? (
                <div>{value.slice(0, value.indexOf("@"))}@...</div>
              ) : (
                <div></div>
              )}
            </Tooltip>
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
                        setFilterOptions((p) => ({ ...p }));
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
                  <Button onClick={handleCloseDialog} variant="outlined">
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      DeletePerson(id);
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
    [filterOptions.orderBy]
  );
  return (
    <div className="w-10/12 mx-auto">
      <section className="flex justify-between mt-10 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center ml-6">
            <span>Gender: </span>
            <Select
              value={filterOptions.gender}
              onChange={(e) =>
                setFilterOptions((p) => ({
                  ...p,
                  gender: e.target.value as number,
                }))
              }
              size="small"
              sx={{ ml: "10px" }}
            >
              <MenuItem value={0} defaultChecked>
                All
              </MenuItem>
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
              <MenuItem value={3}>Unknown</MenuItem>
            </Select>
            <div className="flex ml-3">
              <select
                className="h-10 mx-3 text-center text-white rounded-lg outline-none people mainColorBg"
                value={filter}
                onChange={(e) => {
                  setFilterText("");
                  setFilter(e.target.value);
                }}
              >
                {allFilters(FilterMode).map((f, i) => {
                  return (
                    <option className="text-white" key={i} value={f}>
                      {f}
                    </option>
                  );
                })}
              </select>
              {filter !== FilterMode.none && (
                <TextField
                  size="small"
                  placeholder={`Search by ${filter}`}
                  value={filterText}
                  type={filter == FilterMode.id ? "number" : "text"}
                  sx={{ width: "250px" }}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          className="mainColorBg"
          onClick={() => {
            setModalData(null);
            setModalTitle("Add new person");
            setOpenModal(true);
          }}
        >
          <PersonAddIcon />
        </Button>
      </section>
      {openModal && (
        <Modal open={true} onClose={() => setOpenModal(false)}>
          <div>
            <PersonDetails
              title={modalTitle}
              handleClose={setOpenModal}
              readOnly={readOnly}
              userId={modalData}
            />
          </div>
        </Modal>
      )}
      <div>
        <DataTable
          // @ts-expect-error react.Memo problem
          column={COLUMNS}
          Data={DataSet} // MockData
          handleFiltersChange={setFilterOptions}
          pages={pages}
        />
      </div>
    </div>
  );
};

export default People;
