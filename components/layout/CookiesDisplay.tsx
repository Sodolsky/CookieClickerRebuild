import CountUp from "react-countup";
import { abbreviateNumber } from "js-abbreviation-number";
import { symbolsArray } from "../../utils/interfaces";
import { useCallback } from "react";
import { useClickMultiplier } from "../../utils/hooks/useClickMultiplier";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "next/image";
import { useCPSMultiplier } from "../../utils/hooks/useCPSMultiplier";
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
  const { isClickDoubled, multiplier } = useClickMultiplier();
  const { multiplierCPS } = useCPSMultiplier();
  const formatCookieCount = useCallback((n: number) => {
    return abbreviateNumber(n, 2, symbolsArray);
  }, []);
  const explosionCookiesCount = useSelector(
    (state: RootState) => state.explosionCookies.cookies
  );
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
      {explosionCookiesCount !== 0 && (
        <div className="flex items-center justify-center gap-1">
          <Image
            src={"/explosion.png"}
            alt={"Explosion"}
            height={32}
            width={32}
          />
          <span>
            +{abbreviateNumber(explosionCookiesCount, 2, symbolsArray)} COOKIES!
          </span>
        </div>
      )}
      <div className="text-lg lg:text-xl">
        CPS:{" "}
        {isClickDoubled ? (
          <span className="text-red-500 font-bold">Disabled</span>
        ) : (
          <span>
            {abbreviateNumber(CPS * multiplierCPS, 1, symbolsArray)}/s
          </span>
        )}
      </div>
      <div className="text-lg lg:text-xl">
        CPC: {abbreviateNumber(CPC * multiplier, 1, symbolsArray)}
      </div>
    </section>
  );
};
