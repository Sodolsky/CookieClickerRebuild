import CountUp from "react-countup";
import { abbreviateNumber } from "js-abbreviation-number";
import { symbolsArray } from "../../utils/interfaces";
import { useCallback } from "react";
import { useDoubleClickUpgrade } from "../../utils/hooks/useDoubleClickUpgrade";
interface CookiesDisplayProps {
  cookieCount: number;
  CPS: number;
  CPC: number;
  crystals: number;
}
export const CookiesDisplay: React.FC<CookiesDisplayProps> = ({
  cookieCount,
  CPS,
  CPC,
}) => {
  const { isClickDoubled, multiplier } = useDoubleClickUpgrade();
  const formatCookieCount = useCallback((n: number) => {
    return abbreviateNumber(n, 2, symbolsArray);
  }, []);
  return (
    <section className="flex flex-col items-center justify-center text-xl">
      <div className="text-lg lg:text-2xl font-bold">
        Cookies:{" "}
        <CountUp
          end={cookieCount}
          preserveValue={true}
          duration={0.35}
          separator={" "}
          formattingFn={formatCookieCount}
        />
      </div>
      <div className="text-lg lg:text-xl">
        CPS:{" "}
        {isClickDoubled ? (
          <span className="text-red-500 font-bold">Disabled</span>
        ) : (
          <span>{abbreviateNumber(CPS, 1, symbolsArray)}/s</span>
        )}
      </div>
      <div className="text-lg lg:text-xl">
        CPC: {abbreviateNumber(CPC * multiplier, 1, symbolsArray)}
      </div>
    </section>
  );
};
