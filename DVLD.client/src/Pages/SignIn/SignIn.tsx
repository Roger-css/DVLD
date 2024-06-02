import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useLogin } from "./SingIn.hooks";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Paper,
  Typography,
  InputLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Stack,
  Button,
} from "@mui/material";
import isObjectEmpty from "../../Utils/IsObjEmpty";
import { useLoaderData } from "react-router-dom";
type UserInfo = { UserName: string; Password: string };
function SignIn() {
  const loader = useLoaderData();
  console.log(loader);
  const Login = useLogin();
  const {
    getItem: getUserInfo,
    setItem: setUserInfo,
    deleteItem: deleteUserInfo,
  } = useLocalStorage("user");
  const UserInfo: UserInfo | undefined = getUserInfo();
  const [userName, setUserName] = useState(UserInfo?.UserName ?? "");
  const [password, setPassword] = useState(UserInfo?.Password ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    isObjectEmpty(UserInfo) ? false : true
  );
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const HandleSubmit = () => {
    if (rememberMe) {
      setUserInfo({
        UserName: userName,
        Password: password,
      });
    } else {
      deleteUserInfo();
    }
    Login({ userName, password });
  };
  const rememberMeHandler = (): void => setRememberMe((prev) => !prev);
  return (
    <Box
      sx={{
        bgcolor: "#2553ff",
        minHeight: "100vh",
        display: "grid",
        placeContent: "center",
        px: "10px",
      }}
    >
      <Paper
        variant="elevation"
        sx={{
          marginTop: "40px",
          height: "500px",
          maxWidth: "400px",
          minWidth: "250px",
          bgcolor: "white",
          color: "#2553ff",
          px: "15px",
          pt: "15px",
          borderRadius: "16px",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
        }}
      >
        <Typography variant="h6" mt={"20px"} textAlign={"center"}>
          LOGIN
        </Typography>
        <Typography variant="h5" fontWeight={"700"} textAlign={"center"}>
          YOUR ACCOUNT
        </Typography>
        <Box sx={{ mt: "60px" }}>
          <InputLabel className="pl-4" htmlFor="LoginUser">
            User name
          </InputLabel>
          <TextField
            id="LoginUser"
            autoFocus
            required
            variant="outlined"
            color="primary"
            sx={{ mb: "20px" }}
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputLabel className="pl-4" htmlFor="LoginPassword">
            Password
          </InputLabel>
          <OutlinedInput
            id="LoginPassword"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            color="primary"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label={"Remember me"}
            sx={{ color: "black", mt: "10px", ml: "5px" }}
            checked={rememberMe}
            onChange={rememberMeHandler}
          />
          <Stack display={"flex"} flexDirection={"row-reverse"}>
            <Button
              sx={{ mt: "30px", mr: "10px" }}
              size="large"
              variant="contained"
              onClick={HandleSubmit}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default SignIn;
