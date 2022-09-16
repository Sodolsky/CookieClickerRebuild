import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyUpgrade,
  changeCPC,
  changeCPS,
  removeCookies,
} from "../../redux/gameLogicReducer";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode, UpgradeInterface } from "../../utils/interfaces";
import { GrCircleInformation } from "react-icons/gr";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { addNewUpgrade } from "../../redux/crystalBallReducer";
import { BsCash } from "react-icons/bs";
import CountUp from "react-countup";
import { numberFormatter } from "../../utils/utils";

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
  const currentBestUpgradeBonus = useSelector(
    (state: RootState) => state.trashToTreasure.bonus
  );
  const isThisUpgradeTheBest =
    useSelector((state: RootState) => state.trashToTreasure.bestUpgrade) ===
    upgradeName;
  const shopItems = useSelector(
    (state: RootState) => state.gameLogic.shopItems
  );
  const contributions = {
    CPSContribution: CookiesPerSecondBonus * numberOfUpgrades,
    CPCContribution: CookiesPerClickBonus * numberOfUpgrades,
    CPCContributionWithTTT:
      CookiesPerClickBonus * numberOfUpgrades * currentBestUpgradeBonus,
    CPSContributionWithTTT:
      CookiesPerSecondBonus * numberOfUpgrades * currentBestUpgradeBonus,
  };
  const isTheoryOfEverythingBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "theoryOfEverything"
      ) as singleSkillTreeNode
  ).wasBought;
  const isEvenMoreQuestionsBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "evenMoreQuestions"
      ) as singleSkillTreeNode
  ).wasBought;
  const isCrystalBallBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "crystalBall"
      ) as singleSkillTreeNode
  ).wasBought;
  const isDebtBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "debt"
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
  }, [isTheoryOfEverythingBought, isEvenMoreQuestionsBought]);
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
  const realPrice = isDebtBought ? Math.floor((price * 3) / 4) : price;
  const upgradeCPS = () => {
    if (currentCookies >= realPrice) {
      dispatch(removeCookies(price));
      dispatch(changeCPS({ type: "increase", amount: CookiesPerSecondBonus }));
      dispatch(changeCPC({ type: "increase", amount: CookiesPerClickBonus }));
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
          className="tooltip absolute -right-6 -top-2 tooltip-left z-[10]"
          data-tip={`Gives: ${numberFormatter.format(
            CookiesPerSecondBonus
          )} CPS && ${numberFormatter.format(CookiesPerClickBonus)} CPC`}
        >
          <GrCircleInformation />
        </div>
        {isDebtBought && currentCookies >= realPrice && currentCookies < price && (
          <figure className="absolute -left-6 -top-2 ">
            <BsCash />
          </figure>
        )}
      </div>

      <span className="text-2xl font-bold">
        {crystalShopUpgradeObject?.wasBought && crystalShopUpgradeObject.inUse
          ? crystalShopUpgradeObject.nameInShop
          : upgradeNameForPlayer}
      </span>
      <span>
        Number of upgrades:{" "}
        <CountUp
          end={numberOfUpgrades}
          preserveValue={true}
          duration={0.35}
          separator={" "}
        />
      </span>
      <div className="grid grid-cols-2 place-items-center gap-2 text-green-600">
        <div className="text-xl col-span-2">Current Bonus </div>
        <span>
          CPS:{" "}
          {numberFormatter.format(
            CookiesPerSecondBonus *
              numberOfUpgrades *
              multiplier *
              (isThisUpgradeTheBest ? currentBestUpgradeBonus : 1)
          )}
        </span>
        <span>
          CPC:{" "}
          {numberFormatter.format(
            CookiesPerClickBonus *
              numberOfUpgrades *
              multiplier *
              (isThisUpgradeTheBest ? currentBestUpgradeBonus : 1)
          )}
        </span>
      </div>
      <span className="text-xl text-red-600">
        Cost: {numberFormatter.format(realPrice)}
      </span>
    </section>
  ) : (
    <fieldset
      className={`grid place-items-center grid-cols-4 gap-2 border-primary border relative ${
        currentCookies >= realPrice ? "bg-green-500" : "bg-red-500"
      }`}
      onClick={upgradeCPS}
    >
      <legend className="text-center border p-1 border-primary bg-blue-500 -skew-x-12">
        Upgrades: {numberOfUpgrades}
      </legend>
      {isDebtBought && currentCookies >= realPrice && currentCookies < price && (
        <figure className="absolute right-4 top-0 ">
          <BsCash />
        </figure>
      )}
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
          {numberFormatter.format(
            numberOfUpgrades > 0
              ? CookiesPerSecondBonus * numberOfUpgrades * multiplier
              : CookiesPerSecondBonus *
                  (isThisUpgradeTheBest ? currentBestUpgradeBonus : 1)
          )}
        </span>
        <span>
          {numberOfUpgrades > 0 ? "CPC: " : "Gives: "}
          {numberFormatter.format(
            numberOfUpgrades > 0
              ? CookiesPerClickBonus * numberOfUpgrades * multiplier
              : CookiesPerClickBonus *
                  (isThisUpgradeTheBest ? currentBestUpgradeBonus : 1)
          )}
        </span>
      </div>
      <span>Cost: {numberFormatter.format(realPrice)}</span>
    </fieldset>
  );
};
