export type upgradeNames =
  | "upgrade1"
  | "upgrade2"
  | "upgrade3"
  | "upgrade4"
  | "upgrade5";
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
  };
}
