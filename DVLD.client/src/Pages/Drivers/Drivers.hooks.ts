import { useEffect, useState } from "react";
import usePrivate from "../../hooks/usePrivate";
import { DriversView } from "../../Types/Drivers";
import { FilterOptions, PageOptions } from "../../Types/Shared";
import useDebounce from "../../hooks/useDebounce";

export const useGetPaginatedDrivers = (options: FilterOptions) => {
  const [drivers, setDrivers] = useState<DriversView[]>([]);
  const [pageOptions, setPageOptions] = useState<PageOptions>({
    hasNext: false,
    hasPrev: false,
    totalCount: 0,
  });
  const debouncedSearch = useDebounce(options.searchTermValue);
  const axios = usePrivate();
  useEffect(() => {
    const prepareParams = () => {
      const searchParams = new URLSearchParams();
      if (debouncedSearch != "") {
        searchParams.set("searchTermKey", options.searchTermKey as string);
        searchParams.set("searchTermValue", options.searchTermValue as string);
      }
      searchParams.set("page", options.page.toString());
      searchParams.set("pageSize", options.pageSize.toString());
      searchParams.set("orderBy", (options.orderBy as number).toString());
      return searchParams.toString();
    };
    const fetchingDrivers = async () => {
      try {
        const searchParams = prepareParams();
        const response = await axios.get(`Driver/All?${searchParams}`);
        setDrivers(response.data.collection);
        setPageOptions(response.data.page);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingDrivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options.page,
    options.pageSize,
    options.orderBy,
    axios,
    debouncedSearch,
    setDrivers,
  ]);
  return { drivers, pageOptions };
};
