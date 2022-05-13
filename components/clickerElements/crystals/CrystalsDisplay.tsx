import Image from "next/image";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import ShardIcon from "../../../public/crystal.png";
import { RootState } from "../../../redux/store";

export const CrystalsDisplay: React.FC = () => {
  const crystals = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.crystals
  );
  return (
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
  );
};
