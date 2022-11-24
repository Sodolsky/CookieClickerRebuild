import { isEqual, values } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserDocumentInDatabase } from "../../components/backendSynchronization/SignInForm";
import { setFirebaseObjectReducer } from "../../redux/authAndBackendReducer";
import { RootState } from "../../redux/store";
import {
  firebaseObjectAndUserEmail,
  firebaseObjectInterface,
  initialSkillTreeNodes,
  initialStateOfCrystalShopItems,
  initialStateOfShopItems,
  initialUpgradesState,
} from "../interfaces";
//Todo Change this to normal values
export const baseGameLogicObject: firebaseObjectInterface = {
  upgrades: initialUpgradesState,
  cookieCount: 0,
  crystalItems: initialStateOfCrystalShopItems,
  crystals: 0,
  skillPoints: 100213123,
  skillTreeNodes: initialSkillTreeNodes,
  skillTreeUnlocked: true,
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
  const handleSavingUserWhenWebPageCloses = () => {
    if (document.visibilityState === "hidden") {
      const reqObject: firebaseObjectAndUserEmail = {
        email: backendStatus.userEmail as string,
        firebaseObject: firebaseObject,
      };
      const saveUser = async () => {
        try {
          await fetch("/api/saveFirebaseData", {
            method: "POST",
            body: JSON.stringify(reqObject),
            keepalive: true,
          });
        } catch (error) {
          console.log(error);
        }
      };
      saveUser();
    }
  };
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
    setFirebaseObject(firebaseObj);
  }, [gameLogicReducer]);
  useEffect(() => {
    if (typeof window !== undefined && backendStatus.userEmail) {
      document.addEventListener(
        "visibilitychange",
        handleSavingUserWhenWebPageCloses
      );
    }
    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleSavingUserWhenWebPageCloses
      );
  }, [handleSavingUserWhenWebPageCloses]);
  return { firebaseObject };
};
