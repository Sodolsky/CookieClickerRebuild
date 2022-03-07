import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCookie,
  setInitialCookieCount,
  setInitialCPS,
} from "../redux/cookieReducer";
import { RootState } from "../redux/store";
import {
  initialUpgradesState,
  setInitialNumberOfUpgradesForUpgrade,
} from "../redux/upgradeReducer";
import { UpgradeInterface, UpgradesInterface } from "../utils/interfaces";
import { CookieToClick } from "./clickerElements/CookieToClick";
import { Upgrade } from "./clickerElements/Upgrade";
import { CookiesDisplay } from "./layout/CookiesDisplay";
import { Header } from "./layout/Header";

export const MainPage = () => {
  const cookieCount = useSelector(
    (state: RootState) => state.cookie.cookieCount
  );
  const upgrades = useSelector((state: RootState) => state.upgrades.upgrades);
  const CPS = useSelector((state: RootState) => state.cookie.CPS);
  const dispatch = useDispatch();
  const [currentUpgrades, setCurrentUpgrades] =
    useState<UpgradesInterface>(initialUpgradesState);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageCookieCount =
        Number(localStorage.getItem("cookieCount")) ?? 0;
      const localStorageCPSCount = Number(localStorage.getItem("CPS")) ?? 0;
      const localStorageUpgrades =
        JSON.parse(localStorage.getItem("upgrades")!) ?? initialUpgradesState;
      Object.values(localStorageUpgrades).forEach((item) => {
        const obj = item as UpgradeInterface;
        dispatch(
          setInitialNumberOfUpgradesForUpgrade({
            name: obj.upgradeName,
            number: obj.numberOfUpgrades,
          })
        );
      });
      dispatch(setInitialCookieCount(localStorageCookieCount));
      dispatch(setInitialCPS(localStorageCPSCount));
    }
  }, []);
  useEffect(() => {
    const gameLoopInterval = setInterval(() => dispatch(addCookie(CPS)), 1000);
    return () => clearInterval(gameLoopInterval);
  }, [CPS]);
  useEffect(() => {
    setCurrentUpgrades({ upgrades: upgrades });
  }, [upgrades]);
  return (
    <main className="w-screen">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Header />
        <CookiesDisplay
          cookieCount={Number(cookieCount.toFixed(2))}
          CPS={Number(CPS.toFixed(2))}
        />
        <CookieToClick />
        <Upgrade
          {...currentUpgrades.upgrades.upgrade1}
          upgradeName={"upgrade1"}
        />
      </div>
    </main>
  );
};
