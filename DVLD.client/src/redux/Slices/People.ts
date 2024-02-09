import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
type person = {
  id: number;
  nationalNo: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  birthDate: string;
  gender: number;
  address: string;
  phone: string;
  email: string;
  nationalityCountryId: number;
  image?: string;
};

type initialStateTy = {
  allPeople: person[] | null;
};

const initialState: initialStateTy = {
  allPeople: null,
};

const people = createSlice({
  initialState,
  name: "Countries",
  reducers: {
    setAllPeople: (state, payload) => {
      state.allPeople = payload.payload;
    },
  },
});
export const GetAllPeople = (state: RootState) => state.people.allPeople;
export const { setAllPeople } = people.actions;
export type { person };
export default people.reducer;
