import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyUpgrade,
  increaseCPC,
  increaseCPS,
  removeCookies,
} from "../../redux/gameLogicReducer";
import { RootState } from "../../redux/store";
import {
  singleSkillTreeNode,
  symbolsArray,
  UpgradeInterface,
} from "../../utils/interfaces";
import { GrCircleInformation } from "react-icons/gr";
import { abbreviateNumber } from "js-abbreviation-number";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { addNewUpgrade } from "../../redux/crystalBallReducer";
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
  //Here we get coresponding skin object to upgrade
  const crystalShopUpgradeObject = useSelector(
    (state: RootState) => state.gameLogic.crystalShopItems
  ).find((x) => x.name.split("Skin")[0] === upgradeName);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [price, setPrice] = useState<number>(cost);
  const [multiplier, setMultiplier] = useState<number>(1);
  //?We shake the image when user doesn't have enought cookie to buy an upgrade
  const [shakeImage, setShakeImage] = useState<boolean>(false);
  const shopItems = useSelector(
    (state: RootState) => state.gameLogic.shopItems
  );
  const isTheoryOfEverythingBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "theoryOfEverything"
      ) as singleSkillTreeNode
  ).wasBought;
  const isCrystalBallBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "crystalBall"
      ) as singleSkillTreeNode
  ).wasBought;
  useEffect(() => {
    //?Here is the Shop item that doubles the bonuses from single upgrade we handle multiplier logic here
    const doubleUpgrade = shopItems.find((x) => x.upgradeFor === upgradeName);
    if (doubleUpgrade) {
      doubleUpgrade.wasBought && setMultiplier(2);
    }
  }, [shopItems]);
  useEffect(() => {
    let price = cost;
    for (let i = numberOfUpgrades; i > 0; i--) {
      price = price * feeIndex;
    }
    setPrice(price);
  }, [isTheoryOfEverythingBought]);
  useEffect(() => {
    if (numberOfUpgrades > 0) {
      //When we first load the component we need to calculate current price
      if (price === cost) {
        let price = cost;
        for (let i = numberOfUpgrades; i > 0; i--) {
          dispatch(addNewUpgrade());
          price = price * feeIndex;
        }
        setPrice(price);
      } else {
        //If we buy an upgrade we don't need to do the loop we just multiply previous price by feeIndex
        setPrice((prevPrice) => prevPrice * feeIndex);
      }
      //Here we reset the price after game reset
    } else if (numberOfUpgrades === 0 && cost !== price) {
      setPrice(cost);
    }
  }, [numberOfUpgrades]);
  const dispatch = useDispatch();
  const currentCookies = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.cookieCount
  );
  const upgradeCPS = () => {
    if (currentCookies >= price) {
      dispatch(removeCookies(price));
      dispatch(increaseCPS(CookiesPerSecondBonus));
      dispatch(increaseCPC(CookiesPerClickBonus));
      dispatch(buyUpgrade({ name: upgradeName, number: 1 }));
      isCrystalBallBought && dispatch(addNewUpgrade());
    } else {
      setShakeImage(true);
    }
  };
  return !isMobile ? (
    <section className="flex  text-center flex-col gap-2 justify-center items-center p-4 border-black  rounded-xl relative">
      <div className="relative">
        <Image
          onClick={upgradeCPS}
          src={
            crystalShopUpgradeObject?.wasBought &&
            crystalShopUpgradeObject.inUse
              ? crystalShopUpgradeObject.image
              : image
          }
          width={64}
          height={64}
          alt="Upgrade for clicker"
          className={`cursor-pointer rounded-lg ${
            shakeImage ? "ShakeAnimation" : ""
          }`}
          onAnimationEnd={() => {
            setShakeImage(false);
          }}
        />
        <div
          className="tooltip absolute -right-6 -top-2 tooltip-left z-10"
          data-tip={`Gives: ${abbreviateNumber(
            CookiesPerSecondBonus,
            1,
            symbolsArray
          )} CPS && ${abbreviateNumber(
            CookiesPerClickBonus,
            1,
            symbolsArray
          )} CPC`}
        >
          <GrCircleInformation />
        </div>
      </div>
      <span className="text-2xl font-bold">
        {crystalShopUpgradeObject?.wasBought && crystalShopUpgradeObject.inUse
          ? crystalShopUpgradeObject.nameInShop
          : upgradeNameForPlayer}
      </span>
      <span>Number of upgrades: {numberOfUpgrades}</span>
      <div className="grid grid-cols-2 place-items-center gap-2 text-green-600">
        <div className="text-xl col-span-2">Current Bonus </div>
        <span>
          CPS:{" "}
          {abbreviateNumber(
            CookiesPerSecondBonus * numberOfUpgrades * multiplier,
            1,
            symbolsArray
          )}
        </span>
        <span>
          CPC:{" "}
          {abbreviateNumber(
            CookiesPerClickBonus * numberOfUpgrades * multiplier,
            1,
            symbolsArray
          )}
        </span>
      </div>
      <span className="text-xl text-red-600">
        Cost: {abbreviateNumber(Number(price.toFixed(0)), 1, symbolsArray)}
      </span>
    </section>
  ) : (
    <fieldset
      className={`grid place-items-center grid-cols-4 gap-2 border-primary border ${
        currentCookies >= price ? "bg-green-500" : "bg-red-500"
      }`}
      onClick={upgradeCPS}
    >
      <legend className="text-center border p-1 border-primary bg-blue-500 -skew-x-12">
        Upgrades: {numberOfUpgrades}
      </legend>
      <Image
        src={
          crystalShopUpgradeObject?.wasBought && crystalShopUpgradeObject.inUse
            ? crystalShopUpgradeObject.image
            : image
        }
        width={64}
        height={64}
        alt="Upgrade for clicker"
        className={`cursor-pointer ${shakeImage ? "ShakeAnimation" : ""}`}
        onAnimationEnd={() => setShakeImage(false)}
      />
      <div className="flex-col flex gap-2 items-end col-span-2">
        <span>
          {numberOfUpgrades > 0 ? "CPS: " : "Gives: "}
          {abbreviateNumber(
            numberOfUpgrades > 0
              ? CookiesPerSecondBonus * numberOfUpgrades * multiplier
              : CookiesPerSecondBonus,
            1,
            symbolsArray
          )}
        </span>
        <span>
          {numberOfUpgrades > 0 ? "CPC: " : "Gives: "}
          {abbreviateNumber(
            numberOfUpgrades > 0
              ? CookiesPerClickBonus * numberOfUpgrades * multiplier
              : CookiesPerClickBonus,
            1,
            symbolsArray
          )}
        </span>
      </div>
      <span>
        Cost: {abbreviateNumber(Number(price.toFixed(0)), 1, symbolsArray)}
      </span>
    </fieldset>
  );
};
