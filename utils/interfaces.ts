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
export type ShopUpgradesNames = "upgrade1Double";
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
export interface ShopItem {
  name: ShopUpgradesNames;
  nameInShop: string;
  upgradeNameInShop: string;
  wasBought: boolean;
  price: number;
  image: string;
  type: UpgradesNames | "Other";
}
export type ShopItems = ShopItem[];
export interface UpgradesInterface {
  upgrades: {
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
  };
}
