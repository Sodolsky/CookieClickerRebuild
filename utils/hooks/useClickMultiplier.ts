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
  const isChakraActive = useSelector(
    (state: RootState) => state.chakra.isActive
  );
  useEffect(() => {
    let multiplier: number = 1;
    if (isClickDoubled) multiplier += 1;
    if (isClickTripledFromSkillTreeUpgrades) multiplier += 3;
    if (isChakraActive) multiplier += 10;
    setMultiplier(multiplier);
  }, [isClickDoubled, isClickTripledFromSkillTreeUpgrades, isChakraActive]);
  return { isClickDoubled, multiplier };
};
