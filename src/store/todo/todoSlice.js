import { createSlice } from "@reduxjs/toolkit";

if (!localStorage.getItem("notes")) {
  localStorage.setItem("notes", JSON.stringify([]));
}

const initialState = {
  notesList: JSON.parse(localStorage.getItem("notes")),
  isLoading: false,
  showAddModal: false,
  showEditModal: null,
  showDesc: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.showAddModal = true;
    },
    closeAddModal: (state) => {
      state.showAddModal = false;
    },
    openEditModal: (state, action) => {
      state.showEditModal = action.payload;
    },
    closeEditModal: (state) => {
      state.showEditModal = null;
    },
    openDescModal: (state, action) => {
      state.showDesc = action.payload;
    },
    closeDescModal: (state) => {
      state.showDesc = null;
    },
    dispatchAddNote: (state, action) => {
      const newNote = {
        ...action.payload,
        createdAt: new Date().toISOString(), // Set createdAt
        updatedAt: new Date().toISOString(), // Set updatedAt
      };
      state.notesList.push(newNote);
      localStorage.setItem("notes", JSON.stringify(state.notesList));
    },
    deleteNote: (state, action) => {
      const id = action.payload.id;
      state.notesList = state.notesList.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(state.notesList));
    },
    updateNote: (state, action) => {
      const updatedNote = {
        ...action.payload,
        updatedAt: new Date().toISOString(), // Update updatedAt
      };
      const index = state.notesList.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notesList[index] = updatedNote;
        localStorage.setItem("notes", JSON.stringify(state.notesList));
      }
    },
  },
  extraReducers: (builder) => {},
});

export const {
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  openDescModal,
  closeDescModal,
  dispatchAddNote,
  updateNote,
  deleteNote,
} = todoSlice.actions;

export default todoSlice.reducer;
