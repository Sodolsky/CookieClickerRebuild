import Image from "next/image";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import ShardIcon from "../../../public/crystal.png";
import { RootState } from "../../../redux/store";
import { CrystalShopItemComponent } from "./CrystalShopItem";
export interface CrystalDisplayProps {
  crystals: number;
}
export const CrystalsDisplay: React.FC<CrystalDisplayProps> = ({
  crystals,
}) => {
  const crystalShopItems = useSelector(
    (state: RootState) => state.gameLogic.crystalShopItems
  );
  return (
    <>
      <label htmlFor="CrystalsShop">
        <div className="border-2 border-black p-1  bg-white flex gap-2 items-center justify-center cursor-pointer ">
          {<Image src={ShardIcon} width={32} height={32} alt="Shards" />}

          <span className="ml-4 mr-1 pointer-events-none">
            <CountUp
              end={crystals}
              preserveValue={true}
              duration={0.35}
              separator={" "}
            />
          </span>
        </div>
      </label>

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
