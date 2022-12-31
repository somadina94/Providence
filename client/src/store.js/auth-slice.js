import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
  verified: false,
  securityQuestion: "",
  showSpinner: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.verified = true;
    },

    logOut(state) {
      state.isLoggedIn = false;
      state.securityQuestion = "";
      state.user = {};
      state.verified = false;
    },
    verify(state, action) {
      state.verified = true;
      state.securityQuestion = action.payload.securityQuestion;
      state.verified = false;
    },
    refreshUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.verified = false;
    },
    refreshUserErrorPage(state) {
      state.isLoggedIn = true;
      state.verified = false;
    },
    setSpinner(state) {
      state.showSpinner = true;
    },
    removeSpinner(state) {
      state.showSpinner = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
