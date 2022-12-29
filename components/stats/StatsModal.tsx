import Image from "next/image";
import StatsIcon from "../../public/stats.png";
import { useCPCMultiplier } from "../../utils/hooks/useCPCMultiplier";
import { useCPSMultiplier } from "../../utils/hooks/useCPSMultiplier";
import ClickIcon from "../../public/click32x32.png";
import IdleIcon from "../../public/idle32x32.png";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CookiesShopItem, singleSkillTreeNode } from "../../utils/interfaces";
interface multiplierBreakDownInterface {
  CPCBaseRate: number;
  CPCMultiplier: number;
  CPSBaseRate: number;
  CPSMultiplier: number;
}
const baseMultipliersBreakdownObject: multiplierBreakDownInterface = {
  CPCBaseRate: 1,
  CPCMultiplier: 1,
  CPSBaseRate: 1,
  CPSMultiplier: 1,
};
export const StatsModal = () => {
  const { multiplierCPS } = useCPSMultiplier();
  const { isClickDoubled, multiplier } = useCPCMultiplier();
  const [multipliersBreakdown, setMultipliersBreakdown] =
    useState<multiplierBreakDownInterface>(baseMultipliersBreakdownObject);
  const doubleClickShopItemState = useSelector((state: RootState) =>
    state.gameLogic.shopItems.find((x) => x.name === "doubleClick")
  ) as CookiesShopItem;
  const isClickDoubledFromShop =
    doubleClickShopItemState.wasBought && !doubleClickShopItemState.isLocked;
  const isClickTripledFromSkillTreeUpgrades = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "clickingTalent"
      ) as singleSkillTreeNode
  ).wasBought;
  const isClickingWithLoveBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "clickingWithLove"
      ) as singleSkillTreeNode
  ).wasBought;
  const isChakraUpgraded = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "heartOfTheEternal"
      ) as singleSkillTreeNode
  ).wasBought;
  const isChakraActive = useSelector(
    (state: RootState) => state.chakra.isActive
  );
  const isCrystalBallBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "crystalBall"
      ) as singleSkillTreeNode
  ).wasBought;
  const bonusFromCrystalBall = useSelector(
    (state: RootState) => state.crystalBall.bonus
  );
  const isEqualibrumBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "equalibrum"
      ) as singleSkillTreeNode
  ).wasBought;
  const wheelOfFortuneBonus =
    useSelector((state: RootState) => state.wheelOfFortune.currentBonus) ===
    "CPC";
  const equalibrumState = useSelector(
    (state: RootState) => state.eqalibrum.state
  );
  const bonusFromHolyCrossCPC =
    useSelector(
      (state: RootState) => state.holyCross.currentBonuses.CPCMultiplier
    ) /
      100 +
    1;
  const bonusFromHolyCrossCPS =
    useSelector(
      (state: RootState) => state.holyCross.currentBonuses.CPSMultiplier
    ) /
      100 +
    1;
  const isHolyCrossBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "holyCross"
      ) as singleSkillTreeNode
  ).wasBought;
  const totalCollectedCrystals = useSelector(
    (state: RootState) => state.userStats.totalCrystalsCollected
  );
  const isCollectorBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "collector"
      ) as singleSkillTreeNode
  ).wasBought;
  const isIdlePlayerBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "idlePlayer"
      ) as singleSkillTreeNode
  ).wasBought;
  const isTimeMachineBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "timeMachine"
      ) as singleSkillTreeNode
  ).wasBought;
  const collectorMultiplier = useMemo(
    () => Math.floor(totalCollectedCrystals / 1000) * 1,
    [totalCollectedCrystals]
  );
  //? Use Effect that counts base rate of CPC
  useEffect(() => {
    let baseRate: number = 1;
    if (isClickDoubled) baseRate += 1;
    if (isCollectorBought) baseRate += collectorMultiplier;
    if (isClickTripledFromSkillTreeUpgrades) baseRate += 3;
    if (isChakraActive) {
      if (isChakraUpgraded) baseRate += 10;
      else baseRate += 3;
    }
    setMultipliersBreakdown((prev) => ({ ...prev, CPCBaseRate: baseRate }));
  }, [
    isClickDoubled,
    isCollectorBought,
    isClickTripledFromSkillTreeUpgrades,
    isChakraActive,
    isChakraUpgraded,
  ]);
  //? Use Effect that counts multiplier of CPC
  useEffect(() => {
    let multiplier: number = 1;
    if (isCrystalBallBought) multiplier += bonusFromCrystalBall;
    if (isClickingWithLoveBought) multiplier += 2;
    if (wheelOfFortuneBonus) multiplier += 3;
    if (isHolyCrossBought) multiplier += bonusFromHolyCrossCPC;
    if (isEqualibrumBought && equalibrumState === "idleExhaustion")
      multiplier += 3;
    setMultipliersBreakdown((prev) => ({ ...prev, CPCMultiplier: multiplier }));
  }, [
    isCrystalBallBought,
    isClickingWithLoveBought,
    wheelOfFortuneBonus,
    bonusFromCrystalBall,
    wheelOfFortuneBonus,
    isHolyCrossBought,
    bonusFromHolyCrossCPC,
    isEqualibrumBought,
    equalibrumState,
  ]);
  //? Use Effect that counts base rate of CPS
  useEffect(() => {
    let baseRate: number = 1;
    if (isIdlePlayerBought) baseRate += 4;
    if (isCollectorBought) baseRate += collectorMultiplier;
    if (isChakraActive) {
      if (isChakraUpgraded) baseRate += 10;
      else baseRate += 3;
    }
    setMultipliersBreakdown((prev) => ({
      ...prev,
      CPSBaseRate: baseRate,
    }));
  }, [isCollectorBought, isIdlePlayerBought, isChakraActive, isChakraUpgraded]);
  //? Use Effect that counts multiplier of CPS
  useEffect(() => {
    let multiplier: number = 1;
    if (isCrystalBallBought) multiplier += bonusFromCrystalBall;
    if (isTimeMachineBought) multiplier += 2;
    if (wheelOfFortuneBonus) multiplier += 3;
    if (isHolyCrossBought) multiplier += bonusFromHolyCrossCPS;
    if (isEqualibrumBought && equalibrumState === "clickExhaustion")
      multiplier += 3;
    setMultipliersBreakdown((prev) => ({
      ...prev,
      CPSMultiplier: multiplier,
    }));
  }, [
    isCrystalBallBought,
    bonusFromCrystalBall,
    isTimeMachineBought,
    wheelOfFortuneBonus,
    isHolyCrossBought,
    bonusFromHolyCrossCPS,
    isEqualibrumBought,
    equalibrumState,
  ]);
  return (
    <>
      <label htmlFor="StatsModal">
        <figure className={` cursor-pointer`}>
          <Image src={StatsIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="StatsModal" />

      <label htmlFor="StatsModal" className={`modal`}>
        <label className="modal-box bg-white" htmlFor="">
          <h1 className="text-2xl font-bold text-center">Stats</h1>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
            >
              <div className="collapse-title text-xl font-medium">
                <div className="flex gap-2 justify-center items-center">
                  <Image src={ClickIcon} width={32} height={32} />
                  <span>Click Multiplier: {Math.floor(multiplier)}</span>
                </div>
              </div>
              <div className="collapse-content">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <div>Base Rate: {multipliersBreakdown.CPCBaseRate}</div>
                  <div>
                    Multiplier: {multipliersBreakdown.CPCMultiplier.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
            >
              <div className="collapse-title text-xl font-medium">
                <div className="flex gap-2 justify-center items-center">
                  <Image src={IdleIcon} width={32} height={32} />
                  <span>Idle Multiplier: {Math.floor(multiplierCPS)}</span>
                </div>
              </div>
              <div className="collapse-content">
                <div className="flex flex-col gap-1 justify-center items-center">
                  <div>Base Rate: {multipliersBreakdown.CPSBaseRate}</div>
                  <div>
                    Multiplier: {multipliersBreakdown.CPSMultiplier.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};
