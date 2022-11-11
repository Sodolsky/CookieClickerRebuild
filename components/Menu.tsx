import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { singleSkillTreeNode } from "../utils/interfaces";
import { BackendSynchronizationModal } from "./backendSynchronization/BackendSynchronizationModal";
import { Store } from "./clickerElements/store/Store";
import { PerformanceModal } from "./performance/PerformanceModal";
import { Chakra } from "./skillTree/Chakra";
import { EqualibrumStacksDisplay } from "./skillTree/EqualibrumStacksDisplay";
import { EternalTalk } from "./skillTree/EternalTalk";
import { SkillTreeModal } from "./skillTree/SkillTreeModal";
interface MenuProps {
  isEqualibrumBought: boolean;
  isSkillTreeUnlocked: boolean;
  resetGameLogic: (skillPoints: number) => void;
}
export const Menu: React.FC<MenuProps> = ({
  isEqualibrumBought,
  isSkillTreeUnlocked,
  resetGameLogic,
}) => {
  const isChakraBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "chakra"
      ) as singleSkillTreeNode
  ).wasBought;
  const shopItems = useSelector(
    (state: RootState) => state.gameLogic.shopItems
  );
  return (
    <footer className="abosule bottom-0  h-auto flex items-center justify-center gap-8 overflow-x-auto border-t-2 pt-2 border-black">
      <PerformanceModal />
      <BackendSynchronizationModal />
      <Store />
      {isChakraBought && <Chakra />}
      {isEqualibrumBought && <EqualibrumStacksDisplay />}
      {shopItems.find((x) => x.name === "unlockSkillTree")?.wasBought &&
      !isSkillTreeUnlocked ? (
        <EternalTalk resetGameLogic={() => resetGameLogic(10)} />
      ) : (
        isSkillTreeUnlocked && <SkillTreeModal />
      )}
    </footer>
  );
};
