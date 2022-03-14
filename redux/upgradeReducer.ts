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
      CookiesPerClickBonus: 215000, //215 000
      CookiesPerSecondBonus: 200000, // 200 000
      cost: 24100000, // 24 100 000
      feeIndex: 1.15,
      numberOfUpgrades: 0,
      upgradeName: "upgrade6",
      upgradeNameForPlayer: "Lichwala",
      image: "/upgrade6.jpg",
    },
    upgrade7: {
      CookiesPerClickBonus: 1500000, //1 500 000
      CookiesPerSecondBonus: 1350000, // 1 350 000
      cost: 215000000, // 215 000 000
      feeIndex: 1.1,
      numberOfUpgrades: 0,
      upgradeName: "upgrade7",
      upgradeNameForPlayer: "UFO",
      image: "/upgrade7.png",
    },
    upgrade8: {
      CookiesPerClickBonus: 37500000, //37 500 000
      CookiesPerSecondBonus: 27000000, //27 000 000
      cost: 4500000000, // 4 500 000 000
      feeIndex: 1.1,
      numberOfUpgrades: 0,
      upgradeName: "upgrade8",
      upgradeNameForPlayer: "Black Hole",
      image: "/upgrade8.png",
    },
    upgrade9: {
      CookiesPerClickBonus: 2000000000, //2 000 000 000
      CookiesPerSecondBonus: 1215000000, //1 215 000 000
      cost: 225000000000, // 225 000 000 000
      feeIndex: 1.1,
      numberOfUpgrades: 0,
      upgradeName: "upgrade9",
      upgradeNameForPlayer: "Galaxy",
      image: "/upgrade9.png",
    },
    upgrade10: {
      CookiesPerClickBonus: 124600000000, //124 600 000 000
      CookiesPerSecondBonus: 94284000000, //94 284 000 000
      cost: 13500000000000, // 13 500 000 000 000
      feeIndex: 1.1,
      numberOfUpgrades: 0,
      upgradeName: "upgrade10",
      upgradeNameForPlayer: "Eye of the Eternal",
      image: "/upgrade10.png",
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
