import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Slices/Auth";
import Countries from "./Slices/Countries";
import Applications from "./Slices/Applications";
import Tests from "./Slices/Tests";
import License from "./Slices/License";

const store = configureStore({
  reducer: {
    auth: Auth,
    countries: Countries,
    applications: Applications,
    test: Tests,
    license: License,
  },
  middleware: (def) => def(),
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
