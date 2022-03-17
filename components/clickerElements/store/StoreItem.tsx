import { abbreviateNumber } from "js-abbreviation-number";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ShopItem, symbolsArray } from "../../../utils/interfaces";
import { FcCheckmark } from "react-icons/fc";
import { useState } from "react";
import {
  addBonusesForUpgrades,
  buyShopItem,
  removeCookies,
} from "../../../redux/gameLogicReducer";
export const StoreItem: React.FC<ShopItem> = ({
  image,
  name,
  nameInShop,
  price,
  upgradeNameInShop,
  wasBought,
  type,
}) => {
  const [shakeImage, setShakeImage] = useState(false);
  const dispatch = useDispatch();
  const buyItem = () => {
    if (!wasBought) {
      if (currentCookies >= price) {
        if (type !== "Other") {
          dispatch(addBonusesForUpgrades(type));
        }
        dispatch(removeCookies(price));
        dispatch(buyShopItem(name));
      } else {
        setShakeImage(true);
      }
    }
  };
  const currentCookies = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.cookieCount
  );
  return (
    <section
      className={`grid place-items-center transition-colors rounded-xl grid-cols-4 gap-2 border-primary cursor-pointer border ${
        wasBought
          ? "bg-blue-300"
          : currentCookies >= price
          ? "bg-green-500"
          : "bg-red-500"
      }`}
      onClick={buyItem}
    >
      <Image
        src={image}
        width={64}
        height={64}
        alt="Upgrade for clicker"
        className={`${shakeImage ? "ShakeAnimation" : ""}`}
        onAnimationEnd={() => {
          setShakeImage(false);
        }}
      />
      <div className="flex-col flex gap-2  col-span-2 justify-center items-center text-center p-2 ">
        <span className="text-2xl">{nameInShop}</span>
        <span>{upgradeNameInShop}</span>
      </div>
      <span>
        {!wasBought ? (
          `Cost: ${abbreviateNumber(Number(price.toFixed(0)), 1, symbolsArray)}`
        ) : (
          <FcCheckmark className="text-3xl" />
        )}
      </span>
    </section>
  );
};
