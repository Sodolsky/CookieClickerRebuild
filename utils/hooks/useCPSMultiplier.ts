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
  useEffect(() => {
    let multiplier: number = 1;
    if (isIdlePlayerBought) multiplier += 4;
    if (isChakraActive) multiplier += 10;
    setMultiplierCPS(multiplier);
  }, [isIdlePlayerBought, isChakraActive]);
  return { multiplierCPS };
};
