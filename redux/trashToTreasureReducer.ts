import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpgradesNames } from "../utils/interfaces";

interface trashToTreasureReducerInterface {
  bestUpgrade: UpgradesNames;
  bonus: number;
  CPCContribution: number;
  CPSContribution: number;
}
interface changeBonusForTTTInterface {
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
      const { bonus, CPCContribution, CPSContribution, bestUpgrade } =
        action.payload;
      state.bestUpgrade = bestUpgrade;
      state.bonus = bonus;
      state.CPCContribution = CPCContribution;
      state.CPSContribution = CPSContribution;
    },
    changeBonusForTTT: (
      state,
      action: PayloadAction<changeBonusForTTTInterface>
    ) => {
      const { bonus, CPCContribution, CPSContribution } = action.payload;
      state.bonus = bonus;
      state.CPCContribution = CPCContribution;
      state.CPSContribution = CPSContribution;
    },
    clearTTTState: (state) => {
      state = initialState;
    },
  },
});

export const { changeBestUpgrade, clearTTTState, changeBonusForTTT } =
  trashToTreasureReducer.actions;

export default trashToTreasureReducer.reducer;
