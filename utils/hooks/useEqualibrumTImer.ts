import { useEffect, useRef } from "react";

interface useEqalibrumTimerInterface {
  isEqualibrumBought: boolean;
  equlibrumState: "idle" | "clickExhaustion" | "idleExhaustion";
}
type timerType = null | NodeJS.Timer;
const useEqualibrumTimer = (
  parentState: useEqalibrumTimerInterface
): timerType => {
  const { isEqualibrumBought, equlibrumState } = parentState;
  const intervalRef = useRef<timerType>(null);
  useEffect(() => {
    //TODO Add removing stacks logic
    if (equlibrumState === "clickExhaustion") {
    } else {
    }
  }, [equlibrumState, isEqualibrumBought]);
  return intervalRef.current;
};

export default useEqualibrumTimer;
