import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  CookiesShopItem,
  singleSkillTreeNode,
} from "../../../utils/interfaces";
import { FcCheckmark } from "react-icons/fc";
import { useEffect, useState } from "react";
import {
  addBonusesForUpgrades,
  buyShopItem,
  lockShopItem,
  removeCookies,
} from "../../../redux/gameLogicReducer";
import { numberFormatter } from "../../../utils/utils";
export const StoreItem: React.FC<CookiesShopItem> = ({
  image,
  name,
  nameInShop,
  price,
  description,
  wasBought,
  type,
  upgradeFor,
  isLocked,
}) => {
  const [shakeImage, setShakeImage] = useState(false);
  const dispatch = useDispatch();
  const buyItem = () => {
    if (isLocked) return;
    if (!wasBought) {
      if (cookieCount >= price) {
        if (type === "double") {
          upgradeFor && dispatch(addBonusesForUpgrades(upgradeFor));
        }
        dispatch(removeCookies(price));
        dispatch(buyShopItem(name));
      } else {
        setShakeImage(true);
      }
    }
  };
  const cookieCount = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.cookieCount
  );
  const isEqualibrumBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "equalibrum"
      ) as singleSkillTreeNode
  ).wasBought;
  useEffect(() => {
    if (isEqualibrumBought && name === "doubleClick") {
      !isLocked && dispatch(lockShopItem("doubleClick"));
    }
  }, [isEqualibrumBought]);
  return (
    <>
      <div className="relative">
        <section
          className={`${
            isLocked && " blur-sm"
          } relative grid place-items-center transition-colors rounded-xl grid-cols-4 gap-2 border-primary cursor-pointer border ${
            wasBought
              ? "bg-blue-300"
              : cookieCount >= price
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
            <span>{description}</span>
          </div>
          <span>
            {!wasBought ? (
              `Cost: ${numberFormatter.format(Number(price.toFixed(0)))}`
            ) : (
              <FcCheckmark className="text-3xl" />
            )}
          </span>
        </section>
        {isLocked && (
          <div className="absolute left-1/2 top-1/3 absoluteCenterTranslate text-xl text-red-600 font-bold">
            LOCKED
          </div>
        )}
      </div>
    </>
  );
};
