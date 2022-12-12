import { configureStore } from "@reduxjs/toolkit";
import authAndBackendReducer from "./authAndBackendReducer";
import chakraReducer from "./chakraReducer";
import crystalBallReducer from "./crystalBallReducer";
import equalibrumReducer from "./equalibrumReducer";
import explosionCookiesReducer from "./explosionCookiesReducer";
import gameLogicReducer from "./gameLogicReducer";
import holyCrossReducer from "./holyCrossReducer";
import performanceReducer from "./performanceReducer";
import trashToTreasureReducer from "./trashToTreasureReducer";
import userStatsReducer from "./userStatsReducer";
import wheelOfFortuneReducer from "./wheelOfFortuneReducer";
export const store = configureStore({
  reducer: {
    gameLogic: gameLogicReducer,
    explosionCookies: explosionCookiesReducer,
    chakra: chakraReducer,
    crystalBall: crystalBallReducer,
    performance: performanceReducer,
    trashToTreasure: trashToTreasureReducer,
    eqalibrum: equalibrumReducer,
    authAndBackend: authAndBackendReducer,
    userStats: userStatsReducer,
    holyCross: holyCrossReducer,
    wheelOfFortune: wheelOfFortuneReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
