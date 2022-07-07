import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../interfaces";

export const useClickMultiplier = () => {
  const [multiplier, setMultiplier] = useState<number>(1);
  const isClickDoubled = useSelector(
    (state: RootState) =>
      state.gameLogic.shopItems.find((x) => x.name === "doubleClick")?.wasBought
  );

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
  const equalibrumState = useSelector(
    (state: RootState) => state.eqalibrum.state
  );
  useEffect(() => {
    let multiplier: number = 1;
    if (isClickDoubled) multiplier += 1;
    if (isClickTripledFromSkillTreeUpgrades) multiplier += 3;
    if (isChakraActive) {
      if (isChakraUpgraded) multiplier += 10;
      else multiplier += 3;
    }
    if (isCrystalBallBought) multiplier *= bonusFromCrystalBall;
    if (isClickingWithLoveBought) multiplier *= 2;
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
  ]);
  return { isClickDoubled, multiplier };
};
