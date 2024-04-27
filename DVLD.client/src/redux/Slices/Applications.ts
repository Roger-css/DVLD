import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { applicationTypes } from "../../Types/Applications";

type initialStateTy = {
  applicationTypes: applicationTypes[] | null;
};

const initialState: initialStateTy = {
  applicationTypes: null,
};

const applications = createSlice({
  initialState,
  name: "application",
  reducers: {
    setApplicationTypes: (state, { payload }) => {
      state.applicationTypes = payload;
    },
  },
});

export const getApplicationTypes = (state: RootState) =>
  state.applications.applicationTypes;
export const { setApplicationTypes } = applications.actions;
export default applications.reducer;
