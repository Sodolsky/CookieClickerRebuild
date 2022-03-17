import { configureStore } from "@reduxjs/toolkit";
import gameLogicReducer from "./gameLogicReducer";
export const store = configureStore({
  reducer: {
    gameLogic: gameLogicReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
