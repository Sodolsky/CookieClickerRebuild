import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setInitialShopitems,
  setInitialCookieCount,
  setInitialCPS,
  setInitialCPC,
  setInitialCrystals,
  setInitialCrystalShopItems,
  setSkillTreeFromDB,
} from "../../redux/gameLogicReducer";
import { firebaseObjectInterface, UpgradeInterface } from "../interfaces";

export const useSetReducersDataFromFirebaseObjects = () => {
  const [firebaseObjForSaving, setFirebaseObjectForSaving] =
    useState<firebaseObjectInterface | null>(null);

  console.log(firebaseObjForSaving);
  const dispatch = useDispatch();
  useEffect(() => {
    if (firebaseObjForSaving) {
      dispatch(
        setSkillTreeFromDB({
          isSkillTreeUnlocked: firebaseObjForSaving.skillTreeUnlocked,
          skillPoints: firebaseObjForSaving.skillPoints,
          skillTreeNodes: firebaseObjForSaving.skillTreeNodes,
        })
      );
      dispatch(setInitialShopitems(firebaseObjForSaving.shopItems));
      dispatch(setInitialCookieCount(firebaseObjForSaving.cookieCount));
      const CPSCount = Object.values(firebaseObjForSaving.upgrades).reduce(
        (acc: number, a: UpgradeInterface) =>
          (acc += a.numberOfUpgrades * a.CookiesPerSecondBonus),
        0
      );
      const CPCCount = Object.values(firebaseObjForSaving.upgrades).reduce(
        (acc: number, a: UpgradeInterface) =>
          (acc += a.numberOfUpgrades * a.CookiesPerClickBonus),
        1
      );
      dispatch(setInitialCPS(CPSCount));
      dispatch(setInitialCPC(CPCCount));
      dispatch(setInitialCrystals(firebaseObjForSaving.crystals));
      dispatch(setInitialCrystalShopItems(firebaseObjForSaving.crystalItems));
    }
  }, [firebaseObjForSaving]);
  return { setFirebaseObjectForSaving };
};
