import { cloneDeep, difference } from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showShopItem } from "../../../redux/gameLogicReducer";
import { RootState } from "../../../redux/store";
import { CookiesShopItem, ShopUpgradesNames } from "../../../utils/interfaces";
import { shouldShopItemBeShown } from "../../../utils/utils";
import { StoreItem } from "./StoreItem";
export const Store = () => {
  const cookieCount = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.cookieCount
  );
  const shopItems = useSelector((state: RootState) =>
    state.gameLogic.skillTreeLogic.isSkillTreeUnlocked
      ? state.gameLogic.shopItems.filter((x) => x.name !== "unlockSkillTree")
      : state.gameLogic.shopItems
  );
  const currentUpgrades = useSelector(
    (state: RootState) => state.gameLogic.upgrades
  );
  const isSkillTreeUnlocked = useSelector(
    (state: RootState) => state.gameLogic.skillTreeLogic.isSkillTreeUnlocked
  );
  const buyStoreItemSound = useRef<null | HTMLAudioElement>(null);
  useEffect(() => {
    isSkillTreeUnlocked && cookieCount < 500 && setShowStore(false);
  }, [isSkillTreeUnlocked]);
  const dispatch = useDispatch();
  const [fadeInStore, setFadeInStore] = useState<boolean>(false);
  const [showStore, setShowStore] = useState<boolean>(false);
  const [numberOfItemsThatAreShown, setNumberOfItemsThatAreShown] = useState<
    CookiesShopItem[] | null
  >(null);
  const showUpgrade = (name: ShopUpgradesNames) => {
    dispatch(showShopItem(name));
  };
  useEffect(() => {
    if (numberOfItemsThatAreShown && cookieCount > 0) {
      const filteredShopItems = shopItems.filter(
        (x) =>
          shouldShopItemBeShown(x.name, cookieCount, currentUpgrades) ||
          x.wasBought ||
          x.wasShown
      );
      if (filteredShopItems.length > numberOfItemsThatAreShown.length) {
        const diff = difference(filteredShopItems, numberOfItemsThatAreShown);
        diff.forEach((item) => showUpgrade(item.name));
        setNumberOfItemsThatAreShown(filteredShopItems);
        setFadeInStore(true);
      }
    } else if (cookieCount > 0) {
      const initalItemsThatCanBeShowed = shopItems.filter(
        (x) =>
          shouldShopItemBeShown(x.name, cookieCount, currentUpgrades) ||
          x.wasBought ||
          x.wasShown
      );
      setNumberOfItemsThatAreShown(initalItemsThatCanBeShowed);
    }
    const wasStoreDiscovered = localStorage.getItem("storeDiscovered");
    if (wasStoreDiscovered === "true") return setShowStore(true);
    if (!wasStoreDiscovered) localStorage.setItem("storeDiscovered", "false");
    if (cookieCount >= 500) {
      setFadeInStore(true);
      localStorage.setItem("storeDiscovered", "true");
      setShowStore(true);
    }
  }, [cookieCount]);
  return (
    <>
      <audio src="buyUpgradeSound.mp3" ref={buyStoreItemSound}></audio>

      <label htmlFor="my-modal">
        <figure
          className={`${
            fadeInStore && "animate-pulse"
          }  cursor-pointer transition-opacity ${
            showStore ? "block" : "hidden"
          } duration-1000`}
          onClick={() => setFadeInStore(false)}
        >
          <Image src={"/store.png"} width={64} height={64} alt="Store" />
        </figure>
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className={`modal cursor-pointer`}>
        <label className="modal-box relative" htmlFor="">
          <h2 className="text-xl text-center">SHOP</h2>

          <div className="divider"></div>
          <div className="flex flex-col gap-2">
            {cloneDeep(shopItems)
              .sort((a, b) => a.price - b.price)
              .map((x) => {
                if (
                  shouldShopItemBeShown(x.name, cookieCount, currentUpgrades) ||
                  x.wasBought ||
                  x.wasShown
                ) {
                  return (
                    <StoreItem
                      {...x}
                      key={x.name}
                      buySound={buyStoreItemSound.current}
                    />
                  );
                }
              })}
            {numberOfItemsThatAreShown?.length !== shopItems.length && (
              <span className="text-xl text-center">
                And{" "}
                {shopItems.length - (numberOfItemsThatAreShown?.length ?? 0)}{" "}
                More undiscovered...
              </span>
            )}
          </div>
        </label>
      </label>
    </>
  );
};
