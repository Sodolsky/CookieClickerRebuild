import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface performanceReducerInterface {
  disableAnimatedBackground: boolean;
  disableParticlesFromClicking: boolean;
  soundVolume: number;
  musicVolume: number;
}
export interface changeVolumeReducerInterface {
  newValue: number;
  type: "sound" | "music";
}
export const initialPerformanceReducerState: performanceReducerInterface = {
  disableAnimatedBackground: false,
  disableParticlesFromClicking: false,
  soundVolume: 0.5,
  musicVolume: 0.5,
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
    changeVolume: (
      state,
      action: PayloadAction<changeVolumeReducerInterface>
    ) => {
      let newState: performanceReducerInterface = {
        ...state,
      };
      if (action.payload.type === "sound") {
        newState = {
          ...newState,
          soundVolume: action.payload.newValue,
        };
      } else {
        newState = {
          ...newState,
          musicVolume: action.payload.newValue,
        };
      }
      saveSettingsInLocalStorage(newState);
      return (state = newState);
    },
  },
});

export const {
  setInitialPerformanceOptions,
  switchAnimatedBackground,
  switchClickParticles,
  changeVolume,
} = permormanceReducer.actions;

export default permormanceReducer.reducer;
