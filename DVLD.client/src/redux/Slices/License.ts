import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { licenseClass } from "../../Types/License";

type initialStateTy = {
  licenseClasses: licenseClass[] | null;
};

const initialState: initialStateTy = {
  licenseClasses: null,
};

const license = createSlice({
  initialState,
  name: "license",
  reducers: {
    setLicenseClasses: (state, { payload }) => {
      state.licenseClasses = payload;
    },
  },
});

export const getLicenseClasses = (state: RootState) =>
  state.license.licenseClasses;
export const { setLicenseClasses } = license.actions;
export default license.reducer;
