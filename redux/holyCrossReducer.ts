import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { holyCrossBonuses } from "../utils/interfaces";

interface holyCrossReducerInterface {
  isActive: boolean;
  currentBonuses: holyCrossBonuses;
}

const initialState: holyCrossReducerInterface = {
  isActive: false,
  currentBonuses: {
    CPCMultiplier: 0,
    CPSMultiplier: 0,
    crystals: 0,
    skillPoints: 0,
  },
};
export const initialStateOfHolyCross = cloneDeep(initialState);
export const holyCrossReducer = createSlice({
  name: "holyCrossReducer",
  initialState,
  reducers: {
    switchHolyCrossState: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    addHolyCrossBonuses: (state, action: PayloadAction<holyCrossBonuses>) => {},
  },
});

export const { switchHolyCrossState, addHolyCrossBonuses } =
  holyCrossReducer.actions;

export default holyCrossReducer.reducer;
