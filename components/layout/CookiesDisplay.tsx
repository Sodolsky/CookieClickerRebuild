import { abbreviateNumber } from "js-abbreviation-number";
import CountUp from "react-countup";

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
  return (
    <section className="flex flex-col items-center justify-center text-xl">
      <div className="text-2xl font-bold">
        Cookies:{" "}
        <CountUp
          end={cookieCount}
          preserveValue={true}
          duration={0.35}
          separator={" "}
        />
      </div>
      <div>CPS: {abbreviateNumber(CPS)}/s</div>
      <div>CPC: {abbreviateNumber(CPC)}</div>
    </section>
  );
};
