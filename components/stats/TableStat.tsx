import Image from "next/image";
import React from "react";
import BaseMultiplierImg from "../../public/base.png";
import CollectorImage from "../../public/collector.png";
import ClickingTalentImage from "../../public/click.png";
import ClickingWithLoveImage from "../../public/heart.png";
import TimeMachineImage from "../../public/stopwatch.png";
import LightningClickImage from "../../public/doubleClick.png";
import IdlePlayerImage from "../../public/sand-clock.png";
import CrystalBallImage from "../../public/crystal-ball.png";
import HolyCrossImage from "../../public/cross.png";
import EqualibrumImage from "../../public/yin-yang.png";
import ChakraImage from "../../public/chakra.png";
import WheelOfFortuneImage from "../../public/wheelOfFortune.png";
import HeartOfTheEternalImage from "../../public/sacred-heart.png";
import { allCPCBonuses, allCPSBonuses } from "./StatsModal";
interface tableStatInterface {
  bonus: allCPCBonuses | allCPSBonuses;
  singleBonus: number;
  number: number;
  operator: "+" | "*";
  baseRate: number;
}
type allbonusesCombined = allCPCBonuses | allCPSBonuses;
export const TableStat: React.FC<tableStatInterface> = ({
  bonus,
  number,
  operator,
  singleBonus,
  baseRate,
}) => {
  return (
    <tr
      className={`border border-collapse ${
        operator === "*" ? "border-orange-400" : "border-green-400"
      }`}
    >
      <td className="flex items-center justify-center">
        <Image src={getProperImage(bonus)} alt={bonus} width={32} height={32} />
      </td>
      <td className="px-3">{bonus}</td>
      <td>{singleBonus.toFixed(2)}</td>
      {operator === "+" ? (
        <td>{number}</td>
      ) : (
        <td>{Math.floor(baseRate * number)}</td>
      )}
    </tr>
  );
};
const getProperImage = (bonus: allbonusesCombined): StaticImageData => {
  switch (bonus) {
    case "Base Multiplier":
      return BaseMultiplierImg;
    case "Chakra":
      return ChakraImage;
    case "Clicking Talent":
      return ClickingTalentImage;
    case "Clicking With Love":
      return ClickingWithLoveImage;
    case "Crystal Ball":
      return CrystalBallImage;
    case "Equalibrum":
      return EqualibrumImage;
    case "Heart Of The Eternal":
      return HeartOfTheEternalImage;
    case "Holy Cross":
      return HolyCrossImage;
    case "Idle Player":
      return IdlePlayerImage;
    case "Lightning Click":
      return LightningClickImage;
    case "The Collector":
      return CollectorImage;
    case "Time Machine":
      return TimeMachineImage;
    case "Wheel Of Fortune":
      return WheelOfFortuneImage;
  }
  return BaseMultiplierImg;
};
