import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  isLoggedIn: false,
  showAdmin: false,
  detailedUser: null,
};

const adminSlice = createSlice({
  name: "ADMIN",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.users;
    },
    displayAdmin(state) {
      state.showAdmin = true;
    },
    setDetailedUser(state, action) {
      state.detailedUser = action.payload.user;
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice;
