import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./accessSlice";

const store = configureStore({
  reducer: {
    root: authReducer,
  },
});

export default store;