import { useMemo, useState } from "react";
import { useGetPaginatedDrivers } from "./Drivers.hooks";
import SearchWithFilters, {
  Filters,
} from "../../components/UI/SearchWithFilters";
import DataTable from "../../components/DataTable.Server";
import { FilterOptions } from "../../Types/Shared";
import { DriverColumns } from "./Columns";

const filters: Filters = [
  {
    key: "None",
    value: "",
  },
  {
    key: "Id",
    value: "id",
  },
  {
    key: "Full Name",
    value: "fullName",
  },
  {
    key: "Person Id",
    value: "personId",
  },
  {
    key: "National No",
    value: "nationalNo",
  },
];

const Drivers = () => {
  const [paginationOptions, setPaginationOptions] = useState<FilterOptions>({
    searchTermKey: "",
    searchTermValue: "",
    page: 1,
    pageSize: 10,
    orderBy: 1,
  });
  const memoisedColumns = useMemo(
    () =>
      DriverColumns({
        filterOptions: paginationOptions,
        handleFilterOptions: setPaginationOptions,
      }),
    [paginationOptions]
  );

  const { drivers, pageOptions } = useGetPaginatedDrivers(paginationOptions);
  return (
    <div className="w-10/12 mx-auto">
      <div className="mt-10 mb-5">
        <SearchWithFilters
          filters={filters}
          options={paginationOptions}
          setOptions={setPaginationOptions}
        />
      </div>
      <DataTable
        handleFiltersChange={setPaginationOptions}
        Data={drivers}
        column={memoisedColumns}
        pages={pageOptions}
      />
    </div>
  );
};

export default Drivers;
