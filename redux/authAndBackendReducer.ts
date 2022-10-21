import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseGameLogicObject } from "../utils/hooks/useConvertDataToFirebaseObject";
import { firebaseObjectInterface } from "../utils/interfaces";

interface authAndBackendReducerInterface {
  isUserAuthed: boolean;
  firebaseObject: firebaseObjectInterface;
  userEmail: string | null;
}

const initialState: authAndBackendReducerInterface = {
  isUserAuthed: false,
  firebaseObject: baseGameLogicObject,
  userEmail: null,
};

export const authAndBackendReducer = createSlice({
  name: "authAndBackendReducer",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isUserAuthed = action.payload;
    },
    setFirebaseObjectReducer: (
      state,
      action: PayloadAction<firebaseObjectInterface>
    ) => {
      state.firebaseObject = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  },
});

export const { setAuthStatus, setFirebaseObjectReducer, setUserEmail } =
  authAndBackendReducer.actions;

export default authAndBackendReducer.reducer;
