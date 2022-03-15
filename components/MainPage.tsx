import { useCallback, useEffect, useState } from "react";
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
import { symbolsArray, UpgradesInterface } from "../utils/interfaces";
import { CookieToClick } from "./clickerElements/CookieToClick";
import { Upgrade } from "./clickerElements/Upgrade";
import { CookiesDisplay } from "./layout/CookiesDisplay";
import { Header } from "./layout/Header";
import { AiOutlineMenu } from "react-icons/ai";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import CountUp from "react-countup";
import { abbreviateNumber } from "js-abbreviation-number";
import { StoreButton } from "./clickerElements/store/StoreButton";
export const MainPage = () => {
  const formatCookieCount = useCallback((n: number) => {
    return abbreviateNumber(n, 2, symbolsArray);
  }, []);
  const isMobile = useMediaQuery("(max-width:768px)");
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
      const localStorageCPSCount = Number(localStorage.getItem("CPS") ?? 0);
      const localStorageCPCCount = Number(localStorage.getItem("CPC") ?? 1);
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
    <>
      {isMobile && (
        //?When user screen size is less than 768px we render drawer with upgrades
        <div className="drawer absolute w-full rounded">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="cursor-pointer absolute top-4 left-4"
            >
              <AiOutlineMenu className="text-2xl" />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 gap-2 overflow-y-auto w-80 bg-base-100 text-base-content">
              <h1 className="text-2xl text-center">
                Cookies:{" "}
                <CountUp
                  end={cookieCount}
                  preserveValue={true}
                  duration={0.35}
                  separator={" "}
                  formattingFn={formatCookieCount}
                />
              </h1>
              {Object.values(upgrades).map((x) => {
                return (
                  <li key={x.upgradeName}>
                    <Upgrade {...x} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <StoreButton />
      <main className="min-h-screen">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Header />
          <CookiesDisplay
            cookieCount={Number(cookieCount.toFixed(2))}
            CPS={Number(CPS.toFixed(2))}
            CPC={Number(CPC.toFixed(2))}
          />
          <CookieToClick />

          <div className="grid place-items-center  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-rows-1 gap-2 mt-6 w-full xl:w-3/4">
            {isMobile !== null &&
              !isMobile &&
              //Otherwise we render  upgrades in grid container
              Object.values(currentUpgrades.upgrades).map((x) => {
                return <Upgrade {...x} key={x.upgradeName} />;
              })}
          </div>
        </div>
      </main>
    </>
  );
};
