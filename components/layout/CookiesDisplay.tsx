import CountUp from "react-countup";
import { abbreviateNumber } from "js-abbreviation-number";
import { symbolsArray } from "../../utils/interfaces";
import { useCallback } from "react";
interface CookiesDisplayProps {
  cookieCount: number;
  CPS: number;
  CPC: number;
}
export const CookiesDisplay: React.FC<CookiesDisplayProps> = ({
  cookieCount,
  CPS,
  CPC,
}) => {
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
        CPS: {abbreviateNumber(CPS, 1, symbolsArray)}/s
      </div>
      <div className="text-lg lg:text-xl">
        CPC: {abbreviateNumber(CPC, 1, symbolsArray)}
      </div>
    </section>
  );
};
