import { TextField } from "@mui/material";
import { FilterOptions } from "../../Types/Shared";

export type Filters = { key: string; value: string }[];

type Props = {
  options: FilterOptions;
  setOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  filters: Filters;
};
function GetCurrentFilterKey(allFilters: Filters, filter: string) {
  allFilters.find((e) => e.value === filter);
}
const SearchWithFilters = ({ filters, options, setOptions }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center ml-6">
          <div className="flex ml-3">
            <select
              className="h-10 mx-3 text-center text-white rounded-lg outline-none users mainColorBg"
              value={options.searchTermKey}
              onChange={(e) => {
                setOptions((prev) => ({
                  ...prev,
                  searchTermKey: e.target.value,
                  searchTermValue: "",
                }));
              }}
            >
              {filters.map((f, i) => {
                return (
                  <option className="text-white" key={i} value={f.value}>
                    {f.key}
                  </option>
                );
              })}
            </select>
            {options.searchTermKey !== "" && (
              <TextField
                size="small"
                placeholder={`Search by ${GetCurrentFilterKey(
                  filters,
                  options.searchTermKey as string
                )}`}
                value={options.searchTermValue}
                type={options.searchTermKey?.includes("id") ? "number" : "text"}
                sx={{ width: "250px" }}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    searchTermValue: e.target.value,
                  }))
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWithFilters;
