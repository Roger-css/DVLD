import { useNavigate } from "react-router-dom";
import axios from "../../Api/Axios";
import useLocalStorage from "../../hooks/useLocalStorage";
type LoginProps = {
  userName: string;
  password: string;
};
export const useLogin = () => {
  const { setItem: SetAccessToken } = useLocalStorage("token");
  const navigate = useNavigate();
  const login = async ({ userName, password }: LoginProps) => {
    try {
      const response = await axios.post("/User/Login", {
        UserName: userName,
        Password: password,
      });
      if (response.data.result) {
        SetAccessToken(response.data.token);
        navigate("home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return login;
};
