import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import {
  CrystalShopItems,
  CrystalUpgradesNames as CrystalUpgradesNames,
  firebaseObjectInterface,
  initialSkillTreeNodes,
  initialStateOfCrystalShopItems,
  initialStateOfShopItems,
  initialUpgradesState,
  nodeNames,
  ShopItems,
  ShopUpgradesNames,
  singleSkillTreeNode,
  skillTreeWrapper,
  UpgradeInterface,
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
  skillTreeLogic: {
    skillPoints: number;
    isSkillTreeUnlocked: boolean;
    skillTreeNodes: singleSkillTreeNode[];
  };
  upgrades: UpgradesInterface;
  crystalShopItems: CrystalShopItems;
  shopItems: ShopItems;
  areStatesLoaded: boolean;
  numberOfResets: number;
}
interface InitialNumberOfUpgradesInterface {
  number: number;
  name: UpgradesNames;
}
interface UpgradeActionsInterface {
  type: "increase" | "decrease";
  amount: number;
}
// Define the initial state using that type
const initialGameLogicState: InitialGameLogicStateInterface = {
  cookiesLogic: {
    cookieCount: 0,
    CPS: 0,
    CPC: 1,
    crystals: 0,
  },
  skillTreeLogic: {
    skillPoints: 0,
    isSkillTreeUnlocked: false,
    skillTreeNodes: initialSkillTreeNodes,
  },
  upgrades: initialUpgradesState,
  crystalShopItems: initialStateOfCrystalShopItems,
  shopItems: initialStateOfShopItems,
  numberOfResets: 0,
  areStatesLoaded: false,
};
export const gameMechanicSlice = createSlice({
  name: "gameMechanicReducer",
  initialState: initialGameLogicState,
  reducers: {
    //!Here is the reducer that controls if all states from local storage we're loaded
    stateWereLoaded: (state, action: PayloadAction<boolean>) => {
      state.areStatesLoaded = action.payload;
    },
    //!Here are reducers for Clicker Logic
    addCookie: (state, action: PayloadAction<number>) => {
      const newNumberOfCookies = (state.cookiesLogic.cookieCount +=
        action.payload);
      state.cookiesLogic.cookieCount = newNumberOfCookies;
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
    removeCrystals: (state, action: PayloadAction<number>) => {
      state.cookiesLogic.crystals -= action.payload;
      localStorage.setItem(
        "crystals",
        String(state.cookiesLogic.crystals.toFixed(2))
      );
    },
    //Here are reducers for buying upgrades
    changeCPS: (state, action: PayloadAction<UpgradeActionsInterface>) => {
      if (action.payload.type === "increase")
        state.cookiesLogic.CPS += action.payload.amount;
      else state.cookiesLogic.CPS -= action.payload.amount;
    },
    changeCPC: (state, action: PayloadAction<UpgradeActionsInterface>) => {
      if (action.payload.type === "increase")
        state.cookiesLogic.CPC += action.payload.amount;
      else state.cookiesLogic.CPC -= action.payload.amount;
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
      state.upgrades = savedUpgrades;
      localStorage.setItem("upgrades", JSON.stringify(savedUpgrades));
    },
    //!Here are reducers for the Shop
    setInitialShopitems: (state, action: PayloadAction<ShopItems>) => {
      return { ...state, shopItems: action.payload };
    },
    setInitialCrystalShopItems: (
      state,
      action: PayloadAction<CrystalShopItems>
    ) => {
      state.crystalShopItems = action.payload;
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
    lockShopItem: (state, action: PayloadAction<ShopUpgradesNames>) => {
      const stateCopy = cloneDeep(state.shopItems);
      const newShopItems = stateCopy.map((x) => {
        if (x.name === action.payload) {
          return { ...x, wasBought: false, isLocked: true };
        }
        return x;
      });
      localStorage.setItem("shopItems", JSON.stringify(newShopItems));
      return { ...state, shopItems: newShopItems };
    },
    buyCrystalShopItem: (
      state,
      action: PayloadAction<CrystalUpgradesNames>
    ) => {
      const stateCopy = cloneDeep(state.crystalShopItems);
      const newShopItems = stateCopy.map((x) => {
        if (x.name === action.payload) {
          return { ...x, wasBought: true, inUse: true };
        }
        return x;
      });
      localStorage.setItem("crystalItems", JSON.stringify(newShopItems));
      return { ...state, crystalShopItems: newShopItems };
    },
    changeUsageOfCrystalShopitem: (
      state,
      action: PayloadAction<{ name: CrystalUpgradesNames; prevState: boolean }>
    ) => {
      const stateCopy = cloneDeep(state.crystalShopItems);
      const newShopItems = stateCopy.map((x) => {
        if (x.name === action.payload.name) {
          return { ...x, inUse: !action.payload.prevState };
        }
        return x;
      });
      localStorage.setItem("crystalItems", JSON.stringify(newShopItems));
      return { ...state, crystalShopItems: newShopItems };
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
    setInitialSkillTree: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        const skillPoints = Number(localStorage.getItem("skillPoints"));
        const skillTreeNodes =
          (JSON.parse(
            localStorage.getItem("skillTreeNodes")!
          ) as singleSkillTreeNode[]) ?? initialSkillTreeNodes;
        return {
          ...state,
          skillTreeLogic: {
            skillTreeNodes: skillTreeNodes,
            isSkillTreeUnlocked: action.payload,
            skillPoints: skillPoints,
          },
        };
      } else {
        return {
          ...state,
          skillTreeLogic: {
            ...state.skillTreeLogic,
            isSkillTreeUnlocked: action.payload,
          },
        };
      }
    },
    setSkillTreeFromDB: (state, action: PayloadAction<skillTreeWrapper>) => {
      let stateClone = cloneDeep(state);
      stateClone = {
        ...stateClone,
        skillTreeLogic: {
          isSkillTreeUnlocked: action.payload.isSkillTreeUnlocked,
          skillPoints: action.payload.skillPoints,
          skillTreeNodes: action.payload.skillTreeNodes,
        },
      };
      state = stateClone;
    },
    setReducerDataFromFirebaseObject: (
      state,
      action: PayloadAction<firebaseObjectInterface>
    ) => {
      const CPSCount = Object.values(action.payload.upgrades).reduce(
        (acc: number, a: UpgradeInterface) =>
          (acc += a.numberOfUpgrades * a.CookiesPerSecondBonus),
        0
      );
      const CPCCount = Object.values(action.payload.upgrades).reduce(
        (acc: number, a: UpgradeInterface) =>
          (acc += a.numberOfUpgrades * a.CookiesPerClickBonus),
        1
      );

      return {
        ...state,
        cookiesLogic: {
          cookieCount: action.payload.cookieCount,
          CPC: CPCCount,
          CPS: CPSCount,
          crystals: action.payload.crystals,
        },
        crystalShopItems: action.payload.crystalItems,
        shopItems: action.payload.shopItems,
        skillTreeLogic: {
          isSkillTreeUnlocked: action.payload.skillTreeUnlocked,
          skillPoints: action.payload.skillPoints,
          skillTreeNodes: action.payload.skillTreeNodes,
        },
        upgrades: action.payload.upgrades,
        numberOfResets: action.payload.numberOfResets,
      };
    },
    buySkillTreeUpgrade(state, action: PayloadAction<nodeNames>) {
      const stateCopy = cloneDeep(state.skillTreeLogic.skillTreeNodes);
      const nodeThatIsBuyed = state.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === action.payload
      ) as singleSkillTreeNode;
      const cost = nodeThatIsBuyed.price;
      const newSkillTreeNodes = stateCopy.map((x) => {
        if (x.name === action.payload) {
          return { ...x, wasBought: true };
        }
        return x;
      });
      localStorage.setItem("skillTreeNodes", JSON.stringify(newSkillTreeNodes));
      localStorage.setItem(
        "skillPoints",
        `${state.skillTreeLogic.skillPoints - cost}`
      );
      return {
        ...state,
        skillTreeLogic: {
          ...state.skillTreeLogic,
          skillPoints: state.skillTreeLogic.skillPoints - cost,
          skillTreeNodes: newSkillTreeNodes,
        },
      };
    },
    //? Here is the reducer for reseting the game
    resetGameAndAddSkillPoints(state, action: PayloadAction<number>) {
      localStorage.setItem("skillTreeUnlocked", "true");
      localStorage.setItem(
        "skillPoints",
        `${state.skillTreeLogic.skillPoints + action.payload}`
      );
      localStorage.setItem("numberOfResets", `${state.numberOfResets + 1}`);
      clearLocalStorageFromPreviousState();
      const skillTreeLogicCopy = cloneDeep(state.skillTreeLogic);
      const crystalCount = state.cookiesLogic.crystals;
      const numberOfResets = state.numberOfResets + 1;
      const crystalShopItems = state.crystalShopItems;
      const newSkillPoints = state.skillTreeLogic.skillPoints + action.payload;

      const returnObject: InitialGameLogicStateInterface = {
        ...initialGameLogicState,
        skillTreeLogic: {
          ...skillTreeLogicCopy,
          skillPoints: newSkillPoints,
        },
        cookiesLogic: {
          ...initialGameLogicState.cookiesLogic,
          crystals: crystalCount,
        },
        crystalShopItems: crystalShopItems,
        numberOfResets: numberOfResets,
        areStatesLoaded: true,
      };
      return returnObject;
    },
    addSkillPoints(state, action: PayloadAction<number>) {
      localStorage.setItem(
        "skillPoints",
        `${state.skillTreeLogic.skillPoints + action.payload}`
      );
      let oldSkillPoints = state.skillTreeLogic.skillPoints;
      const newSkillPoints = (oldSkillPoints += action.payload);
      return {
        ...state,
        skillTreeLogic: {
          ...state.skillTreeLogic,
          skillPoints: newSkillPoints,
        },
      };
    },
    addGameResets(state, action: PayloadAction<number>) {
      localStorage.setItem(
        "numberOfResets",
        `${state.numberOfResets + action.payload}`
      );
      return {
        ...state,
        numberOfResets: action.payload,
      };
    },
    resetSkillTree(state) {
      const numberOfPoints = state.skillTreeLogic.skillTreeNodes.reduce(
        (acc, a) => (a.wasBought ? (acc += a.price) : acc),
        0
      );
      const newSkillPoints = (state.skillTreeLogic.skillPoints +=
        numberOfPoints);
      localStorage.setItem(
        "skillTreeNodes",
        JSON.stringify(initialSkillTreeNodes)
      );
      localStorage.setItem("skillPoints", `${newSkillPoints}`);
      state.skillTreeLogic = {
        ...state.skillTreeLogic,
        skillPoints: newSkillPoints,
        skillTreeNodes: initialSkillTreeNodes,
      };
    },
  },
});

export const {
  addCookie,
  addCrystals,
  setInitialCrystals,
  setInitialCookieCount,
  setInitialCPS,
  changeCPS,
  removeCookies,
  changeCPC,
  setInitialCPC,
  buyUpgrade,
  setInitialNumberOfUpgradesForUpgrade,
  addBonusesForUpgrades,
  buyShopItem,
  lockShopItem,
  setInitialShopitems,
  showShopItem,
  resetGameAndAddSkillPoints,
  setInitialSkillTree,
  setInitialCrystalShopItems,
  buyCrystalShopItem,
  removeCrystals,
  changeUsageOfCrystalShopitem,
  stateWereLoaded,
  buySkillTreeUpgrade,
  resetSkillTree,
  setSkillTreeFromDB,
  setReducerDataFromFirebaseObject,
  addSkillPoints,
  addGameResets,
} = gameMechanicSlice.actions;
export default gameMechanicSlice.reducer;
