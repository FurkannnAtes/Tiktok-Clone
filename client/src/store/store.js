import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./auth";
import showAuth from "./showAuth";

export const store = configureStore({
  reducer: {
    user: userSlice,
    showAuth: showAuth,
  },
});
