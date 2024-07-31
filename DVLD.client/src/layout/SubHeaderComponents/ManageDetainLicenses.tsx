import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DetainLicense from "../../components/Modals/Licenses/Detain/DetainLicense";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

type Props = {
  handleClick: () => void;
};

const ManageDetainLicenses = ({ handleClick }: Props) => {
  const [openList, setOpenList] = useState<boolean>(false);
  const [openDetainLicense, setOpenDetainLicense] = useState<boolean>(false);
  const ExpandList = () => {
    setOpenList(!openList);
  };
  const handleClose = () => {
    setOpenDetainLicense(false);
    handleClick();
  };
  return (
    <div>
      <Button
        startIcon={<img src="/public/DetainLicense.png" width="18px" />}
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
        Detain Licenses
      </Button>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              borderBottom: "1px solid rgba(0,0,0,0.25)",
            }}
            onClick={() => {}}
          >
            <ListItemIcon>
              <img src="/public/Detain.png" width="24px" alt="" />
            </ListItemIcon>
            <Typography sx={{ color: "rgba(0, 0, 0, 1)", fontSize: "14px" }}>
              Manage Detain Licenses
            </Typography>
          </ListItemButton>
          <ListItemButton
            sx={{
              borderBottom: "1px solid rgba(0,0,0,0.25)",
            }}
            onClick={() => {
              setOpenDetainLicense(true);
            }}
          >
            <ListItemIcon>
              <img src="/public/DetainLicense.png" width="18px" />
            </ListItemIcon>
            <Typography sx={{ color: "rgba(0, 0, 0, 1)", fontSize: "14px" }}>
              Detain License
            </Typography>
          </ListItemButton>
          <ListItemButton onClick={() => {}}>
            <ListItemIcon>
              <img src="/public/ReleaseLicense.png" width="24px" alt="" />
            </ListItemIcon>
            <Typography sx={{ color: "rgba(0, 0, 0, 1)", fontSize: "14px" }}>
              Release Detained License
            </Typography>
          </ListItemButton>
        </List>
      </Collapse>
      <Modal open={openDetainLicense} onClose={handleClose}>
        <div>
          <DetainLicense handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default ManageDetainLicenses;
