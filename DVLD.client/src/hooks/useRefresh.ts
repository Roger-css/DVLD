import axios from "../Api/Axios";
import useLocalStorage from "./useLocalStorage";

const useRefresh = () => {
  const { getItem, setItem } = useLocalStorage("token");
  const refresh = async () => {
    const response = await axios.post("User/Refresh", { token: getItem() });
    setItem(response.data.token);
    return response.data.token;
  };
  return refresh;
};

export default useRefresh;
