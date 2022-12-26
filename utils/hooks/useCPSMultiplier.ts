import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../interfaces";
//? CPS stands for Cookies Per Second
export const useCPSMultiplier = () => {
  const [multiplierCPS, setMultiplierCPS] = useState<number>(1);
  const isIdlePlayerBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "idlePlayer"
      ) as singleSkillTreeNode
  ).wasBought;
  const isChakraActive = useSelector(
    (state: RootState) => state.chakra.isActive
  );
  const isTimeMachineBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "timeMachine"
      ) as singleSkillTreeNode
  ).wasBought;
  const isChakraUpgraded = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "heartOfTheEternal"
      ) as singleSkillTreeNode
  ).wasBought;
  const isCrystalBallBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "crystalBall"
      ) as singleSkillTreeNode
  ).wasBought;

  const bonusFromCrystalBall = useSelector(
    (state: RootState) => state.crystalBall.bonus
  );
  const bonusFromHolyCross =
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
  const isEqualibrumBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "equalibrum"
      ) as singleSkillTreeNode
  ).wasBought;
  const equalibrumState = useSelector(
    (state: RootState) => state.eqalibrum.state
  );
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
  const wheelOfFortuneBonus =
    useSelector((state: RootState) => state.wheelOfFortune.currentBonus) ===
    "CPS";
  useEffect(() => {
    let multiplier: number = 1;
    if (isIdlePlayerBought) multiplier += 4;
    if (isCollectorBought) multiplier += collectorMultiplier;
    if (isChakraActive) {
      if (isChakraUpgraded) multiplier += 10;
      else multiplier += 3;
    }
    if (isCrystalBallBought) multiplier *= bonusFromCrystalBall;
    if (isTimeMachineBought) multiplier *= 2;
    if (wheelOfFortuneBonus) multiplier *= 3;
    if (isHolyCrossBought) multiplier *= bonusFromHolyCross;
    if (isEqualibrumBought && equalibrumState === "clickExhaustion")
      multiplier *= 3;
    setMultiplierCPS(multiplier);
  }, [
    isIdlePlayerBought,
    isChakraActive,
    isTimeMachineBought,
    isChakraUpgraded,
    bonusFromCrystalBall,
    isCrystalBallBought,
    isEqualibrumBought,
    equalibrumState,
    isHolyCrossBought,
    bonusFromHolyCross,
    wheelOfFortuneBonus,
    isCollectorBought,
  ]);
  return { multiplierCPS };
};
