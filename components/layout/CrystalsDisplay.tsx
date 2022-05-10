import Image from "next/image";
import CountUp from "react-countup";
import ShardIcon from "../../public/crystal.png";
export interface CrystalDisplayProps {
  crystals: number;
}
export const CrystalsDisplay: React.FC<CrystalDisplayProps> = ({
  crystals,
}) => {
  return (
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
  );
};
