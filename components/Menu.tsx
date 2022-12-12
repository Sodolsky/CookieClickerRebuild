import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  singleSkillTreeNode,
  UpgradeInterface,
  UpgradesInterface,
} from "../utils/interfaces";
import { BackendSynchronizationModal } from "./backendSynchronization/BackendSynchronizationModal";
import { CrystalsDisplay } from "./clickerElements/crystals/CrystalsDisplay";
import { Store } from "./clickerElements/store/Store";
import { PerformanceModal } from "./performance/PerformanceModal";
import { Chakra } from "./skillTree/Chakra";
import { EqualibrumStacksDisplay } from "./skillTree/EqualibrumStacksDisplay";
import { EternalTalk } from "./skillTree/EternalTalk";
import { ResetModal } from "./skillTree/ResetModal";
import { SkillTreeModal } from "./skillTree/SkillTreeModal";
interface MenuProps {
  isEqualibrumBought: boolean;
  isSkillTreeUnlocked: boolean;
  isQPBought: boolean;
  upgrades: UpgradesInterface;
  resetGameLogic: (skillPoints: number) => void;
  isMobile: boolean | null;
}
export const Menu: React.FC<MenuProps> = ({
  isEqualibrumBought,
  isSkillTreeUnlocked,
  resetGameLogic,
  isQPBought,
  upgrades,
  isMobile,
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
  console.error(
    "FIX MENU ON MEDIUM SCREEN SIZE DEVICES AND OVERFLOWING IN SKILL TREE"
  );
  return (
    <footer
      className={`absolute ${
        isMobile
          ? "bottom-0 h-auto border-t-2 pt-2 overflow-x-auto"
          : "flex-col w-auto right-0 top-0 border-l-2 border-b-2 p-2 overflow-y-auto"
      } flex items-center justify-center gap-8 flex-wrap border-black `}
    >
      <PerformanceModal />
      <BackendSynchronizationModal />
      <Store />
      {isChakraBought && <Chakra />}
      {isEqualibrumBought && <EqualibrumStacksDisplay />}
      {Object.values(upgrades)
        .filter((x) => {
          const upgrade = x as UpgradeInterface;
          if (
            upgrade.upgradeName === "upgrade11" ||
            upgrade.upgradeName === "upgrade12"
          ) {
            if (isQPBought) {
              return x;
            }
          } else {
            return x;
          }
        })
        .reduce((acc, a) => {
          if (acc && a.numberOfUpgrades >= 0) return acc;
          return (acc = false);
        }, true) && <ResetModal resetGameLogic={resetGameLogic} />}
      {shopItems.find((x) => x.name === "unlockSkillTree")?.wasBought &&
      !isSkillTreeUnlocked ? (
        <EternalTalk resetGameLogic={() => resetGameLogic(10)} />
      ) : (
        isSkillTreeUnlocked && <SkillTreeModal />
      )}
      <CrystalsDisplay />
    </footer>
  );
};
