import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { userStats } from "../utils/interfaces";

export const initialStateOfUserStats: userStats = {
  totalCookiesCollected: 0,
  totalNumberOfExplosions: 0,
  totalTimePlay: 0,
};
const initialState = cloneDeep(initialStateOfUserStats);
export const userStatsReducer = createSlice({
  name: "userStatsReducer",
  initialState,
  reducers: {
    setStatsState: (state, action: PayloadAction<userStats>) => {
      localStorage.setItem("userStats", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setStatsState } = userStatsReducer.actions;

export default userStatsReducer.reducer;
