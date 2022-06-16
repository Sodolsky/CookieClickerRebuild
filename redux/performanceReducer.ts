import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface performanceReducerInterface {
  disableAnimatedBackground: boolean;
  disableParticlesFromClicking: boolean;
}

export const initialPerformanceReducerState: performanceReducerInterface = {
  disableAnimatedBackground: false,
  disableParticlesFromClicking: false,
};
const saveSettingsInLocalStorage = (state: performanceReducerInterface) => {
  localStorage.setItem("performance", JSON.stringify(state));
};
export const permormanceReducer = createSlice({
  name: "permormanceReducer",
  initialState: initialPerformanceReducerState,
  reducers: {
    setInitialPerformanceOptions: (
      state,
      action: PayloadAction<performanceReducerInterface>
    ) => {
      return (state = action.payload);
    },
    switchAnimatedBackground: (state) => {
      const newState: performanceReducerInterface = {
        ...state,
        disableAnimatedBackground: !state.disableAnimatedBackground,
      };
      saveSettingsInLocalStorage(newState);
      return (state = newState);
    },
    switchClickParticles: (state) => {
      const newState: performanceReducerInterface = {
        ...state,
        disableParticlesFromClicking: !state.disableParticlesFromClicking,
      };
      saveSettingsInLocalStorage(newState);
      return (state = newState);
    },
  },
});

export const {
  setInitialPerformanceOptions,
  switchAnimatedBackground,
  switchClickParticles,
} = permormanceReducer.actions;

export default permormanceReducer.reducer;
