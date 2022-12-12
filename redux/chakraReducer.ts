import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface chakraReducerInterface {
  isActive: boolean;
}

const initialState: chakraReducerInterface = {
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
