import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
type country = {
  id: number;
  countryName: string;
};

type initialStateTy = {
  allCountries: country[] | null;
};

const initialState: initialStateTy = {
  allCountries: null,
};

const countries = createSlice({
  initialState,
  name: "Countries",
  reducers: {
    setAllCountries: (state, payload) => {
      state.allCountries = payload.payload;
    },
  },
});
export const getAllCountries = (state: RootState) =>
  state.countries.allCountries;
export const { setAllCountries } = countries.actions;
export default countries.reducer;
