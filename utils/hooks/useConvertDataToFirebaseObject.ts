import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserDocumentInDatabase } from "../../components/backendSynchronization/SignInForm";
import { setFirebaseObjectReducer } from "../../redux/authAndBackendReducer";
import { RootState } from "../../redux/store";
import {
  firebaseObjectInterface,
  initialSkillTreeNodes,
  initialStateOfCrystalShopItems,
  initialStateOfShopItems,
  initialUpgradesState,
} from "../interfaces";
export const baseGameLogicObject: firebaseObjectInterface = {
  upgrades: initialUpgradesState,
  cookieCount: 0,
  crystalItems: initialStateOfCrystalShopItems,
  crystals: 0,
  skillPoints: 0,
  skillTreeNodes: initialSkillTreeNodes,
  skillTreeUnlocked: false,
  shopItems: initialStateOfShopItems,
};
export const useConvertDataToFirebaseObject = () => {
  const [firebaseObject, setFirebaseObject] =
    useState<firebaseObjectInterface>(baseGameLogicObject);
  const dispatch = useDispatch();
  const gameLogicReducer = useSelector((state: RootState) => state.gameLogic);
  const backendStatus = useSelector((state: RootState) => state.authAndBackend);
  useEffect(() => {
    const firebaseObj: firebaseObjectInterface = {
      upgrades: gameLogicReducer.upgrades,
      cookieCount: gameLogicReducer.cookiesLogic.cookieCount,
      crystals: gameLogicReducer.cookiesLogic.crystals,
      crystalItems: gameLogicReducer.crystalShopItems,
      skillPoints: gameLogicReducer.skillTreeLogic.skillPoints,
      skillTreeNodes: gameLogicReducer.skillTreeLogic.skillTreeNodes,
      skillTreeUnlocked: gameLogicReducer.skillTreeLogic.isSkillTreeUnlocked,
      shopItems: gameLogicReducer.shopItems,
    };
    dispatch(setFirebaseObjectReducer(firebaseObj));
    if (backendStatus.isUserAuthed && backendStatus.userEmail) {
      console.log(backendStatus, firebaseObj.cookieCount);
      saveUserDocumentInDatabase(
        backendStatus.userEmail as string,
        firebaseObj
      );
    }
    setFirebaseObject(firebaseObj);
  }, [gameLogicReducer]);
  return { firebaseObject };
};
