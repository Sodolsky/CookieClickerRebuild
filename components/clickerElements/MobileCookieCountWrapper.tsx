import { useCallback } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { numberFormatter } from "../../utils/utils";

export const MobileCookieCountWrapper = () => {
  const formatCookieCount = useCallback((n: number) => {
    try {
      return numberFormatter.format(n);
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
