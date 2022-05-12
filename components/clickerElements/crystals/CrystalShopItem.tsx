import Image from "next/image";
import { CrystalShopItem } from "../../../utils/interfaces";
import CrystalIcon from "../../../public/crystal.png";
export const CrystalShopItemComponent: React.FC<CrystalShopItem> = ({
  description,
  image,
  nameInShop,
  price,
  wasBought,
}) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-1 px-2 bg-gray-200 rounded-xl w-fit cursor-pointer border-primary border-2 hover:bg-">
      <Image src={image} alt={nameInShop} width={64} height={64} />
      <span>{nameInShop}</span>
      <div className="flex items-center justify-center gap-1">
        <span className="flex items-center">
          <Image src={CrystalIcon} alt={"Crystal"} width={16} height={16} />
        </span>
        <span>{price}</span>
      </div>
      <span>{description}</span>
    </div>
  );
};
