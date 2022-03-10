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
      CookiesPerClickBonus: 0.5,
      CookiesPerSecondBonus: 0.2,
      cost: 50,
      feeIndex: 1.12,
      numberOfUpgrades: 0,
      upgradeName: "upgrade1",
      upgradeNameForPlayer: "Friend",
      image: "/upgrade1.png",
    },
    upgrade2: {
      CookiesPerClickBonus: 4,
      CookiesPerSecondBonus: 10,
      cost: 800,
      feeIndex: 1.12,
      numberOfUpgrades: 0,
      upgradeName: "upgrade2",
      upgradeNameForPlayer: "Girlfriend",
      image: "/upgrade2.png",
    },
    upgrade3: {
      CookiesPerClickBonus: 20,
      CookiesPerSecondBonus: 50,
      cost: 8500,
      feeIndex: 1.25,
      numberOfUpgrades: 0,
      upgradeName: "upgrade3",
      upgradeNameForPlayer: "Snowflake",
      image: "/upgrade3.png",
    },
    upgrade4: {
      CookiesPerClickBonus: 35,
      CookiesPerSecondBonus: 420,
      cost: 77000,
      feeIndex: 1.2,
      numberOfUpgrades: 0,
      upgradeName: "upgrade4",
      upgradeNameForPlayer: "Brain Power",
      image: "/upgrade4.png",
    },
    upgrade5: {
      CookiesPerClickBonus: 300,
      CookiesPerSecondBonus: 5000,
      cost: 625000,
      feeIndex: 1.15,
      numberOfUpgrades: 0,
      upgradeName: "upgrade5",
      upgradeNameForPlayer: "Cold Beer",
      image: "/upgrade5.png",
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
