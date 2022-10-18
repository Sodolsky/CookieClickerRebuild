import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCookie,
  changeCPC,
  changeCPS,
  resetGameAndAddSkillPoints,
  setInitialCookieCount,
  setInitialCPC,
  setInitialCPS,
  setInitialCrystals,
  setInitialCrystalShopItems,
  setInitialNumberOfUpgradesForUpgrade,
  setInitialShopitems,
  setInitialSkillTree,
  setReducerDataFromFirebaseObject,
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
  singleSkillTreeNode,
  UpgradeInterface,
  firebaseObjectInterface,
} from "../utils/interfaces";
import { CookieToClick } from "./clickerElements/CookieToClick";
import { Upgrade } from "./clickerElements/Upgrade";
import { CookiesDisplay } from "./layout/CookiesDisplay";
import { Header } from "./layout/Header";
import { AiOutlineMenu } from "react-icons/ai";
import useMediaQuery from "../utils/hooks/useMediaQuery";
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
import { clearAllCrystalBallStates } from "../redux/crystalBallReducer";
import {
  initialPerformanceReducerState,
  performanceReducerInterface,
  setInitialPerformanceOptions,
} from "../redux/performanceReducer";
import { PerformanceModal } from "./performance/PerformanceModal";
import { MobileCookieCountWrapper } from "./clickerElements/MobileCookieCountWrapper";
import {
  changeBestUpgrade,
  changeBonusForTTT,
  clearTTTState,
} from "../redux/trashToTreasureReducer";
import {
  addIdleStacks,
  clearEqualibrumState,
} from "../redux/equalibrumReducer";
import useEqualibrumTimer from "../utils/hooks/useEqualibrumTImer";
import { EqualibrumStacksDisplay } from "./skillTree/EqualibrumStacksDisplay";
import { getBoughtUpgrades } from "../utils/utils";
import { BackendSynchronizationModal } from "./backendSynchronization/BackendSynchronizationModal";
import { useAuthStatus } from "../utils/hooks/useAuthStatus";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
export const MainPage = () => {
  const resetGameLogic = (skillPointsCount: number) => {
    intervalRef.current && clearInterval(intervalRef.current);
    dispatch(addExplosionCookiesCount(0));
    dispatch(clearAllCrystalBallStates());
    dispatch(clearTTTState());
    dispatch(clearEqualibrumState());
    dispatch(resetGameAndAddSkillPoints(skillPointsCount));
    dispatch(setInitialSkillTree(true));
  };
  const bgMusicRef = useRef<null | HTMLAudioElement>(null);
  const { authStatus, auth } = useAuthStatus();
  const explosionSoundRef = useRef<null | HTMLAudioElement>(null);
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

  const isTheoryOfEverythingBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "theoryOfEverything"
      ) as singleSkillTreeNode
  ).wasBought;
  const isEvenMoreQuestionsBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "evenMoreQuestions"
      ) as singleSkillTreeNode
  ).wasBought;
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
  const isTrashToTreasureBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "trashToTreasure"
      ) as singleSkillTreeNode
  ).wasBought;
  const TTTStats = useSelector((state: RootState) => state.trashToTreasure);
  const currentBestUpgrade = useSelector(
    (state: RootState) => state.trashToTreasure.bestUpgrade
  );
  const isEqualibrumBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "equalibrum"
      ) as singleSkillTreeNode
  ).wasBought;
  const equalibrumState = useSelector(
    (state: RootState) => state.eqalibrum.state
  );
  const equalibrumTimer = useEqualibrumTimer({
    equlibrumState: equalibrumState,
    isEqualibrumBought: isEqualibrumBought,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (authStatus === "ready" && !auth.currentUser) {
        const localStorageCookieCount =
          Number(localStorage.getItem("cookieCount")) ?? 0;
        const localStorageCrystalsCount =
          Number(localStorage.getItem("crystals")) ?? 0;
        const locaStorageCrystalUpgrades =
          (JSON.parse(
            localStorage.getItem("crystalItems")!
          ) as CrystalShopItems) ?? initialStateOfCrystalShopItems;
        const localStorageUpgrades =
          (JSON.parse(
            localStorage.getItem("upgrades")!
          ) as UpgradesInterface) ?? initialUpgradesState;
        const localStorageShopItems =
          (JSON.parse(localStorage.getItem("shopItems")!) as ShopItems) ??
          initialStateOfShopItems;
        const localStoragePerformanceOptions =
          (JSON.parse(
            localStorage.getItem("performance")!
          ) as performanceReducerInterface) ?? initialPerformanceReducerState;
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
        const CPSCount = Object.values(localStorageUpgrades).reduce(
          (acc: number, a: UpgradeInterface) =>
            (acc += a.numberOfUpgrades * a.CookiesPerSecondBonus),
          0
        );
        const CPCCount = Object.values(localStorageUpgrades).reduce(
          (acc: number, a: UpgradeInterface) =>
            (acc += a.numberOfUpgrades * a.CookiesPerClickBonus),
          1
        );
        dispatch(setInitialPerformanceOptions(localStoragePerformanceOptions));
        dispatch(setInitialSkillTree(localStorageSkillTreeUnlocked));
        dispatch(setInitialShopitems(localStorageShopItems));
        dispatch(setInitialCookieCount(localStorageCookieCount));
        dispatch(setInitialCPS(CPSCount));
        dispatch(setInitialCPC(CPCCount));
        dispatch(setInitialCrystals(localStorageCrystalsCount));
        dispatch(setInitialCrystalShopItems(locaStorageCrystalUpgrades));
        dispatch(stateWereLoaded(true));
      } else if (authStatus === "ready" && auth) {
        const getFirebaseData = async () => {
          const firebaseData: firebaseObjectInterface = await getDoc(
            doc(db, "Users", auth.currentUser?.email as string)
          ).then((doc) => doc.data() as firebaseObjectInterface);
          dispatch(setReducerDataFromFirebaseObject(firebaseData));
          dispatch(stateWereLoaded(true));
        };
        getFirebaseData();
      }
    }
  }, [authStatus]);
  useEffect(() => {
    if (isClickDoubled) {
      intervalRef.current && clearInterval(intervalRef.current);
    }
  }, [isClickDoubled, intervalRef.current]);
  useEffect(() => {
    if (!statesWereLoaded || isClickDoubled) return;
    const gameLoopInterval = setInterval(() => {
      dispatch(addCookie(CPS * multiplierCPS));
      if (isEqualibrumBought && equalibrumState === "idle") {
        dispatch(addIdleStacks(10));
      }
    }, 1000);
    intervalRef.current = gameLoopInterval;
    return () => clearInterval(gameLoopInterval);
  }, [
    multiplierCPS,
    CPS,
    statesWereLoaded,
    isEqualibrumBought,
    equalibrumState,
    isClickDoubled,
  ]);
  //?This UEF is for changing best Upgrade for TrashToTreasureReducer
  useEffect(() => {
    if (isTrashToTreasureBought) {
      const boughtUpgrades = getBoughtUpgrades(upgrades, false);
      if (boughtUpgrades.length < 2) return;
      const bestUpgrade = boughtUpgrades[boughtUpgrades.length - 1];
      const numberOfUpgradesBought = boughtUpgrades.reduce(
        (acc, a: UpgradeInterface) => (acc += a.numberOfUpgrades),
        0
      );
      const newBonus = 1 + numberOfUpgradesBought * 0.02;
      const newBonusesObject = {
        bonus: newBonus,
        CPSContribution:
          bestUpgrade.CookiesPerSecondBonus *
          newBonus *
          bestUpgrade.numberOfUpgrades,
        CPCContribution:
          bestUpgrade.CookiesPerClickBonus *
          newBonus *
          bestUpgrade.numberOfUpgrades,
      };
      if (currentBestUpgrade !== bestUpgrade.upgradeName) {
        const currentBestStats = Object.values(upgrades).find(
          (x: UpgradeInterface) => x.upgradeName == currentBestUpgrade
        ) as UpgradeInterface;
        const diffrences = {
          CPSDiff:
            currentBestStats.CookiesPerSecondBonus *
              currentBestStats.numberOfUpgrades *
              TTTStats.bonus -
            currentBestStats.CookiesPerSecondBonus *
              currentBestStats.numberOfUpgrades,
          CPCDiff:
            currentBestStats.CookiesPerClickBonus *
              currentBestStats.numberOfUpgrades *
              TTTStats.bonus -
            currentBestStats.CookiesPerClickBonus *
              currentBestStats.numberOfUpgrades,
        };
        dispatch(
          changeCPS({
            amount: diffrences.CPSDiff,
            type: "decrease",
          })
        );
        dispatch(
          changeCPC({
            amount: diffrences.CPCDiff,
            type: "decrease",
          })
        );
        dispatch(
          changeBestUpgrade({
            bestUpgrade: bestUpgrade.upgradeName,
            ...newBonusesObject,
          })
        );

        dispatch(
          changeCPS({
            amount: newBonusesObject.CPSContribution,
            type: "increase",
          })
        );
        dispatch(
          changeCPC({
            amount: newBonusesObject.CPCContribution,
            type: "increase",
          })
        );
      } else {
        dispatch(
          changeCPS({
            amount: TTTStats.CPSContribution,
            type: "decrease",
          })
        );
        dispatch(
          changeCPC({
            amount: TTTStats.CPCContribution,
            type: "decrease",
          })
        );
        dispatch(
          changeCPS({
            amount: newBonusesObject.CPSContribution,
            type: "increase",
          })
        );
        dispatch(
          changeCPC({
            amount: newBonusesObject.CPCContribution,
            type: "increase",
          })
        );
        dispatch(changeBonusForTTT(newBonusesObject));
      }
    }
  }, [upgrades, isTrashToTreasureBought, CPS]);
  return (
    <>
      <audio src="bgmusic.mp3" ref={bgMusicRef}></audio>
      <audio src="explosionSound.wav" ref={explosionSoundRef}></audio>
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
              <MobileCookieCountWrapper />
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
      <PerformanceModal />
      <BackendSynchronizationModal />
      {shopItems.find((x) => x.name === "unlockSkillTree")?.wasBought &&
      !isSkillTreeUnlocked ? (
        <EternalTalk resetGameLogic={() => resetGameLogic(10)} />
      ) : (
        isSkillTreeUnlocked && <SkillTreeModal />
      )}
      {isChakraBought && <Chakra />}
      {isEqualibrumBought && (
        <div className="absolute bottom-60 left-2 md:top-60 md:left-4">
          <EqualibrumStacksDisplay />
        </div>
      )}
      <main className="min-h-screen">
        <div className="flex flex-col gap-2 justify-center items-center">
          {/* <button className="btn" onClick={() => resetGameLogic()}>
            Test
          </button> */}
          <Header />
          <CookiesDisplay
            CPS={Number(CPS.toFixed(2))}
            CPC={Number(CPC.toFixed(2))}
          />
          <CookieToClick
            upgrades={upgrades}
            bgMusicRef={bgMusicRef.current}
            explosionSoundRef={explosionSoundRef.current}
          />
          {/* This Code is checking if player has bought 10 upgrades of type */}
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
            .reduce((acc, a) => {
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
                .map((x: UpgradeInterface) => {
                  return (
                    <Upgrade
                      {...x}
                      cost={
                        isTheoryOfEverythingBought
                          ? isEvenMoreQuestionsBought
                            ? Math.floor(x.cost / 4)
                            : Math.floor(x.cost / 2)
                          : x.cost
                      }
                      key={x.upgradeName}
                    />
                  );
                })}
          </div>
        </div>
      </main>
    </>
  );
};
