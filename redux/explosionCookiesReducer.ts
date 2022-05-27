import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface explosionCookiesReducerInterface {
  cookies: number;
}

const initialState: explosionCookiesReducerInterface = {
  cookies: 0,
};

export const explosionCookiesReducer = createSlice({
  name: "explosionCookies",
  initialState,
  reducers: {
    addExplosionCookiesCount: (state, action: PayloadAction<number>) => {
      state.cookies = action.payload;
    },
  },
});

export const { addExplosionCookiesCount } = explosionCookiesReducer.actions;

export default explosionCookiesReducer.reducer;
