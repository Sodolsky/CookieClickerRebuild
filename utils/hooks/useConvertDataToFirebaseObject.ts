import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
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
type keysOfFirebaseObject = keyof firebaseObjectInterface;
export const useConvertDataToFirebaseObject = () => {
  const [firebaseObject, setFirebaseObject] =
    useState<firebaseObjectInterface>(baseGameLogicObject);
  const prevStateOfFirebaseObject =
    useRef<firebaseObjectInterface>(firebaseObject);
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
    prevStateOfFirebaseObject.current = firebaseObject;
    //!Big performance hit needs to be optmised ASAP
    dispatch(setFirebaseObjectReducer(firebaseObj));
    if (backendStatus.isUserAuthed && backendStatus.userEmail) {
      const valuesThatChanged = Object.entries(firebaseObj)
        .map((x) => {
          const key = x[0] as keysOfFirebaseObject;
          const value = x[1];
          if (!isEqual(prevStateOfFirebaseObject.current[key], value)) {
            return key;
          }
        })
        .filter(Boolean);
      saveUserDocumentInDatabase(
        backendStatus.userEmail as string,
        firebaseObj
      );
    }
    setFirebaseObject(firebaseObj);
  }, [gameLogicReducer]);
  return { firebaseObject };
};
