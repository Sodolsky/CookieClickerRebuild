import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface equalibrumReducer {
  clickStacks: number;
  idleStacks: number;
  state: "idle" | "clickExhaustion" | "idleExhaustion";
}

const initialState: equalibrumReducer = {
  clickStacks: 0,
  idleStacks: 0,
  state: "idle",
};

export const equalibrumReducer = createSlice({
  name: "equalibrumReducer",
  initialState,
  reducers: {
    addClickStacks(state, action: PayloadAction<number>) {
      const numberOfAddedStacks = action.payload;
      //?When state is idle it means that none of the stacks reached 100
      if (state.state === "idle") {
        const futureStateIdle = (state.clickStacks += numberOfAddedStacks);
        //? We are checking if after adding stacks to click the number would reach 100
        if (futureStateIdle >= 100) {
          //?When the number reaches 100 we are setting the state for clickExhaustion
          state.state = "clickExhaustion";
        } else {
          //?When the number of clickStacks isn't 100 we are simply adding the number and decreasing stacks of the other type by 2
          state.clickStacks = futureStateIdle;
          const futureIdleStacksState = (state.idleStacks -= 2);
          //?Here we are just making sure that the number would not be negative
          if (futureIdleStacksState < 0) {
            state.idleStacks = 0;
          } else {
            state.idleStacks = futureIdleStacksState;
          }
        }
      }
    },
  },
});

export const { addClickStacks } = equalibrumReducer.actions;

export default equalibrumReducer.reducer;
