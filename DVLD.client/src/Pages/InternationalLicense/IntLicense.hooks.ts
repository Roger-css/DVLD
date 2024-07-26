import { useEffect, useState } from "react";
import { FilterOptions, PageOptions } from "../../Types/Shared";
import { IntLicense } from "../../Types/License";
import usePrivate from "../../hooks/usePrivate";

type GetInternationalLicenses = {
  options: FilterOptions;
  debounceValue: string;
};
export const useGetInternationalLicenses = ({
  debounceValue,
  options,
}: GetInternationalLicenses) => {
  const [pages, setPages] = useState<PageOptions>({
    hasNext: false,
    hasPrev: false,
    totalCount: 0,
  });
  const [licenses, setLicenses] = useState<IntLicense[]>([]);
  const axios = usePrivate();
  useEffect(() => {
    const prepareUrl = (url: string): string => {
      const urlParams = new URLSearchParams();
      if (options.searchTermKey !== "") {
        urlParams.set("SearchTermKey", options.searchTermKey as string);
        urlParams.set("SearchTermValue", debounceValue as string);
      }
      urlParams.set("Page", options.page.toString());
      urlParams.set("PageSize", options.pageSize.toString());
      urlParams.set("orderBy", options.orderBy as string);
      return `${url}?${urlParams.toString()}`;
    };
    const fetchingLicenses = async () => {
      try {
        const response = await axios.get(
          prepareUrl("License/International/All")
        );
        setPages(response.data.page);
        setLicenses(response.data.collection);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingLicenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, options.page, axios, options.pageSize, options.orderBy]);
  return { pages, licenses };
};
