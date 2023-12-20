import { createSlice } from "@reduxjs/toolkit";

type initialStateTy = {
  jwt: null | string;
};

const initialState: initialStateTy = {
  jwt: null,
};

const Auth = createSlice({
  initialState,
  name: "auth",
  reducers: {},
});
export default Auth.reducer;
