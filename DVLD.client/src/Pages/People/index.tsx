import {
  Button,
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
import DataTable from "../../components/DataTable";
import useDebounce from "../../hooks/useDebounce";
import axios from "../../Api/Axios";
import { ColumnDef } from "@tanstack/react-table";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
type person = {
  id: number;
  nationalNo: string;
  name: string;
  birthDate: Date;
  gender: string;
  phone: string;
  email: string;
  nationalityCountry: number;
};
interface Filters {
  [key: string]: string;
  none: "None";
  id: "Id";
  nationalNo: string;
  name: string;
  phone: string;
  email: string;
}
const FilterMode: Filters = {
  none: "None",
  id: "Id",
  nationalNo: "National Number",
  name: "Name",
  phone: "Phone",
  email: "Email",
};
const allFilters = () => {
  const arrOfFilters = [];
  for (const key in FilterMode) {
    arrOfFilters.push(FilterMode[key]);
  }
  return arrOfFilters;
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
  const [DataSet, setDataSet] = useState<person[]>([]);
  const [pages, setPages] = useState({
    totalCount: 0,
    hasPrev: false,
    hasNext: false,
  });
  useEffect(() => {
    const abort = new AbortController();
    const FetchingData = async () => {
      try {
        const FilterString = Object.keys(FilterMode).find(
          (k) => FilterMode[k] === filter
        );
        const Data = await axios.get(
          `Person?${
            filterText
              ? `searchTermKey=${FilterString}&searchTermValue=${filterText}`
              : ""
          }&page=${filterOptions.page}&pageSize=${filterOptions.pageSize}${
            filterOptions.gender != 0 ? `&gender=${filterOptions.gender}` : ""
          }&orderBy=${filterOptions.orderBy}`,
          { signal: abort.signal }
        );
        setDataSet(Data.data.allPeople);
        setPages(Data.data.page);
      } catch (error) {
        console.log(error);
      }
    };
    FetchingData();
    return () => abort.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions, Debounced]);
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
        cell: ({ getValue }) => getValue(),
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
          const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          };
          const handleClose = () => {
            setAnchorEl(null);
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
                  horizontal: "left",
                }}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setModalData(id)}>
                      <ListItemText primary="Show Details" />
                      <ListItemIcon>
                        <PsychologyAltIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <DisplaySettingsIcon />
                    </ListItemIcon>
                    <ListItemButton>
                      <ListItemText primary="Update" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <PersonRemoveIcon />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </div>
          );
        },
      },
    ],
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
                className="h-10 mx-3 text-center text-white rounded-lg outline-none mainColorBg"
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
              {filter !== FilterMode.none && (
                <TextField
                  size="small"
                  placeholder={`Search by ${filter}`}
                  value={filterText}
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
          onClick={() => setOpenModal(true)}
        >
          <PersonAddIcon />
        </Button>
      </section>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div>
          <PersonDetails userId={modalData} />
        </div>
      </Modal>
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
