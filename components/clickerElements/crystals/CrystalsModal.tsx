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
        <label className="modal-box relative" htmlFor="">
          <h2 className="text-xl text-center">Crystals Shop</h2>
          <div className="grid grid-cols-1 md:grid-cols-3"></div>
          <div className="divider"></div>
          <div className="flex flex-col gap-2 w-full items-center">
            {crystalShopItems.map((x) => (
              <CrystalShopItemComponent {...x} key={x.nameInShop} />
            ))}
          </div>
        </label>
      </label>
    </>
  );
};
