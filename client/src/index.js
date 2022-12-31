import React from "react";
import ReactDOM from "react-dom/client";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store.js";
import store from "./store.js";

import "./index.css";
import App from "./App";
import { BackdropContextProvider } from "./components/store/backdrop-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <BackdropContextProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BackdropContextProvider>
  </CookiesProvider>
);
