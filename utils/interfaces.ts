import { CSSProperties } from "react";
import { performanceReducerInterface } from "../redux/performanceReducer";
export interface firebaseObjectInterface {
  upgrades: UpgradesInterface;
  shopItems: ShopItems;
  crystalItems: CrystalShopItems;
  crystals: number;
  cookieCount: number;
  skillTreeUnlocked: boolean;
  skillPoints: number;
  skillTreeNodes: singleSkillTreeNode[];
}
export interface userStats {
  totalTimePlay: number;
  totalCookiesCollected: number;
  totalNumberOfExplosions: number;
  cookiesGainedFromExplosion: number;
}
export interface firebaseAndUtilityObjectWithEmail {
  email: string;
  firebaseObject: firebaseObjectInterface;
  utilityObject: utilityObject;
}
export interface skillTreeWrapper {
  skillPoints: number;
  skillTreeNodes: singleSkillTreeNode[];
  isSkillTreeUnlocked: boolean;
}
export interface holyCrossBonuses {
  CPSMultiplier: number;
  CPCMultiplier: number;
  skillPoints: number;
  crystals: number;
  upgrades: number;
}
export interface utilityObject {
  userStats: userStats;
  performance: performanceReducerInterface;
  holyCrossBonuses: holyCrossBonuses;
}
export type wheelOfFortuneBonuses =
  | "CPC"
  | "CPS"
  | "moreFrequentExplosions"
  | "moreCrystals"
  | "cheaperUpgrades"
  | "moreSkillPointsNextRestart";

export type nodeNames =
  | "starterNode"
  | "clickingTalent"
  | "crystalMine"
  | "cookieExplosion"
  | "idlePlayer"
  | "crystalConversion"
  | "chakra"
  | "nuclearBomb"
  | "carpetBombing"
  | "clickingWithLove"
  | "timeMachine"
  | "heartOfTheEternal"
  | "quantumPhysics"
  | "theoryOfEverything"
  | "timeBomb"
  | "crystalBall"
  | "trashToTreasure"
  | "peaceAroundTheWorld"
  | "equalibrum"
  | "evenMoreQuestions"
  | "perfectAim"
  | "oneUpgrade"
  | "debt"
  | "eternity"
  | "holyCross"
  | "totalWar"
  | "wheelOfFortune";
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
//! Idea za kazda explozje którą wywołasz coś się dzieje więcej ciastek / upgrady.
export const initialSkillTreeNodes: singleSkillTreeNode[] = [
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
    name: "timeMachine",
    isNotable: false,
    nameForPlayer: "Time Machine",
    price: 6,
    wasBought: false,
    description: "Doubles your multiplier for cookies per second.",
    explanation:
      "This upgrade doubles your MULTIPLIER so if you bought idle player and nothing else it doubles it so your CPS multiplier is 8.",
    connectedNodes: ["clickingTalent"],
    image: "stopwatch.png",
    positionObject: { left: "50%", bottom: "30%" },
  },
  {
    name: "timeBomb",
    isNotable: false,
    nameForPlayer: "Time Bomb",
    price: 10,
    wasBought: false,
    description: "Explosions give you bonus from CPS.",
    connectedNodes: ["timeMachine", "carpetBombing"],
    image: "time-bomb.png",
    positionObject: { left: "50%", bottom: "40%" },
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
      "Formula for the amount of cookies you get is [Crystals Gained / 2 * CPC].",
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
    name: "quantumPhysics",
    isNotable: true,
    nameForPlayer: "Quantum Physics",
    price: 16,
    wasBought: false,
    description:
      "Adds 2 new upgrades and doubles the number of skill points you get from game resets.",
    connectedNodes: ["crystalMine"],
    image: "physics.png",
    positionObject: { left: "6%", bottom: "16%" },
  },
  {
    name: "theoryOfEverything",
    isNotable: false,
    nameForPlayer: "Theory of Everything",
    price: 14,
    wasBought: false,
    description: "Your upgrades are 50% cheaper.",
    connectedNodes: ["quantumPhysics"],
    image: "scientist.png",
    positionObject: { left: "6%", bottom: "30%" },
  },
  {
    name: "evenMoreQuestions",
    isNotable: false,
    nameForPlayer: "Even More Questions???",
    price: 35,
    wasBought: false,
    description: "Your upgrades are 75% cheaper.",
    connectedNodes: ["theoryOfEverything"],
    image: "question.png",
    positionObject: { left: "6%", bottom: "50%" },
  },
  {
    name: "totalWar",
    isNotable: false,
    nameForPlayer: "Total War",
    price: 20,
    wasBought: false,
    description:
      "Every explosion that you create, makes next explosions 5% stronger.",
    connectedNodes: ["carpetBombing", "nuclearBomb"],
    image: "totalWar.png",
    positionObject: { left: "25%", bottom: "50%" },
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
      "Formula for amount of Cookies that you gain from explosion is [ 20 * CPC * CPCMultiplier ]",
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
      "Formula for the explosion changes to [ 60 * CPC * CPCMultiplier ]",
  },
  {
    name: "carpetBombing",
    isNotable: false,
    nameForPlayer: "Carpet Bombing",
    price: 8,
    wasBought: false,
    description: "Makes explosions more common.",
    connectedNodes: ["cookieExplosion"],
    image: "carpet-bombing.png",
    positionObject: { left: "35%", bottom: "40%" },
    explanation: "Chance for the explosion is tripled",
  },
  {
    name: "peaceAroundTheWorld",
    isNotable: false,
    nameForPlayer: "Peace Around The World",
    price: 40,
    wasBought: false,
    description:
      "Every explosion you generate adds 2 random upgrades to a upgrade that you have bought.",
    connectedNodes: ["evenMoreQuestions", "totalWar"],
    image: "peace.png",
    positionObject: { left: "12%", bottom: "65%" },
  },
  {
    name: "wheelOfFortune",
    isNotable: false,
    nameForPlayer: "Wheel Of Fortune",
    price: 75,
    wasBought: false,
    description:
      "Every time you reset a game you will roll a new bonus for next one.",
    connectedNodes: ["peaceAroundTheWorld", "perfectAim"],
    image: "wheelOfFortune.png",
    positionObject: { left: "30%", bottom: "80%" },
  },
  {
    name: "debt",
    isNotable: false,
    nameForPlayer: "Debt",
    price: 20,
    wasBought: false,
    description:
      "If you don't have enough cookies. You can buy upgrade with only 3/4 of it's price. Buy you will need to pay your debt.",
    connectedNodes: ["carpetBombing", "timeBomb"],
    image: "debt.png",
    positionObject: { left: "42.5%", bottom: "50%" },
  },
  {
    name: "perfectAim",
    isNotable: false,
    nameForPlayer: "Perfect Aim",
    price: 32,
    wasBought: false,
    description:
      "Every click that doesn't result in getting crystal get's rolled one more time.",
    connectedNodes: ["carpetBombing", "nuclearBomb"],
    image: "aim.png",
    positionObject: { left: "25%", bottom: "65%" },
  },
  {
    name: "oneUpgrade",
    isNotable: false,
    nameForPlayer: "One Upgrade",
    price: 40,
    wasBought: false,
    description: "Your Explosions add 4 of your current best upgrade.",
    connectedNodes: ["trashToTreasure", "totalWar"],
    image: "ring.png",
    explanation: '"To Rule Them All..."',
    positionObject: { left: "45%", bottom: "65%" },
  },
  {
    name: "eternity",
    isNotable: true,
    nameForPlayer: "Eternity",
    price: 100,
    wasBought: false,
    description: "Unlocks the ending.",
    connectedNodes: [],
    image: "eternity.png",
    positionObject: { left: "50%", bottom: "90%" },
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
    name: "clickingWithLove",
    isNotable: false,
    nameForPlayer: "Clicking With Love",
    price: 6,
    wasBought: false,
    description: "Doubles your multiplier for CPC.",
    explanation:
      "This upgrade doubles your MULTIPLIER so if you bought Clicking Talent and nothing else it doubles it so your CPC multiplier is 6.",
    connectedNodes: ["idlePlayer"],
    image: "heart.png",
    positionObject: { right: "25%", bottom: "30%" },
  },
  {
    name: "equalibrum",
    isNotable: false,
    nameForPlayer: "Equalibrum",
    price: 20,
    wasBought: false,
    description:
      "Everytime you click or gain CPS you gain stacks of each type. When you reach 100 stacks of certain type the other method of gaining cookies multiplier becomes tripled. Until stacks reach zero.",
    explanation: "Lightning Click cannot be bought.",
    connectedNodes: ["clickingWithLove", "heartOfTheEternal"],
    image: "yin-yang.png",
    positionObject: { right: "12.5%", bottom: "50%" },
  },
  {
    name: "holyCross",
    isNotable: false,
    nameForPlayer: "Holy Cross",
    price: 40,
    wasBought: false,
    description:
      "At random, there is a chance for Eternal God to watch your clicking speed for next 15 seconds. For each click you gain a random benefit.",
    explanation:
      "Benefits are: Higher CPC/CPS MULTIPLIERS, Random upgrades,Crystals,SkillPoints.",
    connectedNodes: ["equalibrum", "trashToTreasure"],
    image: "cross.png",
    positionObject: { right: "20%", bottom: "65%" },
  },
  {
    name: "crystalBall",
    isNotable: false,
    nameForPlayer: "Crystal Ball",
    price: 10,
    wasBought: false,
    description: "Every upgrade you buy gives you 1% more cookies.",
    connectedNodes: ["clickingWithLove", "timeMachine"],
    image: "crystal-ball.png",
    positionObject: { right: "25%", bottom: "40%" },
  },
  {
    name: "trashToTreasure",
    isNotable: false,
    nameForPlayer: "Trash to Treasure",
    price: 20,
    wasBought: false,
    description:
      "Every upgrade you bought makes your current best upgrade stronger.",
    explanation:
      "The number of CPS/CPC is increased by 0.02%. Your current best upgrade is the upgrade that costs the most and it's not counting to the bonus. ",
    connectedNodes: ["crystalBall", "timeBomb"],
    image: "treasure.png",
    positionObject: { right: "32.5%", bottom: "50%" },
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
      "Chakra can be activated every 2 minutes. The amount of cookies you gain is multiplied by 3 times during it's duration.",
    image: "chakra.png",
    positionObject: { right: "6%", bottom: "16%" },
  },
  {
    name: "heartOfTheEternal",
    isNotable: false,
    nameForPlayer: "Heart Of The Eternal",
    price: 14,
    wasBought: false,
    description: "Chakra multiplier becomes 10x.",
    connectedNodes: ["chakra"],
    image: "sacred-heart.png",
    positionObject: { right: "6%", bottom: "30%" },
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
  | "upgrade10"
  | "upgrade11"
  | "upgrade12";
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
  | "upgrade7Skin"
  | "upgrade8Skin"
  | "cookieSkin"
  | "resetSkillTree";
export type shopUpgradeTypes = "double" | "unique";
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
  isLocked: boolean;
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
    name: "upgrade5Skin",
    image: "/desperados580ml.jpeg",
    nameInShop: "Desperado 580 ml",
    description: "Ufnal's favorite beer!",
    price: 1000,
    wasBought: false,
    isLocked: false,
    inUse: false,
  },
  {
    name: "upgrade6Skin",
    image: "/goldenlichwala.jpg",
    nameInShop: "Golden Lichwala",
    description: "Lichwala becomes Golden! Bystrości",
    price: 1000,
    wasBought: false,
    isLocked: false,
    inUse: false,
  },
  {
    name: "upgrade7Skin",
    image: "/ufo.jpg",
    nameInShop: "Lichwala's UFO",
    description: "UFO designed by Lichwala!",
    price: 1000,
    wasBought: false,
    inUse: false,
    isLocked: false,
  },
  {
    name: "upgrade8Skin",
    image: "/firstBlackHole.jpg",
    nameInShop: "First Black Hole",
    description: "First Black Hole picture ever taken!",
    price: 1000,
    wasBought: false,
    inUse: false,
    isLocked: false,
  },
  {
    name: "cookieSkin",
    image: "/mc.png",
    nameInShop: "Minecraft Cookie",
    description: "Minecraft Cookie Skin!",
    price: 2500,
    wasBought: false,
    inUse: false,
    isLocked: false,
  },
  {
    name: "resetSkillTree",
    image: "/resetSkillTree.png",
    nameInShop: "Reset Skill Tree",
    description: "Resets your skill tree",
    price: 250,
    wasBought: false,
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
    isLocked: false,
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
  upgrade11: UpgradeInterface;
  upgrade12: UpgradeInterface;
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
  upgrade11: {
    CookiesPerClickBonus: 1000000000000, //1 000 000 000 000
    CookiesPerSecondBonus: 1000000000000, //1 000 000 000 000
    cost: 1000000000000000, // 1 000 000 000 000 000
    feeIndex: 1.15,
    numberOfUpgrades: 0,
    upgradeName: "upgrade11",
    upgradeNameForPlayer: "Atom",
    image: "/upgrade11.png",
  },
  upgrade12: {
    CookiesPerClickBonus: 420000000000000, //420 000 000 000 000
    CookiesPerSecondBonus: 319000000000000, //319 000 000 000 000
    cost: 250000000000000000, // 250 000 000 000 000 000
    feeIndex: 1.15,
    numberOfUpgrades: 0,
    upgradeName: "upgrade12",
    upgradeNameForPlayer: "Forger of the Planets",
    image: "/upgrade12.png",
  },
};
