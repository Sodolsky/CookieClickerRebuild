import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import ChakraImage from "../../public/chakra64x64.png";
import { switchChakraState } from "../../redux/chakraReducer";
import { RootState } from "../../redux/store";
import { secondsToTime } from "../../utils/utils";
interface timers {
  timer: number;
  waitTime: number;
}

export const Chakra = () => {
  const dispatch = useDispatch();
  const isChakraActive = useSelector(
    (state: RootState) => state.chakra.isActive
  );
  const [timers, setTimers] = useState<timers>({ waitTime: 0, timer: 30 });
  const [stateOfChakra, setStateOfChakra] = useState<
    "cooldown" | "readyToUse" | "inUsage"
  >("readyToUse");
  const timingInterval = useRef<NodeJS.Timer | null>(null);
  const turnChakraOn = () => {
    if (isChakraActive || stateOfChakra !== "readyToUse") return;
    dispatch(switchChakraState(true));
    setStateOfChakra("inUsage");
    timingInterval.current = setInterval(
      () => setTimers((prev) => ({ ...prev, timer: prev.timer - 1 })),
      1000
    );
  };
  useEffect(() => {
    if (timingInterval.current) {
      if (timers.timer <= 0) {
        setStateOfChakra("cooldown");
        setTimers(() => ({ waitTime: 0, timer: 30 }));
        dispatch(switchChakraState(false));
        clearInterval(timingInterval.current);
      }
      if (timers.waitTime === 90 && stateOfChakra === "cooldown") {
        setStateOfChakra("readyToUse");
        clearInterval(timingInterval.current);
      }
    }
  }, [timers, timingInterval.current]);
  useEffect(() => {
    if (stateOfChakra === "cooldown") {
      timingInterval.current = setInterval(() => {
        setTimers((prev) => {
          return { ...prev, waitTime: (prev.waitTime += 1) };
        });
      }, 1000);
    }
  }, [stateOfChakra]);
  return (
    <figure
      className="absolute bottom-24 left-2 md:top-24 md:left-4 cursor-pointer h-32 w-32"
      onClick={turnChakraOn}
    >
      <CircularProgressbarWithChildren
        value={stateOfChakra === "cooldown" ? timers.waitTime : timers.timer}
        maxValue={stateOfChakra === "cooldown" ? 90 : 30}
        styles={{
          path: {
            stroke:
              stateOfChakra === "readyToUse" || stateOfChakra === "inUsage"
                ? `rgb(127, 255, 0)`
                : `rgb(220,20,60)
`,
          },
        }}
      >
        <div className="flex justify-center items-center flex-col">
          <span>
            {stateOfChakra === "cooldown"
              ? secondsToTime(timers.waitTime)
              : secondsToTime(timers.timer)}
          </span>
          <Image
            src={ChakraImage}
            alt={"Chakra Image"}
            height={64}
            width={64}
          />
        </div>
      </CircularProgressbarWithChildren>
    </figure>
  );
};
