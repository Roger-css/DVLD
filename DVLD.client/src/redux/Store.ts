import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Slices/Auth";
import Countries from "./Slices/Countries";
import Applications from "./Slices/Applications";

const store = configureStore({
  reducer: {
    auth: Auth,
    countries: Countries,
    applications: Applications,
  },
  middleware: (def) => def(),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
