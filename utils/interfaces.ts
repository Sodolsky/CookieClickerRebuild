export type upgradeNames = "upgrade1";
export interface UpgradeInterface {
  CookiesPerClickBonus: number;
  CookiesPerSecondBonus: number;
  cost: number;
  numberOfUpgrades: number;
  feeIndex: number;
  upgradeName: upgradeNames;
  image?: string;
}
export interface UpgradesInterface {
  upgrades: {
    upgrade1: UpgradeInterface;
  };
}
