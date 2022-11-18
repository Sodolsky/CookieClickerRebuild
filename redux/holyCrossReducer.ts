import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { holyCrossBonuses } from "../utils/interfaces";

interface holyCrossReducerInterface {
  isActive: boolean;
  currentBonuses: holyCrossBonuses;
}
export const initialHolyCrossBonuses: holyCrossBonuses = {
  CPCMultiplier: 0,
  CPSMultiplier: 0,
  crystals: 0,
  skillPoints: 0,
  upgrades: 0,
};
const initialState: holyCrossReducerInterface = {
  isActive: false,
  currentBonuses: initialHolyCrossBonuses,
};
export const initialStateOfHolyCross = cloneDeep(initialState);
export const holyCrossReducer = createSlice({
  name: "holyCrossReducer",
  initialState,
  reducers: {
    switchHolyCrossState: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setHolyCrossBonusesFromLocalStorage: (
      state,
      action: PayloadAction<holyCrossBonuses>
    ) => {
      return {
        ...state,
        currentBonuses: action.payload,
      };
    },
    addHolyCrossBonuses: (state, action: PayloadAction<holyCrossBonuses>) => {
      const newBonuses = cloneDeep(state.currentBonuses);
      Object.entries(action.payload).forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        newBonuses[key as keyof holyCrossBonuses] += value;
      });
      localStorage.setItem("holyCrossBonuses", JSON.stringify(newBonuses));
      return {
        ...state,
        currentBonuses: newBonuses,
      };
    },
  },
});

export const {
  switchHolyCrossState,
  addHolyCrossBonuses,
  setHolyCrossBonusesFromLocalStorage,
} = holyCrossReducer.actions;

export default holyCrossReducer.reducer;
