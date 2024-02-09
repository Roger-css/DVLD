import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Slices/Auth";
import Countries from "./Slices/Countries";
import People from "./Slices/People";

const store = configureStore({
  reducer: {
    auth: Auth,
    countries: Countries,
    people: People,
  },
  middleware: (def) => def(),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
