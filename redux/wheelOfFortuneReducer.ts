import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { wheelOfFortuneBonuses } from "../utils/interfaces";

interface wheelOfFortuneReducer {
  currentBonus: wheelOfFortuneBonuses | null;
}

const initialState: wheelOfFortuneReducer = {
  currentBonus: null,
};

export const wheelOfFortuneReducer = createSlice({
  name: "wheelOfFortuneReducer",
  initialState,
  reducers: {
    changeWheelOfFortuneBonus: (
      state,
      action: PayloadAction<Exclude<wheelOfFortuneBonuses, null>>
    ) => {
      localStorage.setItem("wheelOfFortuneBonus", action.payload);
      state.currentBonus = action.payload;
    },
  },
});

export const { changeWheelOfFortuneBonus } = wheelOfFortuneReducer.actions;

export default wheelOfFortuneReducer.reducer;
