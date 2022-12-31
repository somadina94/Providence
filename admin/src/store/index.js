import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import authSlice from "./auth-slice";
import alertSlice from "./alert-slice";
import adminSlice from "./admin-slice";
import spinnerSlice from "./spinner-slice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  alert: alertSlice.reducer,
  admin: adminSlice.reducer,
  spinner: spinnerSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
