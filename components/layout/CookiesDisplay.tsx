import CountUp from "react-countup";
import { abbreviateNumber } from "js-abbreviation-number";
import { symbolsArray } from "../../utils/interfaces";
import { useCallback, useEffect, useRef } from "react";
import { useClickMultiplier } from "../../utils/hooks/useClickMultiplier";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "next/image";
import { useCPSMultiplier } from "../../utils/hooks/useCPSMultiplier";
interface CookiesDisplayProps {
  CPS: number;
  CPC: number;
}
export const CookiesDisplay: React.FC<CookiesDisplayProps> = ({ CPS, CPC }) => {
  const { isClickDoubled, multiplier } = useClickMultiplier();
  const explosionDivRef = useRef<HTMLDivElement | null>(null);
  const { multiplierCPS } = useCPSMultiplier();
  const formatCookieCount = useCallback((n: number) => {
    try {
      return abbreviateNumber(n, 2, symbolsArray);
    } catch (error) {
      return n.toFixed(2);
    }
  }, []);
  const explosionCookiesCount = useSelector(
    (state: RootState) => state.explosionCookies.cookies
  );
  const cookieCount = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.cookieCount
  );
  const timerRef = useRef<null | NodeJS.Timer>(null);

  function hideExplosionsCookies() {
    if (explosionDivRef.current) {
      explosionDivRef.current.style.display = "none";
    }
  }
  useEffect(() => {
    if (explosionDivRef.current) {
      const style = window.getComputedStyle(explosionDivRef.current);
      const isVisible = style.getPropertyValue("display");
      if (explosionCookiesCount === 0) {
        explosionDivRef.current.style.display = "none";
      } else if (isVisible === "none") {
        explosionDivRef.current.style.display = "flex";
        timerRef.current = setTimeout(hideExplosionsCookies, 3000);
      } else if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(hideExplosionsCookies, 3000);
      }
    }
  }, [explosionCookiesCount]);
  return (
    <section className="flex flex-col items-center justify-center text-xl">
      <div className="text-lg lg:text-2xl font-bold">
        Cookies:
        <CountUp
          end={cookieCount}
          preserveValue={true}
          duration={0.35}
          separator={" "}
          formattingFn={formatCookieCount}
        />
      </div>

      <div
        className="flex items-center justify-center gap-1"
        ref={explosionDivRef}
      >
        <Image
          src={"/explosion.png"}
          alt={"Explosion"}
          height={32}
          width={32}
        />
        <span>
          +
          {abbreviateNumber(Math.round(explosionCookiesCount), 2, symbolsArray)}{" "}
          COOKIES!
        </span>
      </div>

      <div className="text-lg lg:text-xl">
        CPS:{" "}
        {isClickDoubled ? (
          <span className="text-red-500 font-bold">Disabled</span>
        ) : (
          <span>
            {abbreviateNumber(Math.round(CPS * multiplierCPS), 1, symbolsArray)}
            /s
          </span>
        )}
      </div>
      <div className="text-lg lg:text-xl">
        CPC: {abbreviateNumber(Math.round(CPC * multiplier), 1, symbolsArray)}
      </div>
    </section>
  );
};
