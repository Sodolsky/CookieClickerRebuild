import { configureStore } from "@reduxjs/toolkit";
import cookieReducer from "./cookieReducer";
export const store = configureStore({
  reducer: {
    cookie: cookieReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
