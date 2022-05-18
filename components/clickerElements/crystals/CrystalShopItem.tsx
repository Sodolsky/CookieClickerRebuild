import Image from "next/image";
import { CrystalShopItem } from "../../../utils/interfaces";
import CrystalIcon from "../../../public/crystal.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  buyCrystalShopItem,
  changeUsageOfCrystalShopitem,
  removeCrystals,
} from "../../../redux/gameLogicReducer";
import { useEffect, useState } from "react";
export const CrystalShopItemComponent: React.FC<CrystalShopItem> = ({
  name,
  description,
  image,
  nameInShop,
  price,
  wasBought,
  inUse,
}) => {
  const [isBeingUsed, setIsBeingUsed] = useState<boolean>(inUse);
  const [shakeImage, setShakeImage] = useState<boolean>(false);
  const dispatch = useDispatch();
  const crystalCount = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.crystals
  );
  const buyItem = () => {
    if (!wasBought) {
      if (crystalCount >= price) {
        dispatch(removeCrystals(price));
        dispatch(buyCrystalShopItem(name));
      } else {
        setShakeImage(true);
      }
    }
  };
  useEffect(() => {
    setIsBeingUsed(inUse);
  }, [inUse]);
  return (
    <div
      className={` transition-colors w-3/4 md:w-2/4 text-center  flex flex-col gap-2 items-center justify-center py-1 px-2 rounded-xl  border-primary border ${
        wasBought
          ? "bg-blue-300"
          : crystalCount >= price
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      <Image
        src={image}
        alt={nameInShop}
        width={64}
        height={64}
        className={`${shakeImage ? "ShakeAnimation" : ""} rounded-lg`}
        onAnimationEnd={() => setShakeImage(false)}
      />
      <span className="text-xl font-bold">{nameInShop}</span>
      {!wasBought ? (
        <button
          onClick={buyItem}
          className="flex items-center justify-center gap-1 p-1 border-secondary  border border-b-4 hover:translate-y-2 hover:border-b transition-transform rounded-lg shadow-lg"
        >
          <span className="flex items-center ">
            <Image src={CrystalIcon} alt={"Crystal"} width={16} height={16} />
          </span>
          <span>{price}</span>
        </button>
      ) : (
        <div className="flex flex-col justify-center items-center border border-secondary p-1 rounded-xl">
          <div className="cursor-pointer">
            <span className="label-text text-lg">Use Skin</span>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-md toggle-secondary"
            checked={isBeingUsed}
            onChange={() => {
              dispatch(
                changeUsageOfCrystalShopitem({
                  name: name,
                  prevState: isBeingUsed,
                })
              );
            }}
            onClick={() => setIsBeingUsed(!isBeingUsed)}
          />
        </div>
      )}
      <span className="text-sm ">{description}</span>
    </div>
  );
};
