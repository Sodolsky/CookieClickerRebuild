import { abbreviateNumber } from "js-abbreviation-number";

interface CookiesDisplayProps {
  cookieCount: number;
  CPS: number;
}
export const CookiesDisplay: React.FC<CookiesDisplayProps> = ({
  cookieCount,
  CPS,
}) => {
  return (
    <section className="flex flex-col items-center justify-center">
      <div>Cookie Count: {abbreviateNumber(cookieCount, 2)}</div>
      <div>CPS: {abbreviateNumber(CPS, 2)}/s</div>
    </section>
  );
};
