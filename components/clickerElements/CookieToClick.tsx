import { useDispatch, useSelector } from "react-redux";
import { addCookie } from "../../redux/gameLogicReducer";
import Image from "next/image";
import CoockieImage from "../../public/cookie.png";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useDoubleClickUpgrade } from "../../utils/hooks/useDoubleClickUpgrade";
// export interface CookieToClickProps {
//   setCookieCount: React.Dispatch<React.SetStateAction<number>>;
// }
export const CookieToClick: React.FC = () => {
  const dispatch = useDispatch();
  const CPC = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.CPC
  );
  const { isClickDoubled, multiplier } = useDoubleClickUpgrade();
  const handleClickIncrementation = () => {
    dispatch(addCookie(CPC * multiplier));
  };
  return (
    <Image
      src={CoockieImage}
      className={"cursor-pointer transition-all"}
      onClick={handleClickIncrementation}
      height={256}
      width={256}
    />
  );
};
