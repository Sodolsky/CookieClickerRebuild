import { configureStore } from "@reduxjs/toolkit";
import cookieReducer from "./cookieReducer";
import upgradeReducer from "./upgradeReducer";
export const store = configureStore({
  reducer: {
    cookie: cookieReducer,
    upgrades: upgradeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
