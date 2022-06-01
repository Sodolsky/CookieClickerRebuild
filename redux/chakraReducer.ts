import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface explosionCookiesReducerInterface {
  isActive: boolean;
}

const initialState: explosionCookiesReducerInterface = {
  isActive: false,
};

export const chakraReducer = createSlice({
  name: "chakraReducer",
  initialState,
  reducers: {
    switchChakraState: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

export const { switchChakraState } = chakraReducer.actions;

export default chakraReducer.reducer;
