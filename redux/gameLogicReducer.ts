import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import {
  CrystalShopItems,
  initialStateOfCrystalShopItems,
  initialStateOfShopItems,
  initialUpgradesState,
  ShopItems,
  ShopUpgradesNames,
  UpgradesInterface,
  UpgradesNames,
} from "../utils/interfaces";
import { clearLocalStorageFromPreviousState } from "../utils/utils";
//? CPS is abbr. for Cookies Per Second
interface InitialGameLogicStateInterface {
  cookiesLogic: {
    cookieCount: number;
    CPS: number;
    CPC: number;
    crystals: number;
  };
  upgrades: UpgradesInterface;
  crystalShopItems: CrystalShopItems;
  shopItems: ShopItems;
  skillPoints: number;
  isSkillTreeUnlocked: boolean;
}
interface InitialNumberOfUpgradesInterface {
  number: number;
  name: UpgradesNames;
}
// Define the initial state using that type
const initialState: InitialGameLogicStateInterface = {
  cookiesLogic: {
    cookieCount: 0,
    CPS: 0,
    CPC: 1,
    crystals: 0,
  },
  upgrades: initialUpgradesState,
  crystalShopItems: initialStateOfCrystalShopItems,
  shopItems: initialStateOfShopItems,
  skillPoints: 0,
  isSkillTreeUnlocked: false,
};
export const gameMechanicSlice = createSlice({
  name: "gameMechanicReducer",
  initialState,
  reducers: {
    //!Here are reducers for Clicker Logic
    addCookie: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.cookieCount += action.payload;
      localStorage.setItem(
        "cookieCount",
        String(state.cookiesLogic.cookieCount.toFixed(2))
      );
    },
    removeCookies: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.cookieCount -= action.payload;
      localStorage.setItem(
        "cookieCount",
        String(state.cookiesLogic.cookieCount.toFixed(2))
      );
    },
    //Here are reducers for buying upgrades
    increaseCPS: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.CPS += action.payload;
      localStorage.setItem("CPS", String(state.cookiesLogic.CPS.toFixed(2)));
    },
    increaseCPC: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.CPC += action.payload;
      localStorage.setItem("CPC", String(state.cookiesLogic.CPC.toFixed(2)));
    },
    addCrystals: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.crystals += action.payload;
      localStorage.setItem(
        "crystals",
        String(state.cookiesLogic.crystals.toFixed(2))
      );
    },
    //Here we get data from localstorage and setIt
    setInitialCPS: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.CPS = action.payload;
    },
    setInitialCPC: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.CPC = action.payload;
    },
    setInitialCrystals: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.crystals = action.payload;
    },
    setInitialCookieCount: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.cookieCount = action.payload;
    },
    //!Here are reducers for the Upgrades
    setInitialNumberOfUpgradesForUpgrade: (
      state,
      action: PayloadAction<InitialNumberOfUpgradesInterface>
    ) => {
      const { name, number } = action.payload;
      const oldUpgrade = state.upgrades[name];
      state.upgrades[name] = {
        ...oldUpgrade,
        numberOfUpgrades: number,
      };
    },
    buyUpgrade: (
      state,
      action: PayloadAction<InitialNumberOfUpgradesInterface>
    ) => {
      const { name, number } = action.payload;
      const oldUpgrade = state.upgrades[name];
      const newNumberOfUpgrades = (oldUpgrade.numberOfUpgrades += number);
      const savedUpgrades: UpgradesInterface = {
        ...state.upgrades,
        [name]: { ...oldUpgrade, numberOfUpgrades: newNumberOfUpgrades },
      };
      state = { ...state, upgrades: savedUpgrades };
      localStorage.setItem("upgrades", JSON.stringify(savedUpgrades));
    },
    //!Here are reducers for the Shop
    setInitialShopitems: (state, action: PayloadAction<ShopItems>) => {
      return { ...state, shopItems: action.payload };
    },
    addBonusesForUpgrades: (state, action: PayloadAction<UpgradesNames>) => {
      const upgradedItem = state.upgrades[action.payload];
      const numberOfUpgrades = upgradedItem.numberOfUpgrades;
      const newCPS = (state.cookiesLogic.CPS +=
        numberOfUpgrades * upgradedItem.CookiesPerSecondBonus);
      const newCPC = (state.cookiesLogic.CPC +=
        numberOfUpgrades * upgradedItem.CookiesPerClickBonus);
      const newState = {
        ...state,
        cookiesLogic: {
          ...state.cookiesLogic,
          CPS: newCPS,
          CPC: newCPC,
        },
      };
      localStorage.setItem("CPS", String(newCPS.toFixed(2)));
      localStorage.setItem("CPC", String(newCPC.toFixed(2)));
      state = newState;
    },
    buyShopItem: (state, action: PayloadAction<ShopUpgradesNames>) => {
      const stateCopy = cloneDeep(state.shopItems);
      const newShopItems = stateCopy.map((x) => {
        if (x.name === action.payload) {
          return { ...x, wasBought: true };
        }
        return x;
      });
      localStorage.setItem("shopItems", JSON.stringify(newShopItems));
      return { ...state, shopItems: newShopItems };
    },
    showShopItem: (state, action: PayloadAction<ShopUpgradesNames>) => {
      const stateCopy = cloneDeep(state.shopItems);
      const newShopItems = stateCopy.map((x) => {
        if (x.name === action.payload) {
          return { ...x, wasShown: true };
        }
        return x;
      });
      localStorage.setItem("shopItems", JSON.stringify(newShopItems));
      return { ...state, shopItems: newShopItems };
    },
    setisSkillTreeUnlocked: (state, action: PayloadAction<boolean>) => {
      return { ...state, isSkillTreeUnlocked: action.payload };
    },
    //? Here is the reducer for reseting the game
    resetGameAndAddSkillPoints(state, action: PayloadAction<number>) {
      localStorage.setItem("skillTreeUnlocked", "true");
      localStorage.setItem("skillPoints", `${action.payload}`);
      clearLocalStorageFromPreviousState();
      return { ...initialState, skillPoints: action.payload };
    },
  },
});

export const {
  addCookie,
  addCrystals,
  setInitialCrystals,
  setInitialCookieCount,
  setInitialCPS,
  increaseCPS,
  removeCookies,
  increaseCPC,
  setInitialCPC,
  buyUpgrade,
  setInitialNumberOfUpgradesForUpgrade,
  addBonusesForUpgrades,
  buyShopItem,
  setInitialShopitems,
  showShopItem,
  resetGameAndAddSkillPoints,
  setisSkillTreeUnlocked,
} = gameMechanicSlice.actions;
export default gameMechanicSlice.reducer;
