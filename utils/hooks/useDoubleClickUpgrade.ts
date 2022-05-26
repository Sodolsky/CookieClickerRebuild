import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../interfaces";

export const useDoubleClickUpgrade = () => {
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
  useEffect(() => {
    if (isClickTripledFromSkillTreeUpgrades && isClickDoubled) {
      setMultiplier(5);
    } else if (isClickDoubled) {
      setMultiplier(2);
    } else if (isClickTripledFromSkillTreeUpgrades) {
      setMultiplier(3);
    } else {
      setMultiplier(1);
    }
  }, [isClickDoubled, isClickTripledFromSkillTreeUpgrades]);
  return { isClickDoubled, multiplier };
};
