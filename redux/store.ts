import { configureStore } from "@reduxjs/toolkit";
import chakraReducer from "./chakraReducer";
import crystalBallReducer from "./crystalBallReducer";
import explosionCookiesReducer from "./explosionCookiesReducer";
import gameLogicReducer from "./gameLogicReducer";
import performanceReducer from "./performanceReducer";
import trashToTreasureReducer from "./trashToTreasureReducer";
export const store = configureStore({
  reducer: {
    gameLogic: gameLogicReducer,
    explosionCookies: explosionCookiesReducer,
    chakra: chakraReducer,
    crystalBall: crystalBallReducer,
    performance: performanceReducer,
    trashToTreasure: trashToTreasureReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
