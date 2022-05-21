import { cloneDeep } from "lodash";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { CrystalShopItemComponent } from "./CrystalShopItem";

export const CrystalsModal = () => {
  const crystalShopItems = useSelector(
    (state: RootState) => state.gameLogic.crystalShopItems
  );
  const allStatesWereLoaded = useSelector(
    (state: RootState) => state.gameLogic.areStatesLoaded
  );
  const inputRef = useRef<null | HTMLInputElement>(null);
  return (
    <>
      <input
        type="checkbox"
        id="CrystalsShop"
        className="modal-toggle"
        ref={inputRef}
      />
      <label htmlFor="CrystalsShop" className={`modal cursor-pointer`}>
        <label className="modal-box relative" htmlFor="">
          <h2 className="text-xl text-center">Crystals Shop</h2>
          <div className="grid grid-cols-1 md:grid-cols-3"></div>
          <div className="divider"></div>
          <div className="flex justify-center items-center gap-2 flex-col">
            {allStatesWereLoaded &&
              cloneDeep(crystalShopItems)
                .sort((a, b) => (a === b ? 0 : a.wasBought ? -1 : 1))
                .map((x) => (
                  <CrystalShopItemComponent {...x} key={x.nameInShop} />
                ))}
          </div>
        </label>
      </label>
    </>
  );
};
