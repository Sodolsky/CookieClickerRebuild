import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useDoubleClickUpgrade = () => {
  const [multiplier, setMultiplier] = useState<number>(1);
  const isClickDoubled = useSelector(
    (state: RootState) =>
      state.gameLogic.shopItems.find((x) => x.name === "doubleClick")?.wasBought
  );
  useEffect(() => {
    if (isClickDoubled) {
      setMultiplier(2);
    } else {
      setMultiplier(1);
    }
  }, [isClickDoubled]);
  return { isClickDoubled, multiplier };
};
