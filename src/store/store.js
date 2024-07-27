import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice.js";
import todoSlice from "./todo/todoSlice.js";

const store = configureStore({
    reducer: {
        auth:authSlice,
        todo:todoSlice
    },
});

export default store;