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
  //?We shake the image when user doesn't have enought cookie to buy an upgrade
  const [shakeImage, setShakeImage] = useState<boolean>(false);
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
      setShakeImage(true);
    }
  };
  return (
    <section className="flex flex-col gap-2 justify-center items-center p-4 border-black  rounded-xl relative overflow-hidden">
      <Image
        onClick={upgradeCPS}
        src={image}
        width={64}
        height={64}
        alt="Upgrade for clicker"
        className={`cursor-pointer ${shakeImage ? "ShakeAnimation" : ""}`}
        onAnimationEnd={() => setShakeImage(false)}
      />
      <span className="text-2xl font-bold">{upgradeNameForPlayer}</span>
      <span>Number of upgrades: {numberOfUpgrades}</span>
      <div className="grid grid-cols-2 place-items-center gap-2 text-green-600">
        <div className="text-xl col-span-2">Current Bonus </div>
        <span>
          CPS: {(CookiesPerSecondBonus * numberOfUpgrades).toFixed(2)}
        </span>
        <span>CPC: {(CookiesPerClickBonus * numberOfUpgrades).toFixed(2)}</span>
      </div>
      <span className="text-xl text-red-600">Cost: {price.toFixed(0)}</span>
    </section>
  );
};
