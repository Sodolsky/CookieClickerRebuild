import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCookie,
  setInitialCookieCount,
  setInitialCPC,
  setInitialCPS,
} from "../redux/cookieReducer";
import { RootState } from "../redux/store";
import {
  initialUpgradesState,
  setInitialNumberOfUpgradesForUpgrade,
} from "../redux/upgradeReducer";
import { UpgradesInterface } from "../utils/interfaces";
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
  const CPC = useSelector((state: RootState) => state.cookie.CPC);
  const dispatch = useDispatch();
  const [currentUpgrades, setCurrentUpgrades] =
    useState<UpgradesInterface>(initialUpgradesState);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageCookieCount =
        Number(localStorage.getItem("cookieCount")) ?? 0;
      const localStorageCPSCount = Number(localStorage.getItem("CPS")) ?? 0;
      const localStorageCPCCount = Number(localStorage.getItem("CPC")) ?? 1;
      const localStorageUpgrades =
        (JSON.parse(localStorage.getItem("upgrades")!) as UpgradesInterface) ??
        initialUpgradesState;
      Object.values(localStorageUpgrades.upgrades).forEach((item) => {
        const obj = item;
        dispatch(
          setInitialNumberOfUpgradesForUpgrade({
            name: obj.upgradeName,
            number: obj.numberOfUpgrades,
          })
        );
      });
      dispatch(setInitialCookieCount(localStorageCookieCount));
      dispatch(setInitialCPS(localStorageCPSCount));
      dispatch(setInitialCPC(localStorageCPCCount));
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
          CPC={Number(CPC.toFixed(2))}
        />
        <CookieToClick />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-1 gap-2 ">
          <Upgrade
            {...currentUpgrades.upgrades.upgrade1}
            upgradeName={"upgrade1"}
            image={"/upgrade1.png"}
          />
          <Upgrade
            {...currentUpgrades.upgrades.upgrade2}
            upgradeName={"upgrade2"}
            image={"/upgrade2.png"}
          />
        </div>
      </div>
    </main>
  );
};
