import { fill } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseCPC,
  increaseCPS,
  removeCookies,
} from "../../redux/cookieReducer";
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
  upgradeNameForPlayer,
}) => {
  const [price, setPrice] = useState<number>(cost);
  useEffect(() => {
    if (numberOfUpgrades > 0) {
      //When we first load the component we need to calculate current price
      if (price === cost) {
        let price = cost;
        for (let i = numberOfUpgrades; i > 0; i--) {
          price = price * feeIndex;
        }
        setPrice(price);
      } else {
        //If we buy an upgrade we don't need to do the loop we just multiply previous price by feeIndex
        setPrice((prevPrice) => prevPrice * feeIndex);
      }
    }
  }, [numberOfUpgrades]);
  const dispatch = useDispatch();
  const currentCookies = useSelector(
    (state: RootState) => state.cookie.cookieCount
  );
  const upgradeCPS = () => {
    if (currentCookies >= price) {
      dispatch(removeCookies(price));
      dispatch(increaseCPS(CookiesPerSecondBonus));
      dispatch(increaseCPC(CookiesPerClickBonus));
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
      <span className="text-2xl font-bold">{upgradeNameForPlayer}</span>
      <span>Number of upgrades: {numberOfUpgrades}</span>
      <div className="flex gap-2 items-center">
        <span>
          CPS: {(CookiesPerSecondBonus * numberOfUpgrades).toFixed(2)}
        </span>
        <span>CPC: {(CookiesPerClickBonus * numberOfUpgrades).toFixed(0)}</span>
      </div>
      <span>Cost: {price.toFixed(0)}</span>
    </section>
  );
};
