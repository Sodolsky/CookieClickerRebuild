import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../../utils/interfaces";
import { EqualibrumStacksDisplay } from "../skillTree/EqualibrumStacksDisplay";

export const Header = () => {
  const isEqualibrumBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "equalibrum"
      ) as singleSkillTreeNode
  ).wasBought;
  return (
    <>
      <header className="text-xl lg:text-3xl mt-4 flex gap-2 justify-center">
        <h1>Cookie Clicker Rebuild</h1>
        <section>{isEqualibrumBought && <EqualibrumStacksDisplay />}</section>
      </header>
    </>
  );
};
