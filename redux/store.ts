import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cookieReducer from "./cookieReducer";
import shopItemsReducer from "./shopItemsReducer";
import upgradeReducer from "./upgradeReducer";
export const store = configureStore({
  reducer: {
    rootReducer: combineReducers({
      cookie: cookieReducer,
      upgrades: upgradeReducer,
      shopItems: shopItemsReducer,
    }),
    cookie: cookieReducer,
    upgrades: upgradeReducer,
    shopItems: shopItemsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
