import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { testType } from "../../Types/Test";
type initialStateTy = {
  testTypes: testType[] | null;
};

const initialState: initialStateTy = {
  testTypes: null,
};

const Test = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setTestTypes: (state, { payload }) => {
      state.testTypes = payload;
    },
  },
});

export const getTestTypes = (state: RootState) => state.test.testTypes;
export const { setTestTypes } = Test.actions;
export default Test.reducer;
