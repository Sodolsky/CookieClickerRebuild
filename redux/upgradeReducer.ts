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
      CookiesPerClickBonus: 1,
      CookiesPerSecondBonus: 1,
      cost: 100,
      feeIndex: 1.2,
      numberOfUpgrades: 0,
      upgradeName: "upgrade1",
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
      state.upgrades = {
        ...state.upgrades,
        [name]: { ...oldUpgrade, numberOfUpgrades: number },
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
      localStorage.setItem("upgrades", JSON.stringify(state.upgrades));
    },
  },
});

export const { setInitialNumberOfUpgradesForUpgrade, buyUpgrade } =
  upgradesSlice.actions;
export default upgradesSlice.reducer;
