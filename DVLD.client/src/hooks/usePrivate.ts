import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import axios from "../Api/Axios";
import ax from "axios";
import useRefresh from "./useRefresh";

const usePrivate = () => {
  const { getItem } = useLocalStorage("token");
  const refresh = useRefresh();
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (ful) => ful,
      async (err) => {
        if (ax.isCancel(err)) {
          return;
        }
        const pastReq = err?.config;
        if (err?.response?.status == 401 && !pastReq?.sent) {
          const token = await refresh();
          pastReq.headers.Authorization = `Bearer ${token}`;
          pastReq.sent = true;
          return axios(pastReq);
        }
        Promise.reject(err);
      }
    );
    const requestInterceptor = axios.interceptors.request.use(
      (ful) => {
        if (!ful.headers["Authorization"])
          ful.headers.Authorization = `Bearer ${getItem()}`;
        return ful;
      },
      (err) => Promise.reject(err)
    );
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [getItem, refresh]);
  return axios;
};

export default usePrivate;
