import { Button, IconButton, TextField } from "@mui/material";
import PersonDetails from "./PersonDetails";
import { ReactNode, useEffect, useRef, useState } from "react";
import usePrivate from "../../hooks/usePrivate";
import { personFilters as Filters, personInfo } from "../../Types/Person";
import allFilters from "../../Utils/allFilters";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
type TyProps = {
  title?: string;
  children?: ReactNode;
  setTab?: React.Dispatch<React.SetStateAction<number>>;
  setId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  id?: number;
  readonly?: boolean;
  Details?: personInfo;
};

const FilterMode: Filters = {
  none: "None",
  id: "Id",
  nationalNo: "National Number",
  name: "Name",
  phone: "Phone",
  email: "Email",
};

const PersonDetailsWithSearch = ({
  children,
  title,
  setTab,
  setId,
  id,
  readonly,
  Details,
}: TyProps) => {
  const [dataSet, setDataSet] = useState<personInfo | null>(null);
  const [filter, setFilter] = useState<keyof Filters>(FilterMode.none);
  const [filterText, setFilterText] = useState("");
  const axios = usePrivate();
  const filterTextRef = useRef<HTMLInputElement>(null);
  const refCopy = filterTextRef.current;
  const SubmitButtonRef = useRef<HTMLButtonElement>(null);
  const fetchData = async (filters?: {
    myFilter: string;
    myFilterText: string;
  }) => {
    const controller = new AbortController();
    try {
      if (!filters?.myFilter && filterText == "") {
        setDataSet(null);
        return;
      }
      const FilterString = Object.keys(FilterMode).find(
        (k) => FilterMode[k] === filter
      );
      let body = {
        SearchTermKey: filterText ? FilterString : "",
        SearchTermValue: filterText,
      };
      if (filters) {
        body = {
          SearchTermKey: filters.myFilter,
          SearchTermValue: filters.myFilterText,
        };
      }
      const { data } = await axios.post("Person/Get", body, {
        signal: controller.signal,
      });
      setDataSet(data);
      if (setId) setId(data.id);
    } catch (error) {
      setDataSet(null);
    }
  };
  function ListenToEnterKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      SubmitButtonRef.current?.click();
    }
  }
  useEffect(() => {
    const FetchingData = async () => {
      setFilterText(id?.toString() as string);
      setFilter(FilterMode.id);
      await fetchData({
        myFilter: FilterMode.id,
        myFilterText: id?.toString() as string,
      });
    };
    Details ? setDataSet(Details) : id ? FetchingData() : false;
    const RefCopy = filterTextRef.current;
    if (RefCopy) {
      RefCopy.addEventListener("keypress", ListenToEnterKey);
    }
    return () => {
      RefCopy?.removeEventListener("keypress", ListenToEnterKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axios, id, refCopy]);
  return (
    <div>
      {title && <h1 className="text-2xl text-center">{title}</h1>}
      <div className="flex justify-between px-5 my-4">
        <div className="w-3/5">
          <select
            disabled={readonly}
            className="h-10 mr-4 text-center text-white rounded-lg outline-none people mainColorBg"
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
              disabled={readonly}
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
            onClick={() => fetchData()}
            color="default"
            ref={SubmitButtonRef}
          >
            <PersonSearchIcon fontSize="large" color="action" />
          </IconButton>
        </div>
      </div>
      <PersonDetails
        title=""
        readOnly
        modal={false}
        details={dataSet}
        sx={{ py: "8px" }}
      >
        {setTab && (
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
        )}
      </PersonDetails>
      <div>{children}</div>
    </div>
  );
};

export default PersonDetailsWithSearch;
