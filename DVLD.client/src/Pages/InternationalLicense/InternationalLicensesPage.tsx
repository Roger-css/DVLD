import { useMemo, useState } from "react";
import SearchWithFilters, {
  Filters,
} from "../../components/UI/SearchWithFilters";
import { FilterOptions, OrderBy } from "../../Types/Shared";
import useDebounce from "../../hooks/useDebounce";
import { useGetInternationalLicenses } from "./IntLicense.hooks";
import DataTable from "../../components/DataTable.Server";
import { IntLicensesColumns } from "./IntLicenseColumn";
const filters: Filters = [
  { key: "None", value: "" },
  { key: "Driver Id", value: "driverId" },
  { key: "Int.License Id", value: "id" },
  { key: "L.License Id", value: "localLicenseId" },
];
const InternationalLicensesPage = () => {
  const [searchOptions, setSearchOptions] = useState<FilterOptions>({
    page: 1,
    pageSize: 10,
    orderBy: "asc",
    searchTermKey: "",
    searchTermValue: "",
  });
  const debounce = useDebounce(searchOptions.searchTermValue) as string;
  const { licenses, pages } = useGetInternationalLicenses({
    debounceValue: debounce,
    options: searchOptions,
  });
  const columns = useMemo(
    () =>
      IntLicensesColumns({
        orderBy: searchOptions.orderBy as OrderBy,
        handleFilterOptions: setSearchOptions,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchOptions.orderBy]
  );
  return (
    <div className="w-10/12 mx-auto">
      <div className="mt-10 mb-5">
        <SearchWithFilters
          options={searchOptions}
          setOptions={setSearchOptions}
          filters={filters}
        />
      </div>
      <DataTable
        column={columns}
        Data={licenses}
        pages={pages}
        handleFiltersChange={setSearchOptions}
      />
    </div>
  );
};

export default InternationalLicensesPage;
