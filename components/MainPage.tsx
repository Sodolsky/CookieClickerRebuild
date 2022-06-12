import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCookie,
  resetGameAndAddSkillPoints,
  setInitialCookieCount,
  setInitialCPC,
  setInitialCPS,
  setInitialCrystals,
  setInitialCrystalShopItems,
  setInitialNumberOfUpgradesForUpgrade,
  setInitialShopitems,
  setInitialSkillTree,
  stateWereLoaded,
} from "../redux/gameLogicReducer";
import { RootState } from "../redux/store";
import {
  CrystalShopItems,
  initialStateOfCrystalShopItems,
  initialStateOfShopItems,
  initialUpgradesState,
  ShopItems,
  UpgradesInterface,
  symbolsArray,
  singleSkillTreeNode,
  UpgradeInterface,
} from "../utils/interfaces";
import { CookieToClick } from "./clickerElements/CookieToClick";
import { Upgrade } from "./clickerElements/Upgrade";
import { CookiesDisplay } from "./layout/CookiesDisplay";
import { Header } from "./layout/Header";
import { AiOutlineMenu } from "react-icons/ai";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import CountUp from "react-countup";
import { abbreviateNumber } from "js-abbreviation-number";
import { Store } from "./clickerElements/store/Store";
import { EternalTalk } from "./skillTree/EternalTalk";
import { SkillTreeModal } from "./skillTree/SkillTreeModal";
import { useClickMultiplier } from "../utils/hooks/useClickMultiplier";
import { CrystalsDisplay } from "./clickerElements/crystals/CrystalsDisplay";
import { CrystalsModal } from "./clickerElements/crystals/CrystalsModal";
import { useCPSMultiplier } from "../utils/hooks/useCPSMultiplier";
import { Chakra } from "./skillTree/Chakra";
import { ResetModal } from "./skillTree/ResetModal";
import { addExplosionCookiesCount } from "../redux/explosionCookiesReducer";
export const MainPage = () => {
  const formatCookieCount = useCallback((n: number) => {
    return abbreviateNumber(n, 2, symbolsArray);
  }, []);
  const resetGameLogic = (skillPointsCount: number) => {
    intervalRef.current && clearInterval(intervalRef.current);
    dispatch(addExplosionCookiesCount(0));
    dispatch(resetGameAndAddSkillPoints(skillPointsCount));
    dispatch(setInitialSkillTree(true));
  };
  const isQPBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "quantumPhysics"
      ) as singleSkillTreeNode
  ).wasBought;
  const { isClickDoubled } = useClickMultiplier();
  const { multiplierCPS } = useCPSMultiplier();
  const isMobile = useMediaQuery("(max-width:768px)");
  const intervalRef = useRef<null | NodeJS.Timer>(null);
  const cookieCount = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.cookieCount
  );
  const upgrades = useSelector((state: RootState) => state.gameLogic.upgrades);
  const shopItems = useSelector(
    (state: RootState) => state.gameLogic.shopItems
  );
  const CPS = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.CPS
  );
  const CPC = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.CPC
  );
  const crystals = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.crystals
  );
  const isSkillTreeUnlocked = useSelector(
    (state: RootState) => state.gameLogic.skillTreeLogic.isSkillTreeUnlocked
  );
  const statesWereLoaded = useSelector(
    (state: RootState) => state.gameLogic.areStatesLoaded
  );
  const isChakraBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "chakra"
      ) as singleSkillTreeNode
  ).wasBought;
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageCookieCount =
        Number(localStorage.getItem("cookieCount")) ?? 0;
      const localStorageCrystalsCount =
        Number(localStorage.getItem("crystals")) ?? 0;
      const locaStorageCrystalUpgrades =
        (JSON.parse(
          localStorage.getItem("crystalItems")!
        ) as CrystalShopItems) ?? initialStateOfCrystalShopItems;
      const localStorageCPSCount = Number(localStorage.getItem("CPS") ?? 0);
      const localStorageCPCCount = Number(localStorage.getItem("CPC") ?? 1);
      const localStorageUpgrades =
        (JSON.parse(localStorage.getItem("upgrades")!) as UpgradesInterface) ??
        initialUpgradesState;
      const localStorageShopItems =
        (JSON.parse(localStorage.getItem("shopItems")!) as ShopItems) ??
        initialStateOfShopItems;
      const localStorageSkillTreeUnlocked =
        localStorage.getItem("skillTreeUnlocked") === "true" ? true : false;
      Object.values(localStorageUpgrades).forEach((item) => {
        const obj = item;
        dispatch(
          setInitialNumberOfUpgradesForUpgrade({
            name: obj.upgradeName,
            number: obj.numberOfUpgrades,
          })
        );
      });
      dispatch(setInitialSkillTree(localStorageSkillTreeUnlocked));
      dispatch(setInitialShopitems(localStorageShopItems));
      dispatch(setInitialCookieCount(localStorageCookieCount));
      dispatch(setInitialCPS(localStorageCPSCount));
      dispatch(setInitialCPC(localStorageCPCCount));
      dispatch(setInitialCrystals(localStorageCrystalsCount));
      dispatch(setInitialCrystalShopItems(locaStorageCrystalUpgrades));
      dispatch(stateWereLoaded(true));
    }
  }, []);
  useEffect(() => {
    if (isClickDoubled) {
      intervalRef.current && clearInterval(intervalRef.current);
    }
  }, [isClickDoubled, intervalRef.current]);
  useEffect(() => {
    if (!statesWereLoaded || isClickDoubled) return;
    const gameLoopInterval = setInterval(
      () => dispatch(addCookie(CPS * multiplierCPS)),
      1000
    );
    intervalRef.current = gameLoopInterval;
    return () => clearInterval(gameLoopInterval);
  }, [multiplierCPS, CPS, statesWereLoaded]);
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
              <h2 className="text-2xl text-center">
                Cookies:{" "}
                <CountUp
                  end={cookieCount}
                  preserveValue={true}
                  duration={0.35}
                  separator={" "}
                  formattingFn={formatCookieCount}
                />
              </h2>
              {Object.values(upgrades)
                .filter((x) => {
                  const upgrade = x as UpgradeInterface;
                  if (
                    upgrade.upgradeName === "upgrade11" ||
                    upgrade.upgradeName === "upgrade12"
                  ) {
                    if (isQPBought) {
                      return x;
                    }
                  } else {
                    return x;
                  }
                })
                .map((x) => {
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
      <aside className="absolute md:top-4 md:bottom-0 bottom-2 right-2">
        <div className="flex justify-center items-center gap-1">
          <CrystalsModal />
          <CrystalsDisplay />
          <Store />
        </div>
      </aside>
      {shopItems.find((x) => x.name === "unlockSkillTree")?.wasBought &&
      !isSkillTreeUnlocked ? (
        <EternalTalk resetGameLogic={() => resetGameLogic(10)} />
      ) : (
        isSkillTreeUnlocked && <SkillTreeModal />
      )}
      {isChakraBought && <Chakra />}
      <main className="min-h-screen">
        <div className="flex flex-col gap-2 justify-center items-center">
          {/* <button className="btn" onClick={() => resetGameLogic()}>
            Test
          </button> */}
          <Header />
          <CookiesDisplay
            cookieCount={Number(cookieCount.toFixed(2))}
            CPS={Number(CPS.toFixed(2))}
            CPC={Number(CPC.toFixed(2))}
            crystals={Number(crystals.toFixed(2))}
          />
          <CookieToClick />
          {/* This Code is checking if player has bought 10 upgrades of type */}
          {Object.values(upgrades).reduce((acc, a) => {
            if (acc && a.numberOfUpgrades >= 10) return acc;
            return (acc = false);
          }, true) && <ResetModal resetGameLogic={resetGameLogic} />}
          <div className="grid place-items-center  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-rows-1 gap-2 mt-6 w-full xl:w-3/4">
            {isMobile !== null &&
              !isMobile &&
              //Otherwise we render  upgrades in grid container
              Object.values(upgrades)
                .filter((x) => {
                  const upgrade = x as UpgradeInterface;
                  if (
                    upgrade.upgradeName === "upgrade11" ||
                    upgrade.upgradeName === "upgrade12"
                  ) {
                    if (isQPBought) {
                      return x;
                    }
                  } else {
                    return x;
                  }
                })
                .map((x) => {
                  return <Upgrade {...x} key={x.upgradeName} />;
                })}
          </div>
        </div>
      </main>
    </>
  );
};
