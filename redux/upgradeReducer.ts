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
      upgradeNameForPlayer: "Friend",
      image: "/upgrade1.png",
    },
    upgrade2: {
      CookiesPerClickBonus: 15,
      CookiesPerSecondBonus: 25,
      cost: 800,
      feeIndex: 1.2,
      numberOfUpgrades: 0,
      upgradeName: "upgrade2",
      upgradeNameForPlayer: "Girlfriend",
      image: "/upgrade2.png",
    },
    upgrade3: {
      CookiesPerClickBonus: 220,
      CookiesPerSecondBonus: 200,
      cost: 20100,
      feeIndex: 1.2,
      numberOfUpgrades: 0,
      upgradeName: "upgrade3",
      upgradeNameForPlayer: "Snowflake",
      image: "/upgrade3.png",
    },
    upgrade4: {
      CookiesPerClickBonus: 2500,
      CookiesPerSecondBonus: 4000,
      cost: 340000,
      feeIndex: 1.1,
      numberOfUpgrades: 0,
      upgradeName: "upgrade4",
      upgradeNameForPlayer: "Brain Power",
      image: "/upgrade4.png",
    },
    upgrade5: {
      CookiesPerClickBonus: 31000,
      CookiesPerSecondBonus: 40000,
      cost: 2250000,
      feeIndex: 1.1,
      numberOfUpgrades: 0,
      upgradeName: "upgrade5",
      upgradeNameForPlayer: "Cold Beer",
      image: "/upgrade5.png",
    },
    upgrade6: {
      CookiesPerClickBonus: 215000,
      CookiesPerSecondBonus: 200000,
      cost: 24100000,
      feeIndex: 1.1,
      numberOfUpgrades: 0,
      upgradeName: "upgrade6",
      upgradeNameForPlayer: "Lichwala",
      image: "/upgrade6.jpg",
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
