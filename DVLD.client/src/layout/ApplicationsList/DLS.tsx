import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Popover,
} from "@mui/material";
import { useState } from "react";
import { TbLicense } from "react-icons/tb";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LdlaWithPersonDetails from "../../components/Modals/LdlaWithPersonDetails";
type Props = {
  handleClick: () => void;
};
const DlServices = ({ handleClick }: Props) => {
  const [openList, setOpenList] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const ExpandList = () => {
    setOpenList(!openList);
  };
  return (
    <div>
      <Button
        startIcon={<TbLicense />}
        fullWidth
        onClick={ExpandList}
        sx={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "rgba(0, 0, 0, 0.54)",
          display: "flex",
          justifyContent: "space-between",
        }}
        endIcon={openList ? <ExpandLess /> : <ExpandMore />}
      >
        Driving License Services
      </Button>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              pl: 4,
              pr: "-10px",
              borderBottom: "1px solid rgba(0,0,0,0.25)",
            }}
            onClick={(e) =>
              setAnchorEl(e.currentTarget as unknown as HTMLButtonElement)
            }
          >
            <ListItemText
              primary="New Driving License"
              sx={{ color: "rgba(0, 0, 0, 1)" }}
            />
            <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItemButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ListItemIcon>
                    <img
                      src="../../../public/driver-license_3783197.png"
                      alt=""
                      width={"30px"}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Local Driving License" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="../../../public/driving-license_6553732.png"
                      alt=""
                      width={"30px"}
                    />
                  </ListItemIcon>
                  <ListItemText primary="International Driving License" />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
          <ListItemButton
            sx={{ pl: 4, borderBottom: "1px solid rgba(0,0,0,0.25)" }}
          >
            <ListItemText
              primary="Renew Driving License"
              sx={{ color: "rgba(0, 0, 0, 1)" }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4, borderBottom: "1px solid rgba(0,0,0,0.25)" }}
          >
            <ListItemText
              primary="Replacement for lost or damaged driving license"
              sx={{ color: "rgba(0, 0, 0, 1)", textTransform: "capitalize" }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4, borderBottom: "1px solid rgba(0,0,0,0.25)" }}
          >
            <ListItemText
              primary="Release Detained Driving License"
              sx={{ color: "rgba(0, 0, 0, 1)" }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4, borderBottom: "1px solid rgba(0,0,0,0.25)" }}
          >
            <ListItemText
              primary="Retake Test"
              sx={{ color: "rgba(0, 0, 0, 1)" }}
            />
          </ListItemButton>
        </List>
      </Collapse>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div>
          <LdlaWithPersonDetails
            handleClose={() => {
              setAnchorEl(null);
              setOpenModal(false);
              setOpenList(false);
              handleClick();
            }}
            title="Create new Local Driving Application"
          />
        </div>
      </Modal>
    </div>
  );
};

export default DlServices;
