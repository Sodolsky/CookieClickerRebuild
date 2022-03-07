import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//? CPS is abbr. for Cookies Per Second
interface CookieState {
  cookieCount: number;
  CPS: number;
}

// Define the initial state using that type
const initialState: CookieState = {
  cookieCount: 0,
  CPS: 0,
};
export const cookieCountSlice = createSlice({
  name: "cookieCount",
  initialState,
  reducers: {
    addCookie: (state, action: PayloadAction<number>) => {
      state.cookieCount += action.payload;
      localStorage.setItem("cookieCount", String(state.cookieCount.toFixed(2)));
    },
    removeCookies: (state, action: PayloadAction<number>) => {
      state.cookieCount -= action.payload;
      localStorage.setItem("cookieCount", String(state.cookieCount.toFixed(2)));
    },
    increaseCPS: (state, action: PayloadAction<number>) => {
      state.CPS += action.payload;
      localStorage.setItem("CPS", String(state.CPS.toFixed(2)));
    },
    setInitialCookieCount: (state, action: PayloadAction<number>) => {
      state.cookieCount = action.payload;
    },
    setInitialCPS: (state, action: PayloadAction<number>) => {
      state.CPS = action.payload;
    },
  },
});

export const {
  addCookie,
  setInitialCookieCount,
  setInitialCPS,
  increaseCPS,
  removeCookies,
} = cookieCountSlice.actions;
export default cookieCountSlice.reducer;
