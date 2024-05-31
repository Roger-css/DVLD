import { useNavigate } from "react-router-dom";
import axios from "../../Api/Axios";
import useLocalStorage from "../../hooks/useLocalStorage";

export const useLogin = async ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}): Promise<void> => {
  const { setItem: SetAccessToken } = useLocalStorage("token");
  const navigate = useNavigate();
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
