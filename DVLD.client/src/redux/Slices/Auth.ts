import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { userInfo as user } from "../../Types/User";

type initialStateTy = {
  userInfo: user | null;
};

const initialState: initialStateTy = {
  userInfo: null,
};

const Auth = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});
export const getCurrentUserInfo = (state: RootState) => state.auth.userInfo;
export const getCurrentUserImage = (state: RootState) =>
  state.auth.userInfo?.person?.image;
export const { setUserInfo } = Auth.actions;
export default Auth.reducer;
