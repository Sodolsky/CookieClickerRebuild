import { useDispatch, useSelector } from "react-redux";
import { addCookie } from "../../redux/gameLogicReducer";
import Image from "next/image";
import CoockieImage from "../../public/cookie.png";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { useDoubleClickUpgrade } from "../../utils/hooks/useDoubleClickUpgrade";
import { animated, config, Controller, useSpring } from "react-spring";
// export interface CookieToClickProps {
//   setCookieCount: React.Dispatch<React.SetStateAction<number>>;
// }
const animationObject = {
  from: { scale: 1 },
  to: [{ scale: 0.8 }, { scale: 1 }],
  config: config.wobbly,
};
export const CookieToClick: React.FC = () => {
  const [isSmaller, setisSmaller] = useState<boolean>(false);
  const [styles, api] = useSpring(() => animationObject);
  const dispatch = useDispatch();
  const CPC = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.CPC
  );
  const { isClickDoubled, multiplier } = useDoubleClickUpgrade();
  const handleClickIncrementation = () => {
    dispatch(addCookie(CPC * multiplier));
  };
  return (
    <animated.div style={styles}>
      <Image
        src={CoockieImage}
        className={"cursor-pointer transition-all"}
        onClick={() => {
          handleClickIncrementation();
          setisSmaller((prev) => !prev);
          api.start(animationObject);
        }}
        height={256}
        width={256}
      />
    </animated.div>
  );
};
