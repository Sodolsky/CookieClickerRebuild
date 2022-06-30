import { useDispatch } from "react-redux";
import { ShopUpgradesNames, UpgradesInterface } from "./interfaces";

export const shouldShopItemBeShown = (
  name: ShopUpgradesNames,
  currentCookies: number,
  currentUpgrades: UpgradesInterface
): boolean => {
  let returnResult: boolean = false;
  switch (name) {
    case "upgrade1Double":
      returnResult = true;
      break;
    case "upgrade2Double":
      if (currentCookies > 6000) {
        returnResult = true;
      }
      break;
    case "upgrade3Double":
      if (currentCookies > 140000) {
        returnResult = true;
      }
      break;
    case "upgrade4Double":
      if (currentCookies > 900000) {
        returnResult = true;
      }
      break;
    case "upgrade5Double":
      if (currentCookies > 12000000) {
        returnResult = true;
      }
      break;
    case "upgrade6Double":
      if (currentCookies > 139000000) {
        returnResult = true;
      }
      break;
    case "upgrade7Double":
      if (currentCookies > 2000000000) {
        returnResult = true;
      }
    case "upgrade8Double":
      if (currentCookies > 100000000000) {
        returnResult = true;
      }
      break;
    case "upgrade9Double":
      if (currentCookies > 4500000000000) {
        returnResult = true;
      }
      break;
    case "upgrade10Double":
      if (currentCookies > 35000000000000) {
        returnResult = true;
      }
      break;
    case "doubleClick":
      if (currentCookies > 100000000) {
        returnResult = true;
      }
      break;
    case "doubleCrystals":
      if (currentCookies > 2500000) {
        returnResult = true;
      }
      break;
    case "unlockSkillTree":
      if (currentUpgrades.upgrade10.numberOfUpgrades !== 0) {
        returnResult = true;
      }
      break;
    default:
      console.log("Something went wrong with switch statement");
  }
  return returnResult;
};
export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const clearLocalStorageFromPreviousState = () => {
  localStorage.removeItem("CPS");
  localStorage.removeItem("CPC");
  localStorage.removeItem("shopItems");
  localStorage.removeItem("upgrades");
  localStorage.removeItem("storeDiscovered");
  localStorage.removeItem("cookieCount");
};
export const isTouchDevice = (): boolean => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};
export function secondsToTime(seconds: number) {
  let m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  let s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
