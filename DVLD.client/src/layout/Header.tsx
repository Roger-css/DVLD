import { useEffect, useState } from "react";
import HeaderCell from "../components/UI/HeaderCell";
import { Avatar, Button, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import { getCurrentUserImage } from "../redux/Slices/Auth";
import ConvertBinaryToImage from "../Utils/ConvertBinaryToImage";
import UserDetails from "../components/Modals/User/UserDetails";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import usePrivate from "../hooks/usePrivate";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import { FaRegNewspaper } from "react-icons/fa";
import { GiPapers } from "react-icons/gi";
import Dls from "./SubHeaderComponents/DLS";
import ManageApplications from "./SubHeaderComponents/ManageApplications";
import ManageDetainLicenses from "./SubHeaderComponents/ManageDetainLicenses";
const Header = () => {
  const Image = useSelector(getCurrentUserImage);
  const { getItem, deleteItem } = useLocalStorage("token");
  const { sub } = jwtDecode(getItem());
  const axios = usePrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);
  const [update, setUpdate] = useState(false);
  // make the colors change when hovering over the list
  const [LiComps, setLiComps] = useState([
    {
      Title: "Application",
      SubList: [
        {
          title: <Dls handleClick={() => handleClick("")} />,
        },
        {
          title: (
            <ManageApplications
              handleClick={() => {
                handleClick("");
              }}
            />
          ),
        },
        {
          title: (
            <ManageDetainLicenses
              handleClick={() => {
                handleClick("");
              }}
            />
          ),
        },
        {
          title: (
            <Button
              startIcon={<FaRegNewspaper />}
              fullWidth
              onClick={() => {
                handleClick("");
                navigate("AppTypes");
              }}
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.54)",
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              Manage Application Types
            </Button>
          ),
        },
        {
          title: (
            <Button
              startIcon={<GiPapers />}
              fullWidth
              onClick={() => {
                handleClick("");
                navigate("TestTypes");
              }}
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.54)",
                display: "flex",
                justifyContent: "space-between",
                pr: "30px",
              }}
            >
              Manage Test Types
            </Button>
          ),
        },
      ],
      focused: false,
      className: "Applications",
      focusedClassName: "ShowingHeaderCellSubList",
      onClick: () => {
        handleClick("Application");
      },
    },
    {
      Title: "People",
      SubList: null,
      focused: false,
      onClick: () => {
        handleClick("People");
      },
    },
    {
      Title: "Users",
      SubList: null,
      focused: false,
      onClick: () => {
        handleClick("Users");
      },
    },
    {
      Title: "Drivers",
      SubList: null,
      focused: false,
      onClick: () => {
        handleClick("Drivers");
      },
    },
    {
      Title: "Account Settings",
      SubList: [
        {
          title: (
            <Button
              endIcon={<DisplaySettingsIcon color="primary" />}
              color="primary"
              fullWidth
              onClick={() => {
                setModal(true);
                setUpdate(false);
              }}
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Account Settings
            </Button>
          ),
          link: "",
        },
        {
          title: (
            <Button
              endIcon={<LockResetIcon color="warning" />}
              color="warning"
              fullWidth
              onClick={() => {
                setModal(true);
                setUpdate(true);
              }}
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Change password
            </Button>
          ),
          link: "",
        },
        {
          title: (
            <Button
              endIcon={<LogoutIcon color="error" />}
              color="error"
              fullWidth
              onClick={() => logout()}
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              LogOut
            </Button>
          ),
          link: "",
        },
      ],
      className: "AccSettings",
      focused: false,
      onClick: () => {
        handleClick("Account Settings");
      },
    },
  ]);
  const logout = async () => {
    try {
      await axios.get("User/Logout");
      deleteItem();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  function handleClick(title: string) {
    setLiComps((prev) =>
      prev.map((item) => {
        if (item.Title === title) {
          item.focused = true;
        } else {
          item.focused = false;
        }
        return item;
      })
    );
  }
  const activeList = () => LiComps.find((e) => e.focused)?.Title;
  useEffect(() => {
    document.getElementById("mainBody")?.addEventListener("click", () => {
      const queryParam = location.pathname.split("/")[2];
      const toGo = queryParam[0].toUpperCase() + queryParam.slice(1);
      handleClick(toGo);
    });
    return () =>
      document.getElementById("mainBody")?.removeEventListener("click", () => {
        const queryParam = location.pathname.split("/")[2];
        const toGo = queryParam[0].toUpperCase() + queryParam.slice(1);
        handleClick(toGo);
      });
  }, [location]);

  return (
    <div className="flex items-center bg-blue-500 shadow-lg h-14 shadow-gray-400/65">
      <Modal open={modal} onClose={() => setModal(false)}>
        <div>
          <UserDetails
            handleClose={setModal}
            title="Current Account"
            userId={parseInt(sub as string)}
            readOnly={!update}
            updatePassword={update}
          />
        </div>
      </Modal>
      <div className="mx-20 text-lg text-neutral-50">LOGO</div>
      <ul className="flex items-center h-full ml-10 grow justify-evenly">
        {LiComps.map((v) => {
          return (
            <HeaderCell
              title={v.Title}
              focused={v.focused}
              activeLi={activeList()}
              handleClick={v.onClick}
              SubList={v.SubList}
              key={v.Title}
              className={v.className}
            />
          );
        })}
      </ul>
      {Image && (
        <Avatar sx={{ mx: "20px" }} src={ConvertBinaryToImage(Image)} />
      )}
    </div>
  );
};

export default Header;
