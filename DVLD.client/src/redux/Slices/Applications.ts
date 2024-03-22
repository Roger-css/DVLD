import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { applicationTypes } from "../../Types/Applications";

type initialStateTy = {
  applicationTypes: applicationTypes[] | null;
};

const initialState: initialStateTy = {
  applicationTypes: null,
};

const Applications = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setApplicationTypes: (state, { payload }) => {
      state.applicationTypes = payload;
    },
  },
});

export const getApplicationTypes = (state: RootState) =>
  state.applications.applicationTypes;
export const { setApplicationTypes } = Applications.actions;
export default Applications.reducer;
