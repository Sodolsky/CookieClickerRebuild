import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { useSelector } from "react-redux";
import {
  ShopItems,
  ShopUpgradesNames,
  UpgradesNames,
} from "../utils/interfaces";
import { RootState } from "./store";

export const initialStateOfShopItems: ShopItems = [
  {
    name: "upgrade1Double",
    nameInShop: "Best Friend",
    upgradeNameInShop: "Doubles Benefits from Friend",
    image: "/upgrade1Double.png",
    price: 10,
    wasBought: false,
    type: "upgrade1",
  },
];
export const shopItemsSlice = createSlice({
  name: "shopItems",
  initialState: initialStateOfShopItems,
  reducers: {
    setInitialShopitems: (_, action: PayloadAction<ShopItems>) => {
      return action.payload;
    },
    //?Here we handle increasing CPS and CPC where we buy one of the shop upgrades that doubles benefits
    addBonusesForUpgrades: (state, action: PayloadAction<UpgradesNames>) => {},
    buyShopItem: (state, action: PayloadAction<ShopUpgradesNames>) => {
      const stateCopy = cloneDeep(state);
      const newState = stateCopy.map((x) => {
        if (x.name === action.payload) {
          return { ...x, wasBought: true };
        }
        return x;
      });
      localStorage.setItem("shopItems", JSON.stringify(newState));
      return newState;
    },
  },
});
export const { setInitialShopitems, buyShopItem, addBonusesForUpgrades } =
  shopItemsSlice.actions;
export default shopItemsSlice.reducer;
