import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  firebaseObjectInterface,
  initialSkillTreeNodes,
  initialStateOfCrystalShopItems,
  initialUpgradesState,
} from "../interfaces";
const baseGameLogicObject: firebaseObjectInterface = {
  upgrades: initialUpgradesState,
  cookieCount: 0,
  crystalItems: initialStateOfCrystalShopItems,
  crystals: 0,
  skillPoints: 0,
  skillTreeNodes: initialSkillTreeNodes,
  skillTreeUnlocked: false,
};
export const useFirebaseUserObject = () => {
  const [firebaseObject, setFirebaseObject] =
    useState<firebaseObjectInterface>(baseGameLogicObject);
  const gameLogicReducer = useSelector((state: RootState) => state.gameLogic);
  useEffect(() => {
    const firebaseObj: firebaseObjectInterface = {
      upgrades: gameLogicReducer.upgrades,
      cookieCount: gameLogicReducer.cookiesLogic.cookieCount,
      crystals: gameLogicReducer.cookiesLogic.crystals,
      crystalItems: gameLogicReducer.crystalShopItems,
      skillPoints: gameLogicReducer.skillTreeLogic.skillPoints,
      skillTreeNodes: gameLogicReducer.skillTreeLogic.skillTreeNodes,
      skillTreeUnlocked: gameLogicReducer.skillTreeLogic.isSkillTreeUnlocked,
    };
    setFirebaseObject(firebaseObj);
  }, [gameLogicReducer]);
  console.log(firebaseObject);
  return { firebaseObject };
};
