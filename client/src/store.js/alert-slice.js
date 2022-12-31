import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", status: "", showModal: false };

const alertSlice = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    setState(state, action) {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.showModal = true;
    },
    resetState(state) {
      state.showModal = false;
      // setTimeout(() => {
      //   state.status = "";
      //   state.message = "";
      // }, 1000);
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
