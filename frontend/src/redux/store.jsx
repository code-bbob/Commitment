import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./rootSlice";

const store = configureStore({
  reducer: {
    root: authReducer,
  },
});

export default store;