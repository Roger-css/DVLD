import { useMemo, useState } from "react";
import SearchWithFilters, {
  Filters,
} from "../../components/UI/SearchWithFilters";
import DataTable from "../../components/DataTable.Server";
import { FilterOptions } from "../../Types/Shared";
import { DriverColumns } from "./Columns";
import { useGetPaginatedEntity } from "../../hooks/FetchPaginatedEntity";
import { DriversView } from "../../Types/Drivers";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationOptions.orderBy]
  );

  const { entity: drivers, pageOptions } = useGetPaginatedEntity<DriversView>(
    paginationOptions,
    "Driver/All"
  );
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
