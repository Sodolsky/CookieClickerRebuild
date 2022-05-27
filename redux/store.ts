import { configureStore } from "@reduxjs/toolkit";
import explosionCookiesReducer from "./explosionCookiesReducer";
import gameLogicReducer from "./gameLogicReducer";
export const store = configureStore({
  reducer: {
    gameLogic: gameLogicReducer,
    explosionCookies: explosionCookiesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
