import { useState, useEffect } from "react";
import { FilterOptions, PageOptions } from "../Types/Shared";
import useDebounce from "./useDebounce";
import usePrivate from "./usePrivate";

export const useGetPaginatedEntity = <T>(
  filters: FilterOptions,
  url: string
) => {
  const [entity, setEntity] = useState<T[]>([]);
  const [pageOptions, setPageOptions] = useState<PageOptions>({
    hasNext: false,
    hasPrev: false,
    totalCount: 0,
  });
  const debouncedSearch = useDebounce(filters.searchTermValue);
  const axios = usePrivate();
  useEffect(() => {
    const prepareParams = () => {
      const searchParams = new URLSearchParams();
      if (debouncedSearch != "") {
        searchParams.set("searchTermKey", filters.searchTermKey as string);
        searchParams.set("searchTermValue", debouncedSearch as string);
      }
      searchParams.set("page", filters.page.toString());
      searchParams.set("pageSize", filters.pageSize.toString());
      searchParams.set("orderBy", (filters.orderBy as number).toString());
      return searchParams.toString();
    };
    const fetchingEntity = async () => {
      try {
        const searchParams = prepareParams();
        const response = await axios.get(`${url}?${searchParams}`);
        setEntity(response.data.collection);
        setPageOptions(response.data.page);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingEntity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.page,
    filters.pageSize,
    filters.orderBy,
    axios,
    debouncedSearch,
    url,
  ]);
  return { entity, pageOptions };
};
