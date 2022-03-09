import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//? CPS is abbr. for Cookies Per Second
interface CookieState {
  cookieCount: number;
  CPS: number;
  CPC: number;
}

// Define the initial state using that type
const initialState: CookieState = {
  cookieCount: 0,
  CPS: 0,
  CPC: 1,
};
export const cookieCountSlice = createSlice({
  name: "cookieCount",
  initialState,
  reducers: {
    //Here are reducers for handling Current Cookies
    addCookie: (state, action: PayloadAction<number>) => {
      state.cookieCount += action.payload;
      localStorage.setItem("cookieCount", String(state.cookieCount.toFixed(2)));
    },
    removeCookies: (state, action: PayloadAction<number>) => {
      state.cookieCount -= action.payload;
      localStorage.setItem("cookieCount", String(state.cookieCount.toFixed(2)));
    },
    //Here are reducers for buying upgrades
    increaseCPS: (state, action: PayloadAction<number>) => {
      state.CPS += action.payload;
      localStorage.setItem("CPS", String(state.CPS.toFixed(2)));
    },
    increaseCPC: (state, action: PayloadAction<number>) => {
      state.CPC += action.payload;
      localStorage.setItem("CPC", String(state.CPC.toFixed(2)));
    },
    //Here we get data from localstorage and setIt
    setInitialCPS: (state, action: PayloadAction<number>) => {
      state.CPS = action.payload;
    },
    setInitialCPC: (state, action: PayloadAction<number>) => {
      state.CPC = action.payload;
    },
    setInitialCookieCount: (state, action: PayloadAction<number>) => {
      state.cookieCount = action.payload;
    },
  },
});

export const {
  addCookie,
  setInitialCookieCount,
  setInitialCPS,
  increaseCPS,
  removeCookies,
  increaseCPC,
  setInitialCPC,
} = cookieCountSlice.actions;
export default cookieCountSlice.reducer;
