import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: localStorage.getItem("name"),
  email: localStorage.getItem("email"),
  openModal: localStorage.getItem("name") == null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("email", action.payload.email);
      state.openModal = false;
    },
    openAddUserDetailModal: (state) => {
      state.openModal = true;
    },
    editDetails: (state) => {
      state.showAddModal = false;
    },
    logoutUser: (state) => {
      state.name = null;
      state.email = null;
      state.notes = [];
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("notes");
      state.openModal = true;
    },
  },
  extraReducers: (builder) => {},
});

export const { addDetails, editDetails, openAddUserDetailModal, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
