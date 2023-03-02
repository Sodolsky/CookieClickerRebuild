import Image from "next/image";
import React from "react";
import BaseMultiplierImg from "../../public/base.png";
import { allCPCBonuses, allCPSBonuses } from "./StatsModal";
interface tableStatInterface {
  bonus: allCPCBonuses | allCPSBonuses;
  number: number;
  operator: "+" | "*";
}
type allbonusesCombined = allCPCBonuses | allCPSBonuses;
export const TableStat: React.FC<tableStatInterface> = ({
  bonus,
  number,
  operator,
}) => {
  return (
    <tr>
      <td>
        <Image src={getProperImage(bonus)} alt={bonus} width={32} height={32} />
      </td>
      <td>{bonus}</td>
      <td>
        {operator} {number}
      </td>
    </tr>
  );
};
const getProperImage = (bonus: allbonusesCombined): StaticImageData => {
  switch (bonus) {
    case "Base Multiplier":
      return BaseMultiplierImg;
  }
  return BaseMultiplierImg;
};
