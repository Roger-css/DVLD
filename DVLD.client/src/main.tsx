import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Store from "./redux/Store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./css/index.css";
import "./css/App.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
