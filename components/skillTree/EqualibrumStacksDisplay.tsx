import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../../utils/interfaces";

export const EqualibrumStacksDisplay = () => {
  const equalibrum = useSelector((state: RootState) => state.eqalibrum);

  return (
    <div className="w-8 h-8 relative rounded-full border border-black halveCircleBG text-white text-[0.5rem]">
      <div className="absolute left-[4px] top-[1px] items-center">
        {equalibrum.clickStacks}
      </div>
      <div className="absolute left-[15px] w-[0.5px] bg-black h-full"></div>
      <div className="absolute left-[17px] top-[1px] flex justify-center items-center">
        {equalibrum.idleStacks}
      </div>
    </div>
  );
};
