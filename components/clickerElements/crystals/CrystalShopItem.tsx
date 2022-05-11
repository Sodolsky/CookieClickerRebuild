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
    <div className="flex flex-col gap-2 items-center justify-center py-1 px-2">
      <Image src={image} alt={nameInShop} width={64} height={64} />
      <span>{nameInShop}</span>
      <div className="flex items-center justify-center gap-2">
        <span className="self-baseline">
          {<Image src={CrystalIcon} alt={"Crystal"} width={16} height={16} />}
        </span>
        <span>{price}</span>
      </div>
      <span>{description}</span>
    </div>
  );
};
