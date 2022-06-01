import { clear } from "console";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import ChakraImage from "../../public/chakra64x64.png";
import { switchChakraState } from "../../redux/chakraReducer";
import { RootState } from "../../redux/store";
import { secondsToTime } from "../../utils/utils";
export const Chakra = () => {
  const dispatch = useDispatch();
  const isChakraActive = useSelector(
    (state: RootState) => state.chakra.isActive
  );
  const [timer, setTimer] = useState(30);
  const secondsInterval = useRef<NodeJS.Timer>();
  const turnChakraOn = () => {
    if (isChakraActive) return;
    dispatch(switchChakraState(true));
    secondsInterval.current = setInterval(
      () => setTimer((prev) => (prev -= 1)),
      1000
    );
  };
  useEffect(() => {
    if (timer <= 0 && secondsInterval.current) {
      setTimer(30);
      dispatch(switchChakraState(false));
      clearInterval(secondsInterval.current);
    }
  }, [timer, secondsInterval.current]);

  return (
    <figure
      className="absolute bottom-24 left-2 md:top-24 md:left-4 cursor-pointer h-32 w-32"
      onClick={turnChakraOn}
    >
      <CircularProgressbarWithChildren value={timer} maxValue={30}>
        <div className="flex justify-center items-center flex-col">
          <span>{secondsToTime(timer)}</span>
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
