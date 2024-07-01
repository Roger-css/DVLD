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
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { localDrivingLA_view } from "../../Types/Applications";
type TestData = {
  passedTests: number;
  id: number;
  testTypeId: number;
};
type Props = {
  row: Row<localDrivingLA_view>;
  handleModelData: (id: number) => void;
  handleReadOnly: (value: boolean) => void;
  handleOpenModal: (value: boolean) => void;
  cancelApplication: (id: number) => void;
  deleteApplication: (id: number) => void;
  handleTestsModal: (v: boolean) => void;
  handleTestModalData: (value: TestData) => void;
  handleModalTitle: (title: string) => void;
  handleIssueDLModal: (v: boolean) => void;
  handleLicenseInfoModal: () => void;
  handleLicenseHistoryModal: () => void;
};
const Actions = ({
  row,
  handleModelData,
  handleReadOnly,
  cancelApplication,
  deleteApplication,
  handleTestsModal,
  handleOpenModal,
  handleTestModalData,
  handleModalTitle,
  handleIssueDLModal,
  handleLicenseInfoModal,
  handleLicenseHistoryModal,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [inlineAnchorEl, setInlineAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [dialog, setDialog] = useState<boolean>(false);

  const [dialogDescription, setDialogDescription] = useState<string>("");
  const [dialogButton, setDialogButton] = useState<string>("");
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
                handleModelData(id);
                handleReadOnly(true);
                handleOpenModal(true);
                handleModalTitle("Application Details");
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
                handleModelData(id);
                handleReadOnly(false);
                handleModalTitle("Edit Application");
                handleOpenModal(true);
                setAnchorEl(null);
              }}
              disabled={
                !(row.original.status == "NEW" && row.original.passedTests == 0)
              }
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
                setDialog(true);
                setDialogDescription(
                  `Are you sure you want to delete the application with id = ${id}`
                );
                setDialogButton("Delete");
                setAnchorEl(null);
              }}
              disabled={row.original.passedTests != 0}
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
                row.original.passedTests == 3 || row.original.status != "NEW"
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
                handleIssueDLModal(true);
                handleModelData(id);
                setAnchorEl(null);
              }}
              disabled={
                row.original.passedTests != 3 ||
                row.original.status == "COMPLETED"
              }
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
                handleLicenseInfoModal();
                handleModelData(id);
              }}
              disabled={row.original.status != "COMPLETED"}
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
                handleModelData(id);
                handleLicenseHistoryModal();
                setAnchorEl(null);
              }}
              disabled={row.original.status != "COMPLETED"}
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
                  handleTestsModal(true);
                  handleTestModalData({
                    passedTests: row.original.passedTests,
                    id: row.original.id,
                    testTypeId: 1,
                  });
                  handleModalTitle("Vision Test");
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
                  handleTestsModal(true);
                  handleTestModalData({
                    passedTests: row.original.passedTests,
                    id: row.original.id,
                    testTypeId: 2,
                  });
                  handleModalTitle("Theory Test");
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
                  handleTestsModal(true);
                  handleTestModalData({
                    passedTests: row.original.passedTests,
                    id: row.original.id,
                    testTypeId: 3,
                  });
                  handleModalTitle("Practical Test");
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
          <Button onClick={handleCloseDialog} autoFocus variant="outlined">
            Close
          </Button>
          <Button
            onClick={() => {
              if (dialogButton == "Delete") {
                deleteApplication(id);
              } else {
                cancelApplication(id);
              }
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
};
export default Actions;
