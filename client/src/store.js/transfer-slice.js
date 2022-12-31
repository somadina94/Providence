import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: {},
  showSpinner: false,
  showSecurity: false,
  showIntConfirm: false,
  showPrint: false,
};

const transferSlice = createSlice({
  name: "Transfer",
  initialState,
  reducers: {
    transfer(state, action) {
      state.transactions = action.payload;
    },
    showSpinner(state) {
      state.showSpinner = true;
    },
    hideSpinner(state) {
      state.showSpinner = false;
    },
    showSecurityForm(state) {
      state.showSecurity = true;
    },
    hideSecurityForm(state) {
      state.showSecurity = false;
    },
    showIntConfirmForm(state) {
      state.showIntConfirm = true;
    },
    hideIntConfirmForm(state) {
      state.showIntConfirm = false;
    },
    showPrintPage(state) {
      state.showPrint = true;
    },
    hidePrintPage(state) {
      state.showPrint = false;
    },
  },
});

export const transferActions = transferSlice.actions;

export default transferSlice;
