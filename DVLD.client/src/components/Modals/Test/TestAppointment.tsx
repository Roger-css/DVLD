import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Popover,
  Snackbar,
  Typography,
} from "@mui/material";
import ApplicationInfo from "../Application/ApplicationInfo";
import { useEffect, useMemo, useState } from "react";
import { BasicApplicationInfo } from "../../../Types/Applications";
import usePrivate from "../../../hooks/usePrivate";
import { testAppointment } from "../../../Types/Test";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../DataTable.Memory";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddNewTest from "./AddNewTest";
import { FaEdit } from "react-icons/fa";
import TakeTest from "./TakeTest";
import CloseIcon from "@mui/icons-material/Close";
type TyProps = {
  title: string;
  id: number;
  passedTests: number;
  testTypeId: number;
};

const TestAppointment = ({ title, id, passedTests, testTypeId }: TyProps) => {
  const [applicationDetails, setApplicationDetails] =
    useState<BasicApplicationInfo>({
      applicationId: 0,
      applicationType: "",
      createdBy: "",
      date: "",
      paidFees: 0,
      id: 0,
      licenseClass: "",
      name: "",
      passedTests: passedTests,
      status: "",
      statusDate: "",
    });
  const [appointments, setAppointments] = useState<testAppointment[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openTakeTestModal, setOpenTakeTestModal] = useState<boolean>(false);
  const [dataSet, setDataSet] = useState<testAppointment | null>(null);
  const [refreshData, setRefreshData] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [hasPassed, setHasPassed] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<
    { id: number; date: Date; isLocked: boolean } | undefined
  >(undefined);
  const showSnackBar = (message: string) => {
    setSnackBarMessage(message);
    setOpenSnackBar(true);
  };
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  const axios = usePrivate();
  const isThereAnActiveAppointment = appointments.find((e) => !e.isLocked);
  const trials = appointments.filter((e) => e.isLocked == true).length;
  const scheduleNewTest = () => {
    if (hasPassed) {
      showSnackBar("This Person Has Already Passed The Test");
    } else if (isThereAnActiveAppointment) {
      showSnackBar("There is An Active Appointment");
    } else {
      setAppointmentDetails(undefined);
      setOpenModal(true);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`Tests/Appointments/${testTypeId}/${id}`);
        setApplicationDetails({
          ...data.data,
          passedTests: passedTests,
        });
        setAppointments(data.data.testAppointments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [axios, id, passedTests, refreshData, testTypeId]);
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  const AppointmentsColumns = useMemo(
    (): ColumnDef<testAppointment, unknown>[] => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ getValue }) => getValue(),
        size: 50,
      },
      {
        accessorKey: "appointmentDate",
        header: "Appointment Date",
        cell: ({ getValue }) => {
          return (getValue() as string).substring(0, 10);
        },
      },
      {
        accessorKey: "paidFees",
        header: "Paid Fees",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "isLocked",
        header: "Is Locked",
        cell: ({ getValue }) => (
          <IconButton>
            {getValue() ? <LockIcon /> : <LockOpenIcon />}
          </IconButton>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
            null
          );
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          };
          const handleClose = () => {
            setAnchorEl(null);
          };
          const open = Boolean(anchorEl);
          const data = row.original;
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
                  vertical: -20,
                  horizontal: 50,
                }}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setAppointmentDetails({
                          id: data.id,
                          date: new Date(data.appointmentDate),
                          isLocked: data.isLocked,
                        });
                        setOpenModal(true);
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon>
                        <FaEdit />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setDataSet(data);
                        setOpenTakeTestModal(true);
                      }}
                    >
                      <ListItemIcon>
                        <img src="/public/takeTest.png" alt="" width="20px" />
                      </ListItemIcon>
                      <ListItemText primary="Take Test" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </div>
          );
        },
      },
    ],
    []
  );
  return (
    <main className="ModalBox TestAppointment">
      <Typography sx={{ my: "10px", textAlign: "center" }} variant="h5">
        {title}
      </Typography>
      <ApplicationInfo Details={applicationDetails} />
      <div className="flex justify-between px-6 my-3">
        <Typography variant="h5">Appointments</Typography>
        <Button
          onClick={scheduleNewTest}
          variant="outlined"
          color={isThereAnActiveAppointment ? "error" : "success"}
        >
          Schedule Test
          <CalendarMonthIcon />
        </Button>
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div>
          <AddNewTest
            details={applicationDetails}
            onClose={() => {
              setOpenModal(false);
              setRefreshData(!refreshData);
            }}
            trails={trials}
            testTypeId={testTypeId}
            testDetails={appointmentDetails}
          />
        </div>
      </Modal>
      <Modal
        open={openTakeTestModal}
        onClose={() => {
          setOpenTakeTestModal(false);
        }}
      >
        <div>
          <TakeTest
            details={applicationDetails}
            onClose={() => {
              setOpenTakeTestModal(false);
              setRefreshData(!refreshData);
            }}
            trails={trials}
            appointment={dataSet as testAppointment}
            testTypeId={testTypeId}
            setHasPassed={() => setHasPassed(true)}
          />
        </div>
      </Modal>
      <DataTable
        Data={appointments}
        column={AppointmentsColumns}
        color={isThereAnActiveAppointment ? "#aa2e25" : "#357a38"}
      />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackBarMessage}
        action={action}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      />
    </main>
  );
};

export default TestAppointment;
