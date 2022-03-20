import { ShopUpgradesNames } from "./interfaces";

export const shouldShopItemBeShown = (
  name: ShopUpgradesNames,
  currentCookies: number
): boolean => {
  let returnResult: boolean = false;
  switch (name) {
    case "upgrade1Double":
      returnResult = true;
      break;
    case "upgrade2Double":
      if (currentCookies > 9000) {
        returnResult = true;
      }
      break;
    case "upgrade3Double":
      if (currentCookies > 210000) {
        returnResult = true;
      }
      break;
    case "upgrade4Double":
      if (currentCookies > 1500000) {
        returnResult = true;
      }
      break;
    case "upgrade5Double":
      if (currentCookies > 17500000) {
        returnResult = true;
      }
      break;
    case "upgrade6Double":
      if (currentCookies > 179000000) {
        returnResult = true;
      }
      break;
    case "upgrade7Double":
      if (currentCookies > 2400000000) {
        returnResult = true;
      }
    case "upgrade8Double":
      if (currentCookies > 140000000000) {
        returnResult = true;
      }
      break;
    case "upgrade9Double":
      if (currentCookies > 5675000000000) {
        returnResult = true;
      }
      break;
    case "upgrade10Double":
      if (currentCookies > 50000000000000) {
        returnResult = true;
      }
      break;
    default:
      console.log("Something went wrong with switch statement");
  }
  return returnResult;
};
