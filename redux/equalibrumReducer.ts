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
export interface decreaseStacksReducerInterface {
  stackType: "click" | "idle";
  number: number;
}
export const equalibrumReducer = createSlice({
  name: "equalibrumReducer",
  initialState,
  reducers: {
    addClickStacks(state, action: PayloadAction<number>) {
      const numberOfAddedStacks = action.payload;
      //?When state is idle it means that none of the stacks reached 10
      const futureClickStacks = state.clickStacks + numberOfAddedStacks;
      //? We are checking if after adding stacks to click the number would reach 100
      if (futureClickStacks > 100) {
        state.clickStacks = 100;
        //?When the number reaches 100 we are setting the state for clickExhaustion
        state.state = "clickExhaustion";
      } else {
        //?When the number of clickStacks isn't 100 we are simply adding the number and decreasing stacks of the other type by 2
        state.clickStacks = futureClickStacks;
        const futureIdleStacksState = state.idleStacks - 2;
        //?Here we are just making sure that the number would not be negative
        if (futureIdleStacksState < 0) {
          state.idleStacks = 0;
        } else {
          state.idleStacks = futureIdleStacksState;
        }
      }
    },
    addIdleStacks(state, action: PayloadAction<number>) {
      //? Same deal but with idle stacks
      const numberOfAddedStacks = action.payload;
      const futureIdleStacks = state.idleStacks + numberOfAddedStacks;
      if (futureIdleStacks > 100) {
        state.idleStacks = 100;
        state.state = "idleExhaustion";
      } else {
        state.idleStacks = futureIdleStacks;
        const futureClickStacks = state.clickStacks - 2;
        if (futureClickStacks < 0) {
          state.clickStacks = 0;
        } else {
          state.clickStacks = futureClickStacks;
        }
      }
    },
    reduceEQStacks(
      state,
      action: PayloadAction<decreaseStacksReducerInterface>
    ) {
      if (action.payload.stackType === "click") {
        const futureStacks = state.clickStacks - 5;
        if (futureStacks <= 0) {
          state.clickStacks = 0;
          state.state = "idle";
        } else {
          state.clickStacks = futureStacks;
        }
      } else {
        const futureStacks = state.idleStacks - 5;
        if (futureStacks <= 0) {
          state.idleStacks = 0;
          state.state = "idle";
        } else {
          state.idleStacks = futureStacks;
        }
      }
    },
  },
});

export const { addClickStacks, addIdleStacks, reduceEQStacks } =
  equalibrumReducer.actions;

export default equalibrumReducer.reducer;
