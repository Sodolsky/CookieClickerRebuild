import { CSSProperties } from "react";

export type nodeNames =
  | "starterNode"
  | "clickingTalent"
  | "crystalMine"
  | "cookieExplosion"
  | "idlePlayer"
  | "crystalConversion"
  | "chakra"
  | "nuclearBomb"
  | "carpetBombing";
export interface singleSkillTreeNode {
  name: nodeNames;
  isNotable: boolean;
  wasBought: boolean;
  price: number;
  description: string;
  nameForPlayer: string;
  connectedNodes: nodeNames[];
  image: string;
  positionObject: CSSProperties;
  explanation?: string;
}
export const initialSKillTreeUpgrades: singleSkillTreeNode[] = [
  {
    name: "starterNode",
    isNotable: false,
    price: 0,
    wasBought: true,
    connectedNodes: [],
    nameForPlayer: "",
    description: "",
    image: "letters.png",
    positionObject: { left: "50%", bottom: "2%" },
  },
  //?Middle of the tree
  {
    name: "clickingTalent",
    isNotable: false,
    nameForPlayer: "Clicking Talent",
    price: 4,
    wasBought: false,
    description: "Triples amount of cookies you gain from clicking.",
    connectedNodes: ["starterNode"],
    image: "click.png",
    positionObject: { left: "50%", bottom: "16%" },
  },
  {
    name: "crystalConversion",
    isNotable: false,
    nameForPlayer: "Crystal Conversion",
    price: 6,
    wasBought: false,
    description:
      "Crystals that you get from clicking also give you extra cookies.",
    connectedNodes: ["clickingTalent", "crystalMine"],
    image: "conversion-rate.png",
    positionObject: { left: "37.5%", bottom: "25%" },
    explanation:
      "Formula for the amount of cookies you get is [Crystals Gained / 2 * CPC]",
  },

  //?Left side of the tree
  {
    name: "crystalMine",
    isNotable: false,
    nameForPlayer: "Crystal Mine",
    price: 4,
    wasBought: false,
    description: "Doubles the amount of crystals you get from clicking.",
    connectedNodes: ["starterNode"],
    image: "mining.png",
    positionObject: { left: "25%", bottom: "16%" },
  },
  {
    name: "cookieExplosion",
    isNotable: false,
    nameForPlayer: "Cookie Explosion",
    price: 10,
    wasBought: false,
    description:
      "Every time you get a crystal there is 1% chance for a cookie explosion.",
    connectedNodes: ["crystalMine"],
    image: "explosion.png",
    positionObject: { left: "25%", bottom: "30%" },
    explanation:
      "Formula for amount of Cookies that you gain from explosion is [ 5 * CPC * CPCMultiplier ]",
  },
  {
    name: "nuclearBomb",
    isNotable: false,
    nameForPlayer: "Nuclear Bomb",
    price: 8,
    wasBought: false,
    description: "Triples the amount of Coookies you gain from explosions.",
    connectedNodes: ["cookieExplosion"],
    image: "nuke.png",
    positionObject: { left: "15%", bottom: "40%" },
    explanation:
      "Formula for the explosion changes to [ 15 * CPC * CPCMultiplier ]",
  },
  {
    name: "carpetBombing",
    isNotable: false,
    nameForPlayer: "Carpet Bombing",
    price: 8,
    wasBought: false,
    description: "Makes explosions more common.",
    connectedNodes: ["cookieExplosion"],
    image: "carpetBombing.png",
    positionObject: { left: "35%", bottom: "40%" },
    explanation: "Chance for the explosion is tripled",
  },
  //?Right side of the tree
  {
    name: "idlePlayer",
    isNotable: false,
    nameForPlayer: "Idle Player",
    price: 4,
    wasBought: false,
    description: "Quadruples the amount of cookies you gain per second.",
    connectedNodes: ["starterNode"],
    image: "sand-clock.png",
    positionObject: { right: "25%", bottom: "16%" },
  },
  {
    name: "idlePlayer",
    isNotable: false,
    nameForPlayer: "Idle Player",
    price: 4,
    wasBought: false,
    description: "Quadruples the amount of cookies you gain per second.",
    connectedNodes: ["starterNode"],
    image: "sand-clock.png",
    positionObject: { right: "25%", bottom: "16%" },
  },
  {
    name: "chakra",
    isNotable: true,
    nameForPlayer: "Chakra",
    price: 16,
    wasBought: false,
    description:
      "Adds new active that let's multiplies cookies you gain for 30 seconds.",
    connectedNodes: ["idlePlayer"],
    explanation:
      "Chakra can be activated every 2 minutes. The amount of cookies you gain is multiplied by 10 times during it's duration.",
    image: "chakra.png",
    positionObject: { right: "6%", bottom: "16%" },
  },
];
export type UpgradesNames =
  | "upgrade1"
  | "upgrade2"
  | "upgrade3"
  | "upgrade4"
  | "upgrade5"
  | "upgrade6"
  | "upgrade7"
  | "upgrade8"
  | "upgrade9"
  | "upgrade10";
export type ShopUpgradesNames =
  | "upgrade1Double"
  | "upgrade2Double"
  | "upgrade3Double"
  | "upgrade4Double"
  | "upgrade5Double"
  | "upgrade6Double"
  | "upgrade7Double"
  | "upgrade8Double"
  | "upgrade9Double"
  | "upgrade10Double"
  | "unlockSkillTree"
  | "doubleClick"
  | "doubleCrystals";
export type CrystalUpgradesNames =
  | "upgrade5Skin"
  | "upgrade6Skin"
  | "upgrade7Skin";
export type shopUpgradeTypes = "double" | "unique";
export const symbolsArray: string[] = ["", "k", "M", "B", "T", "P", "E"];
export interface UpgradeInterface {
  CookiesPerClickBonus: number;
  CookiesPerSecondBonus: number;
  cost: number;
  numberOfUpgrades: number;
  feeIndex: number;
  upgradeName: UpgradesNames;
  upgradeNameForPlayer: string;
  image: string;
}
export interface BaseShopItem {
  price: number;
  image: string;
  wasBought: boolean;
  nameInShop: string;
  description: string;
}
export interface CookiesShopItem extends BaseShopItem {
  name: ShopUpgradesNames;
  type: shopUpgradeTypes;
  wasShown: boolean;
  upgradeFor?: UpgradesNames;
}
export interface CrystalShopItem extends BaseShopItem {
  inUse: boolean;
  name: CrystalUpgradesNames;
  upgradeFor?: UpgradesNames;
}
export type ShopItems = CookiesShopItem[];
export type CrystalShopItems = CrystalShopItem[];
export const initialStateOfCrystalShopItems: CrystalShopItems = [
  {
    name: "upgrade7Skin",
    image: "/ufolichwaly.jpg",
    nameInShop: "Lichwala's UFO",
    description: "UFO designed by Lichwala!",
    price: 20000,
    wasBought: false,
    inUse: false,
  },
  {
    name: "upgrade5Skin",
    image: "/desperados580ml.jpeg",
    nameInShop: "Desperado 580 ml",
    description: "Ufnal's favorite beer!",
    price: 500,
    wasBought: false,
    inUse: false,
  },
  {
    name: "upgrade6Skin",
    image: "/goldenlichwala.jpg",
    nameInShop: "Golden Lichwala",
    description: "Lichwala becomes Golden! Bystrości",
    price: 1000,
    wasBought: false,
    inUse: false,
  },
];
export const initialStateOfShopItems: ShopItems = [
  {
    name: "upgrade1Double",
    nameInShop: "Best Friend",
    description: "Doubles Benefits from Friend",
    image: "/upgrade1Double.png",
    price: 600,
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade1",
    wasShown: false,
  },
  {
    name: "upgrade2Double",
    nameInShop: "Engagment Ring",
    description: "Doubles Benefits from Girlfriend",
    image: "/upgrade2Double.png",
    price: 9000,
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade2",
    wasShown: false,
  },
  {
    name: "upgrade3Double",
    nameInShop: "Avalanche",
    description: "Doubles Benefits from Snowflake",
    image: "/upgrade3Double.png",
    price: 210000,
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade3",
    wasShown: false,
  },
  {
    name: "upgrade4Double",
    nameInShop: "Mind Control",
    description: "Doubles Benefits from Brain Power",
    image: "/upgrade4Double.png",
    price: 1500000,
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade4",
    wasShown: false,
  },
  {
    name: "upgrade5Double",
    nameInShop: "Vodka",
    description: "Doubles Benefits from Cold Beer",
    image: "/upgrade5Double.png",
    price: 17500000,
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade5",
    wasShown: false,
  },
  {
    name: "upgrade6Double",
    nameInShop: "Lichwała's Neurology",
    description: "Doubles Benefits from Lichwala",
    image: "/upgrade6Double.png",
    price: 179000000, // 179 000 000
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade6",
    wasShown: false,
  },
  {
    name: "upgrade7Double",
    nameInShop: "UFO Abduction 😱",
    description: "Doubles Benefits from UFO",
    image: "/upgrade7Double.png",
    price: 2400000000, // 2 400 000 000
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade7",
    wasShown: false,
  },
  {
    name: "upgrade8Double",
    nameInShop: "Warp Drive",
    description: "Doubles Benefits from Black Hole",
    image: "/upgrade8Double.png",
    price: 140000000000, // 140 000 000 000
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade8",
    wasShown: false,
  },
  {
    name: "upgrade9Double",
    nameInShop: "Wormhole",
    description: "Doubles Benefits from Universe",
    image: "/upgrade9Double.png",
    price: 5675000000000, // 5 675 000 000 000
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade9",
    wasShown: false,
  },
  {
    name: "upgrade10Double",
    nameInShop: "Blessing of the Eternal",
    description: "Doubles Benefits from Eye of the Eternal",
    image: "/upgrade10Double.png",
    price: 50000000000000, // 50 000 000 000 000
    wasBought: false,
    type: "double",
    upgradeFor: "upgrade10",
    wasShown: false,
  },
  {
    name: "unlockSkillTree",
    nameInShop: "Peak of Humanity",
    description: "The Eternal wants to meet you",
    image: "/unlockSkillTree.png",
    price: 100000000000000, // 100 000 000 000 000
    wasBought: false,
    type: "unique",
    wasShown: false,
  },
  {
    name: "doubleClick",
    nameInShop: "Lighting Click",
    image: "/doubleClick.png",
    price: 100000000, // 100 000 000
    type: "unique",
    description: "Doubles your click but removes CPS",
    wasBought: false,
    wasShown: false,
  },
  {
    name: "doubleCrystals",
    nameInShop: "Pickaxe",
    image: "/pickaxe.png",
    price: 2500000, // 2 500 000
    type: "unique",
    description: "Increases your chance to find gems while clicking cookie.",
    wasBought: false,
    wasShown: false,
  },
];

export interface UpgradesInterface {
  upgrade1: UpgradeInterface;
  upgrade2: UpgradeInterface;
  upgrade3: UpgradeInterface;
  upgrade4: UpgradeInterface;
  upgrade5: UpgradeInterface;
  upgrade6: UpgradeInterface;
  upgrade7: UpgradeInterface;
  upgrade8: UpgradeInterface;
  upgrade9: UpgradeInterface;
  upgrade10: UpgradeInterface;
}
export const initialUpgradesState: UpgradesInterface = {
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
};
