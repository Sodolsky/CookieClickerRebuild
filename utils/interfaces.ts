export type upgradeNames =
  | "upgrade1"
  | "upgrade2"
  | "upgrade3"
  | "upgrade4"
  | "upgrade5"
  | "upgrade6"
  | "upgrade7";
export const symbolsArray: string[] = ["", "k", "M", "B", "T", "P", "E"];
export interface UpgradeInterface {
  CookiesPerClickBonus: number;
  CookiesPerSecondBonus: number;
  cost: number;
  numberOfUpgrades: number;
  feeIndex: number;
  upgradeName: upgradeNames;
  upgradeNameForPlayer: string;
  image: string;
}
export interface UpgradesInterface {
  upgrades: {
    upgrade1: UpgradeInterface;
    upgrade2: UpgradeInterface;
    upgrade3: UpgradeInterface;
    upgrade4: UpgradeInterface;
    upgrade5: UpgradeInterface;
    upgrade6: UpgradeInterface;
    upgrade7: UpgradeInterface;
  };
}
