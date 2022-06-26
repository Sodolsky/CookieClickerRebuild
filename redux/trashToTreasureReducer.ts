import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpgradesNames } from "../utils/interfaces";

interface trashToTreasureReducerInterface {
  bestUpgrade: UpgradesNames;
  bonus: number;
  CPCContribution: number;
  CPSContribution: number;
}

const initialState: trashToTreasureReducerInterface = {
  bestUpgrade: "upgrade1",
  bonus: 1,
  CPCContribution: 1,
  CPSContribution: 1,
};
export const trashToTreasureReducer = createSlice({
  name: "trashToTreasureReducer",
  initialState,
  reducers: {
    changeBestUpgrade: (
      state,
      action: PayloadAction<trashToTreasureReducerInterface>
    ) => {
      state.bestUpgrade = action.payload.bestUpgrade;
      state.bonus = action.payload.bonus;
    },
    changeBonusForTTT: (state, action: PayloadAction<number>) => {
      state.bonus = action.payload;
    },
    clearTTTState: (state) => {
      state = initialState;
    },
  },
});

export const { changeBestUpgrade, clearTTTState, changeBonusForTTT } =
  trashToTreasureReducer.actions;

export default trashToTreasureReducer.reducer;
