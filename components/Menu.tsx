import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UpgradeInterface, UpgradesInterface } from "../utils/interfaces";
import { upgradesFilterFunction } from "../utils/utils";
import { BackendSynchronizationModal } from "./backendSynchronization/BackendSynchronizationModal";
import { CrystalsDisplay } from "./clickerElements/crystals/CrystalsDisplay";
import { Store } from "./clickerElements/store/Store";
import { PerformanceModal } from "./performance/PerformanceModal";
import { Chakra } from "./skillTree/Chakra";
import { EndgameModal } from "./skillTree/EndgameModal";
import { EqualibrumStacksDisplay } from "./skillTree/EqualibrumStacksDisplay";
import { EternalTalk } from "./skillTree/EternalTalk";
import { ResetModal } from "./skillTree/ResetModal";
import { SkillTreeModal } from "./skillTree/SkillTreeModal";
import { StatsModal } from "./stats/StatsModal";
interface MenuProps {
  isEqualibrumBought: boolean;
  isSkillTreeUnlocked: boolean;
  upgrades: UpgradesInterface;
  resetGameLogic: (skillPoints: number) => void;
  isMobile: boolean | null;
  isUserOnLaptop: boolean | null;
  isChakraBought: boolean;
  isEternityBought: boolean;
  numberOfResets: number;
}
export const Menu: React.FC<MenuProps> = ({
  isEqualibrumBought,
  isSkillTreeUnlocked,
  resetGameLogic,
  upgrades,
  isMobile,
  isUserOnLaptop,
  isChakraBought,
  isEternityBought,
  numberOfResets,
}) => {
  const shopItems = useSelector(
    (state: RootState) => state.gameLogic.shopItems
  );

  /* To avoid Menu overflowing certain upgrades view on devices with screen size between 768px-1280px we render
  bigger menu elements such as Chakra and CrystalCount in top left screen in MainMenu component otherwise
  we render them here in menu.
  */
  const renderBiggerElements = isMobile || (!isMobile && !isUserOnLaptop);
  return (
    <footer
      className={`absolute ${
        isMobile
          ? "bottom-0 h-auto border-t-2 pt-2 overflow-x-auto"
          : "flex-col w-auto right-0 top-0 border-l-2 border-b-2 p-2 "
      } flex items-center justify-center gap-8 flex-wrap border-black `}
    >
      <PerformanceModal />
      <StatsModal />
      <BackendSynchronizationModal />
      <Store />
      {isEternityBought && <EndgameModal />}
      {isEqualibrumBought && <EqualibrumStacksDisplay />}
      {isSkillTreeUnlocked &&
        Object.values(upgrades)
          .filter((x) => {
            const upgrade = x as UpgradeInterface;
            return upgradesFilterFunction(upgrade, numberOfResets);
          })
          .reduce((acc, a) => {
            if (acc && a.numberOfUpgrades >= 10) return acc;
            return (acc = false);
          }, true) &&
        !isEternityBought && <ResetModal resetGameLogic={resetGameLogic} />}
      {shopItems.find((x) => x.name === "unlockSkillTree")?.wasBought &&
      !isSkillTreeUnlocked ? (
        <EternalTalk resetGameLogic={resetGameLogic} />
      ) : (
        isSkillTreeUnlocked && <SkillTreeModal />
      )}
      {isChakraBought && renderBiggerElements && <Chakra />}
      {renderBiggerElements && <CrystalsDisplay />}
    </footer>
  );
};
