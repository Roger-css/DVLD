import { Box, Button, IconButton, Tab, TextField } from "@mui/material";
import PersonDetails from "./PersonDetails";
import { useEffect, useRef, useState } from "react";
import { TabPanelProps } from "@mui/lab/TabPanel/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import usePrivate from "../../hooks/usePrivate";
import { LoginInfo } from "../../Types/User";
import { personFilters as Filters, personInfo } from "../../Types/Person";
import allFilters from "../../Utils/allFilters";
import LoginUserInfo from "./loginUserInfo";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CloseIcon from "@mui/icons-material/Close";
/**
 * need to be updated but I am too lazy to do this
 * the update is using the new DoublyTabs component
 */
type TyProps = {
  userId: number | null;
  readOnly?: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  updatePassword?: boolean;
};
type TyUserLoginInfo = LoginInfo & { isActive: string };
const FilterMode: Filters = {
  none: "None",
  id: "Id",
  nationalNo: "National Number",
  name: "Name",
  phone: "Phone",
  email: "Email",
};
function TabPanel(props: TabPanelProps) {
  const { children, value, tabIndex, style } = props;
  const intValue = parseInt(value);
  return (
    <div role="tabpanel" hidden={intValue != tabIndex} style={style}>
      {intValue == tabIndex && <Box>{children}</Box>}
    </div>
  );
}

const UserDetails = ({
  title,
  userId,
  handleClose,
  readOnly,
  updatePassword,
}: TyProps) => {
  const [tab, setTab] = useState<number>(0);
  const [dataSet, setDataSet] = useState<personInfo | null>(null);
  const [userLoginInfo, setUserLoginInfo] = useState<TyUserLoginInfo | null>(
    null
  );
  const [filter, setFilter] = useState<keyof Filters>(FilterMode.none);
  const [filterText, setFilterText] = useState("");
  const axios = usePrivate();
  const filterTextRef = useRef<HTMLInputElement>(null);
  const refCopy = filterTextRef.current;
  const SubmitButtonRef = useRef<HTMLButtonElement>(null);
  const personDataFetch = () => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        if (filterText == "") {
          setDataSet(null);
          setUserLoginInfo(null);
          return;
        }
        const FilterString = Object.keys(FilterMode).find(
          (k) => FilterMode[k] === filter
        );
        const body = {
          SearchTermKey: filterText ? FilterString : "",
          SearchTermValue: filterText,
        };
        const response = await axios.post("Person/Get", body, {
          signal: controller.signal,
        });
        if (!response) {
          throw new Error();
        }
        if (response) {
          const { data } = response;
          setDataSet(data);
        }
      } catch (error) {
        setDataSet(null);
        setUserLoginInfo(null);
      }
    };
    fetchData();
  };
  const handleSubmit = async (e: TyUserLoginInfo) => {
    try {
      const controller = new AbortController();
      const body = {
        UserName: e.userName,
        Password: e.password,
        Id: dataSet?.id,
        IsActive: e.isActive == "1" ? true : false,
      };
      let Data;
      if (!updatePassword) {
        Data = await axios.post(`User/Add`, body, {
          signal: controller.signal,
        });
      } else {
        Data = await axios.put(`User/Update`, body, {
          signal: controller.signal,
        });
      }
      if (!Data) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleClose(false);
    }
  };
  function ListenToEnterKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      SubmitButtonRef.current?.click();
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const body = {
          SearchTermKey: "Id",
          SearchTermValue: userId?.toString(),
        };
        const { data } = await axios.post("User/get/single", body, {
          signal: controller.signal,
        });
        setDataSet(data.person);
        setUserLoginInfo({
          id: data.id,
          userName: data.userName,
          password: data.password,
          isActive: data.isActive == true ? "1" : "0",
        });
      } catch (error) {
        console.log(error);
      }
    };
    userId && fetchData();
    const RefCopy = filterTextRef.current;
    if (RefCopy) {
      RefCopy.addEventListener("keypress", ListenToEnterKey);
    }
    return () => {
      controller.abort();
      RefCopy?.removeEventListener("keypress", ListenToEnterKey);
    };
  }, [axios, userId, refCopy]);

  return (
    <div className="ModalBox">
      <h1 className="text-2xl text-center">{title}</h1>
      <div></div>
      <TabContext value={tab}>
        <div className="flex justify-between">
          <TabList onChange={(_, v) => (dataSet ? setTab(v) : false)}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
          </TabList>
          <Button
            sx={{
              mr: "15px",
              width: "35px",
              height: "30px",
              padding: 0,
              minWidth: 0,
            }}
            variant="contained"
            color="error"
            onClick={() => handleClose(false)}
          >
            <CloseIcon />
          </Button>
        </div>
        <TabPanel value="0" tabIndex={tab}>
          <div className="flex justify-between px-5 my-4">
            <div className="w-3/6">
              <select
                className="h-10 mr-4 text-center text-white rounded-lg outline-none people mainColorBg"
                disabled={userId !== null}
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
                  ref={filterTextRef}
                />
              )}
            </div>
            <div className="w-3/6 pl-5">
              <IconButton
                onClick={() => personDataFetch()}
                color="default"
                disabled={userId !== null}
                ref={SubmitButtonRef}
              >
                <PersonSearchIcon fontSize="large" color="action" />
              </IconButton>
            </div>
          </div>
          <PersonDetails
            title=""
            personId={null}
            readOnly
            modal={false}
            details={dataSet}
            sx={{ py: "8px" }}
          >
            <Button
              color={dataSet ? "success" : "error"}
              size="large"
              sx={{ ml: "20px", mt: "40px" }}
              variant="contained"
              type="submit"
              onClick={() => (dataSet ? setTab(1) : false)}
            >
              Next
            </Button>
          </PersonDetails>
        </TabPanel>
        <TabPanel value="1" tabIndex={tab}>
          <LoginUserInfo
            details={userLoginInfo}
            readOnly={readOnly}
            update={updatePassword}
            handleChange={handleSubmit}
          />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default UserDetails;
