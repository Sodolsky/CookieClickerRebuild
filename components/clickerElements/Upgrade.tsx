import { fill } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseCPS, removeCookies } from "../../redux/cookieReducer";
import { RootState } from "../../redux/store";
import { buyUpgrade } from "../../redux/upgradeReducer";
import { UpgradeInterface } from "../../utils/interfaces";
export const Upgrade: React.FC<UpgradeInterface> = ({
  CookiesPerClickBonus,
  CookiesPerSecondBonus,
  upgradeName,
  cost,
  feeIndex,
  numberOfUpgrades,
  image,
}) => {
  const [price, setPrice] = useState<number>(cost);
  useEffect(() => {
    if (numberOfUpgrades > 0) {
      setPrice((cost *= feeIndex * numberOfUpgrades));
    }
  }, [numberOfUpgrades]);
  const dispatch = useDispatch();
  const currentCookies = useSelector(
    (state: RootState) => state.cookie.cookieCount
  );
  const upgradeCPS = () => {
    if (currentCookies >= price) {
      dispatch(removeCookies(price));
      dispatch(increaseCPS(CookiesPerClickBonus));
      dispatch(buyUpgrade({ name: upgradeName, number: 1 }));
    } else {
      alert("Nie stac cie!");
    }
  };
  return (
    <section className="flex flex-col gap-2 justify-center items-center p-4 border border-primary rounded-xl">
      <Image
        onClick={upgradeCPS}
        src={image}
        width={"64px"}
        height={"64px"}
        alt="Upgrade for clicker"
        className="cursor-pointer"
      />
      <span>Number of upgrades: {numberOfUpgrades}</span>
      <div className="flex gap-2 items-center">
        <span>CPS: {CookiesPerSecondBonus * numberOfUpgrades}</span>
        <span>CPC: {CookiesPerClickBonus * numberOfUpgrades}</span>
      </div>
      <span>Cost: {price.toFixed(0)}</span>
    </section>
  );
};
