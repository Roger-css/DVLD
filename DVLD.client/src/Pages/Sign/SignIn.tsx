import {
  Box,
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import axios from "../../Api/Axios";
function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const SendData = async (): Promise<void> => {
    try {
      const response = await axios.post("/User/Login", {
        UserName: userName,
        Password: password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
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
        }}
      >
        <Typography variant="h6" mt={"20px"} textAlign={"center"}>
          LOGIN
        </Typography>
        <Typography variant="h5" textAlign={"center"}>
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
                  {password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label={"Remember me"}
            sx={{ color: "black", mt: "10px", ml: "5px" }}
          />

          <Stack display={"flex"} flexDirection={"row-reverse"}>
            <Button
              sx={{ mt: "30px", mr: "10px" }}
              size="large"
              variant="contained"
              onClick={SendData}
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
