import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface crystalBallReducerInterface {
  numberOfUpgrades: number;
  bonus: number;
}

const initialState: crystalBallReducerInterface = {
  numberOfUpgrades: 0,
  bonus: 1,
};

export const crystalBallReducer = createSlice({
  name: "crystalBallReducer",
  initialState,
  reducers: {
    addNewUpgrade: (state) => {
      state.numberOfUpgrades += 1;
      state.bonus += 0.01;
    },
    clearAllCrystalBallStates: (state) => {
      state = initialState;
    },
  },
});

export const { addNewUpgrade, clearAllCrystalBallStates } =
  crystalBallReducer.actions;

export default crystalBallReducer.reducer;
