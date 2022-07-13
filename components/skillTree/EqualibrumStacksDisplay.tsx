import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const EqualibrumStacksDisplay = () => {
  const equalibrum = useSelector((state: RootState) => state.eqalibrum);

  return (
    <div className="w-8 h-8 absolute rounded-full border border-black halveCircleBG text-white text-[0.5rem]">
      <div className="relative left-[4px] top-[1px]">
        {equalibrum.clickStacks}
      </div>
      <div className="relative left-[15px] bottom-[1px] w-[0.5px] bg-black h-8"></div>
      <div className="relative left-[17px] top-[1px]">
        {equalibrum.idleStacks}
      </div>
    </div>
  );
};
