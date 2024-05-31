import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Store from "./redux/Store.js";
import { Provider } from "react-redux";
import "./css/index.css";
import "./css/App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
