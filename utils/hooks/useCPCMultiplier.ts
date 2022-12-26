import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CookiesShopItem, singleSkillTreeNode } from "../interfaces";
//? CPC stands for Cookies Per Click
export const useCPCMultiplier = () => {
  const [multiplier, setMultiplier] = useState<number>(1);
  const doubleClickShopItemState = useSelector((state: RootState) =>
    state.gameLogic.shopItems.find((x) => x.name === "doubleClick")
  ) as CookiesShopItem;
  const isClickDoubled =
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
  const bonusFromHolyCross =
    useSelector(
      (state: RootState) => state.holyCross.currentBonuses.CPCMultiplier
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
  const collectorMultiplier = useMemo(
    () => Math.floor(totalCollectedCrystals / 1000) * 1,
    [totalCollectedCrystals]
  );
  useEffect(() => {
    let multiplier: number = 1;
    if (isClickDoubled) multiplier += 1;
    if (isCollectorBought) multiplier += collectorMultiplier;
    if (isClickTripledFromSkillTreeUpgrades) multiplier += 3;
    if (isChakraActive) {
      if (isChakraUpgraded) multiplier += 10;
      else multiplier += 3;
    }
    if (isCrystalBallBought) multiplier *= bonusFromCrystalBall;
    if (isClickingWithLoveBought) multiplier *= 2;
    if (wheelOfFortuneBonus) multiplier *= 3;
    if (isHolyCrossBought) multiplier *= bonusFromHolyCross;
    if (isEqualibrumBought && equalibrumState === "idleExhaustion")
      multiplier *= 3;
    setMultiplier(multiplier);
  }, [
    isClickDoubled,
    isClickTripledFromSkillTreeUpgrades,
    isChakraActive,
    isClickingWithLoveBought,
    isChakraUpgraded,
    bonusFromCrystalBall,
    isCrystalBallBought,
    isEqualibrumBought,
    equalibrumState,
    isHolyCrossBought,
    bonusFromHolyCross,
    wheelOfFortuneBonus,
  ]);
  return { isClickDoubled, multiplier };
};
