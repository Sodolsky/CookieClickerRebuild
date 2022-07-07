import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../interfaces";

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
  const isEqualibrumBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "equalibrum"
      ) as singleSkillTreeNode
  ).wasBought;
  const equalibrumState = useSelector(
    (state: RootState) => state.eqalibrum.state
  );
  useEffect(() => {
    let multiplier: number = 1;
    if (isIdlePlayerBought) multiplier += 4;
    if (isChakraActive) {
      if (isChakraUpgraded) multiplier += 10;
      else multiplier += 3;
    }
    if (isCrystalBallBought) multiplier *= bonusFromCrystalBall;
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
  ]);
  return { multiplierCPS };
};
