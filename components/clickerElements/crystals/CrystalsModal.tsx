import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { CrystalShopItemComponent } from "./CrystalShopItem";

export const CrystalsModal = () => {
  const crystalShopItems = useSelector(
    (state: RootState) => state.gameLogic.crystalShopItems
  );
  return (
    <>
      <input type="checkbox" id="CrystalsShop" className="modal-toggle" />
      <label htmlFor="CrystalsShop" className={`modal cursor-pointer`}>
        <label className="modal-box relative" htmlFor="CrystalsShop">
          <h2 className="text-xl text-center">Crystals Shop</h2>
          <div className="grid grid-cols-1 md:grid-cols-3"></div>
          <div className="divider"></div>
          <div className="flex justify-center items-center gap-2 flex-col">
            {crystalShopItems.map((x) => (
              <CrystalShopItemComponent {...x} key={x.nameInShop} />
            ))}
          </div>
        </label>
      </label>
    </>
  );
};
