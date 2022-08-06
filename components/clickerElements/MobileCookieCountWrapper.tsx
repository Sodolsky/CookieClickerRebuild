import { abbreviateNumber } from "js-abbreviation-number";
import { useCallback } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { symbolsArray } from "../../utils/interfaces";

export const MobileCookieCountWrapper = () => {
  const formatCookieCount = useCallback((n: number) => {
    try {
      return abbreviateNumber(n, 2, symbolsArray);
    } catch (error) {
      return n.toFixed(2);
    }
  }, []);

  const cookieCount = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.cookieCount
  );
  return (
    <h2 className="text-2xl text-center">
      Cookies:{" "}
      <CountUp
        end={cookieCount}
        preserveValue={true}
        duration={0.25}
        separator={" "}
        formattingFn={formatCookieCount}
      />
    </h2>
  );
};
