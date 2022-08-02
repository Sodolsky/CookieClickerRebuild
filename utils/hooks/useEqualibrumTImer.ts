import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { reduceEQStacks } from "../../redux/equalibrumReducer";

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
  const dispatch = useDispatch();
  useEffect(() => {
    //TODO Add removing stacks logic

    if (equlibrumState === "clickExhaustion") {
      intervalRef.current = setInterval(() => {
        dispatch(reduceEQStacks({ number: 5, stackType: "click" }));
      }, 1000);
    } else if (equlibrumState === "idleExhaustion") {
      intervalRef.current = setInterval(() => {
        dispatch(reduceEQStacks({ number: 5, stackType: "idle" }));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [equlibrumState, isEqualibrumBought]);
  return intervalRef.current;
};

export default useEqualibrumTimer;
