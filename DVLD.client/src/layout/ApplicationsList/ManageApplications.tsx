import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  handleClick: () => void;
};

const ManageApplications = ({ handleClick }: Props) => {
  const [openList, setOpenList] = useState<boolean>(false);
  const navigate = useNavigate();
  const ExpandList = () => {
    setOpenList(!openList);
  };
  return (
    <div>
      <Button
        startIcon={<img src="../../../public/resume_942748.png" width="18px" />}
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
        Manage Applications
      </Button>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{
              borderBottom: "1px solid rgba(0,0,0,0.25)",
            }}
            onClick={() => {
              handleClick();
              navigate("LocalDrivingLicenseApplications");
            }}
          >
            <ListItemIcon>
              <img
                src="../../../public/Local-driving-license.png"
                width="24px"
                alt=""
              />
            </ListItemIcon>
            <Typography sx={{ color: "rgba(0, 0, 0, 1)", fontSize: "14px" }}>
              Local Driving License Applications
            </Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <img
                src="../../../public/InternationDL.png"
                width="24px"
                alt=""
              />
            </ListItemIcon>
            <Typography sx={{ color: "rgba(0, 0, 0, 1)", fontSize: "14px" }}>
              International Driving License Applications
            </Typography>
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  );
};

export default ManageApplications;
