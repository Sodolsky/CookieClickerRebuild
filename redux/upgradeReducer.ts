import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { upgradeNames, UpgradesInterface } from "../utils/interfaces";
//? CPS is abbr. for Cookies Per Second
interface InitialNumberOfUpgradesInterface {
  number: number;
  name: upgradeNames;
}
// Define the initial state using that type
export const initialUpgradesState: UpgradesInterface = {
  upgrades: {
    upgrade1: {
      CookiesPerClickBonus: 0.2,
      CookiesPerSecondBonus: 0.1,
      cost: 50,
      feeIndex: 1.08,
      numberOfUpgrades: 0,
      upgradeName: "upgrade1",
      upgradeNameForPlayer: "Friend",
      image: "/upgrade1.png",
    },
    upgrade2: {
      CookiesPerClickBonus: 1,
      CookiesPerSecondBonus: 2,
      cost: 800,
      feeIndex: 1.06,
      numberOfUpgrades: 0,
      upgradeName: "upgrade2",
      upgradeNameForPlayer: "Girlfriend",
      image: "/upgrade2.png",
    },
  },
};
export const upgradesSlice = createSlice({
  name: "upgradeSlice",
  initialState: initialUpgradesState,
  reducers: {
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
        upgrades: {
          ...state.upgrades,
          [name]: { ...oldUpgrade, numberOfUpgrades: newNumberOfUpgrades },
        },
      };
      state = savedUpgrades;
      localStorage.setItem("upgrades", JSON.stringify(state));
    },
  },
});

export const { setInitialNumberOfUpgradesForUpgrade, buyUpgrade } =
  upgradesSlice.actions;
export default upgradesSlice.reducer;
