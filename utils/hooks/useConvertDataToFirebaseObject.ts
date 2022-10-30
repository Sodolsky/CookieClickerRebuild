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
      try {
        if (
          valuesThatChanged.length === 1 &&
          valuesThatChanged.some((x) => x === "cookieCount")
        )
          throw new Error("No imporant data was changed");
        if (
          valuesThatChanged.some((x) => x === "crystals") &&
          valuesThatChanged.some((x) => x === "cookieCount") &&
          valuesThatChanged.length === 2
        )
          throw new Error("No imporant data was changed");
        // saveUserDocumentInDatabase(
        //   backendStatus.userEmail as string,
        //   firebaseObj
        // );
      } catch (error) {}
    }

    //!Big performance hit needs to be optimised ASAP
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
