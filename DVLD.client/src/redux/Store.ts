import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Slices/Auth";

const store = configureStore({
  reducer: {
    auth: Auth,
  },
  middleware: (def) => def(),
  devTools: true,
});
export default store;
