import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import usePrivate from "../../hooks/usePrivate";
import { localDrivingLA_view } from "../../Types/Applications";
import DataTable from "../../components/DataTable.Server";
import LdlaWithPersonDetails from "../../components/Modals/LdlaWithPersonDetails";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TestAppointment from "../../components/Modals/TestAppointment";
interface Filters {
  [key: string]: string;
  none: string;
  Id: string;
  NationalNo: string;
  FullName: string;
  Status: string;
}
const FilterMode: Filters = {
  none: "None",
  Id: "Id",
  FullName: "Full Name",
  NationalNo: "National No",
  Status: "Status",
};
const allFilters = () => {
  const arrOfFilters = [];
  for (const key in FilterMode) {
    arrOfFilters.push(FilterMode[key]);
  }
  return arrOfFilters;
};
const LocalDrivingLicenseApplication = () => {
  const [filter, setFilter] = useState<keyof Filters>(FilterMode.none);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openTestsModal, setOpenTestsModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<number | null>(null);
  const [testsModalData, setTestsModalData] = useState<{
    passedTests: number;
    id: number;
    testTypeId: number;
  } | null>(null);
  const [filterText, setFilterText] = useState("");
  const Debounced = useDebounce(filterText);
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [DataSet, setDataSet] = useState<localDrivingLA_view[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    gender: 0,
    page: 1,
    pageSize: 10,
    orderBy: "asc",
  });
  const [pages, setPages] = useState({
    totalCount: 0,
    hasPrev: false,
    hasNext: false,
  });
  const axios = usePrivate();
  const cancelApplication = async (id: number) => {
    try {
      const Success = await axios.delete(`Applications/LDLA/cancel/${id}`);
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
        const body = {
          SearchTermKey,
          SearchTermValue: filterText,
          page: filterOptions.page,
          pageSize: filterOptions.pageSize,
          orderBy: filterOptions.orderBy,
        };
        const response = await axios.post("Applications/LDLA/get", body, {
          signal: controller.signal,
        });
        setDataSet(response.data.allLDLAs);
        setPages(response.data.page);
      } catch (error) {
        console.log(error);
      }
    };
    RequestingData();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Debounced, axios, openModal, refreshData, filterOptions, openTestsModal]);
  const COLUMNS = useMemo(
    (): ColumnDef<localDrivingLA_view, unknown>[] => [
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
              {filterOptions.orderBy === "desc" ? (
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
        accessorKey: "drivingClass",
        header: "Driving Class",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "nationalNo",
        header: "National No",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "applicationDate",
        header: "Application Date",
        cell: ({ getValue }) =>
          new Date(getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "passedTests",
        header: "Passed Tests",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => getValue(),
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
            null
          );
          const [inlineAnchorEl, setInlineAnchorEl] =
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useState<HTMLButtonElement | null>(null);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [dialog, setDialog] = useState<boolean>(false);

          const [dialogDescription, setDialogDescription] =
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useState<string>("");
          const [dialogButton, setDialogButton] =
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useState<string>("");
          const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          };
          const handleClose = () => {
            setAnchorEl(null);
          };
          const handleCloseDialog = () => setDialog(false);
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
                  vertical: "center",
                  horizontal: "left",
                }}
              >
                <List sx={{ width: "250px", height: "300px" }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setModalData(id);
                        setReadOnly(true);
                        setOpenModal(true);
                        setModalTitle("Application Details");
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon>
                        <InfoIcon />
                      </ListItemIcon>
                      <ListItemText primary="Show Application Details" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setModalData(id);
                        setReadOnly(false);
                        setModalTitle("Edit Application");
                        setOpenModal(true);
                        setAnchorEl(null);
                      }}
                      disabled={row.original.status != "NEW"}
                    >
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Edit Application" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon>
                        <DeleteForeverIcon />
                      </ListItemIcon>
                      <ListItemText primary="Delete Application" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      disabled={row.original.status !== "NEW"}
                      onClick={() => {
                        setAnchorEl(null);
                        setDialog(true);
                        setDialogDescription(
                          `Are you sure you want to cancel the application with id = ${id}`
                        );
                        setDialogButton("Ok");
                      }}
                    >
                      <ListItemIcon>
                        <DoDisturbAltIcon />
                      </ListItemIcon>
                      <ListItemText primary="Cancel Application" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={(e) => {
                        setInlineAnchorEl(
                          e.currentTarget as unknown as HTMLButtonElement
                        );
                      }}
                      disabled={
                        row.original.passedTests == 3 ||
                        row.original.status != "NEW"
                      }
                    >
                      <ListItemIcon>
                        <PendingActionsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Schedule Tests" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setAnchorEl(null);
                      }}
                      disabled={row.original.passedTests != 3}
                    >
                      <ListItemIcon>
                        <img
                          style={{ marginLeft: "4px" }}
                          src="../../../public/resume_942748.png"
                          width="22px"
                          alt=""
                        />
                      </ListItemIcon>
                      <ListItemText primary="Issue Driving License (first time)" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setAnchorEl(null);
                      }}
                      disabled
                    >
                      <ListItemIcon>
                        <img
                          style={{ marginLeft: "4px" }}
                          src="../../../public/resume_3683248.png"
                          width="22px"
                          alt=""
                        />
                      </ListItemIcon>
                      <ListItemText primary="License Details" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon>
                        <img
                          style={{ marginLeft: "4px" }}
                          src="../../../public/time-management_1572225.png"
                          width="22px"
                          alt=""
                        />
                      </ListItemIcon>
                      <ListItemText primary="Show License History" />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Popover
                  open={Boolean(inlineAnchorEl)}
                  anchorEl={inlineAnchorEl}
                  onClose={() => setInlineAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setOpenTestsModal(true);
                          setTestsModalData({
                            passedTests: row.original.passedTests,
                            id: row.original.id,
                            testTypeId: 1,
                          });
                          setModalTitle("Vision Test");
                        }}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                        disabled={row.original.passedTests != 0}
                      >
                        <ListItemIcon>
                          <img
                            src="../../../public/visionTest.png"
                            alt=""
                            width={"30px"}
                          />
                        </ListItemIcon>
                        <ListItemText primary="Vision Test" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setOpenTestsModal(true);
                          setTestsModalData({
                            passedTests: row.original.passedTests,
                            id: row.original.id,
                            testTypeId: 2,
                          });
                          setModalTitle("Theory Test");
                        }}
                        disabled={row.original.passedTests != 1}
                      >
                        <ListItemIcon>
                          <img
                            src="../../../public/theoryTest.png"
                            alt=""
                            width={"30px"}
                          />
                        </ListItemIcon>
                        <ListItemText primary="Theory Test" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setOpenTestsModal(true);
                          setTestsModalData({
                            passedTests: row.original.passedTests,
                            id: row.original.id,
                            testTypeId: 3,
                          });
                          setModalTitle("Practical Test");
                        }}
                        disabled={row.original.passedTests != 2}
                      >
                        <ListItemIcon>
                          <img
                            src="../../../public/practicalTest.png"
                            alt=""
                            width={"30px"}
                          />
                        </ListItemIcon>
                        <ListItemText primary="Practical Test" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Popover>
              </Popover>
              <Dialog open={dialog}>
                <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {dialogDescription}
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
                      cancelApplication(id);
                      handleCloseDialog();
                    }}
                    autoFocus
                    variant="outlined"
                    color="error"
                  >
                    {dialogButton}
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
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            setModalData(null);
            setReadOnly(false);
            setModalTitle("Add New Local driving license Application");
            setOpenModal(true);
          }}
        >
          <PersonAddIcon />
        </Button>
      </section>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div>
          <LdlaWithPersonDetails
            ldlaId={modalData}
            title={modalTitle}
            handleClose={() => setOpenModal(false)}
            readonly={readOnly}
          />
        </div>
      </Modal>
      <Modal open={openTestsModal} onClose={() => setOpenTestsModal(false)}>
        <div>
          <TestAppointment
            id={testsModalData?.id as number}
            title={modalTitle}
            passedTests={testsModalData?.passedTests as number}
            testTypeId={testsModalData?.testTypeId as number}
          />
        </div>
      </Modal>
      <main>
        <DataTable
          Data={DataSet}
          // @ts-expect-error react.Memo problem
          column={COLUMNS}
          handleFiltersChange={setFilterOptions}
          pages={pages}
        />
      </main>
    </div>
  );
};

export default LocalDrivingLicenseApplication;
