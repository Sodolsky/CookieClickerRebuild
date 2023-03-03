import Image from "next/image";
import StatsIcon from "../../public/stats.png";
import { useCPCMultiplier } from "../../utils/hooks/useCPCMultiplier";
import { useCPSMultiplier } from "../../utils/hooks/useCPSMultiplier";
import ClickIcon from "../../public/click32x32.png";
import IdleIcon from "../../public/idle32x32.png";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CookiesShopItem, singleSkillTreeNode } from "../../utils/interfaces";
import TimeIcon from "../../public/time.png";
import CookieIcon from "../../public/cookie.png";
import ExplosionIcon from "../../public/explosion.png";
import CrystalsIcon from "../../public/crystal.png";
import ResetGameIcon from "../../public/reset.png";
import SkillPointIcon from "../../public/skillPoint16x16.png";
import { InlineStat, inlineStatInterface } from "./InlineStat";
import { numberFormatter, secondsToHms } from "../../utils/utils";
import { TableStat } from "./TableStat";
type commonBaseRateTypes =
  | "The Collector"
  | "Chakra"
  | "Heart Of The Eternal"
  | "Starting Rate";
type commonMultiplierTypes =
  | "Crystal Ball"
  | "Wheel Of Fortune"
  | "Equalibrum"
  | "Holy Cross"
  | "Base Multiplier";
type CPCMultiplierTypes = "Clicking With Love" | commonMultiplierTypes;
type CPSMultiplierTypes = "Time Machine" | commonMultiplierTypes;
type CPCBaseRateTypes =
  | commonBaseRateTypes
  | "Clicking Talent"
  | "Lightning Click";
type CPSBaseRateTypes = commonBaseRateTypes | "Idle Player";
export type allCPCBonuses = CPCBaseRateTypes | CPCMultiplierTypes;
export type allCPSBonuses = CPSBaseRateTypes | CPSMultiplierTypes;
interface multiplierTableCPC {
  multiplierUpgrade: CPCMultiplierTypes;
  number: number;
}
interface multiplierTableCPS {
  multiplierUpgrade: CPSMultiplierTypes;
  number: number;
}
interface baseRateTableCPC {
  baseRate: CPCBaseRateTypes;
  number: number;
}
interface baseRateTableCPS {
  baseRate: CPSBaseRateTypes;
  number: number;
}
interface multiplierBreakDownInterface {
  CPCBaseRate: number;
  CPCMultiplier: number;
  CPSBaseRate: number;
  CPSMultiplier: number;
}
const baseMultipliersBreakdownObject: multiplierBreakDownInterface = {
  CPCBaseRate: 1,
  CPCMultiplier: 1,
  CPSBaseRate: 1,
  CPSMultiplier: 1,
};
interface CPCBonusesBreakdownInterface {
  CPCBaseRate: baseRateTableCPC[];
  CPCMultipliers: multiplierTableCPC[];
}
interface CPSBonusesBreakdownInterface {
  CPSBaseRate: baseRateTableCPS[];
  CPSMultipliers: multiplierTableCPS[];
}
export const StatsModal = () => {
  const { multiplierCPS } = useCPSMultiplier();
  const { isClickDoubled, multiplier } = useCPCMultiplier();
  const [multipliersBreakdown, setMultipliersBreakdown] =
    useState<multiplierBreakDownInterface>(baseMultipliersBreakdownObject);
  const [CPCBonusesBreakdown, setCPCBonusesBreakdown] =
    useState<CPCBonusesBreakdownInterface>({
      CPCBaseRate: [],
      CPCMultipliers: [],
    });
  const [CPSBonusesBreakdown, setCPSBonusesBreakdown] =
    useState<CPSBonusesBreakdownInterface>({
      CPSBaseRate: [],
      CPSMultipliers: [],
    });
  const userStats = useSelector((state: RootState) => state.userStats);

  const numberOfGameResets = useSelector(
    (state: RootState) => state.gameLogic.numberOfResets
  );
  const holyCrossSkillPoints = useSelector(
    (state: RootState) => state.holyCross.currentBonuses.skillPoints
  );
  const crystalsGainedFromHolyCross = useSelector(
    (state: RootState) => state.holyCross.currentBonuses.crystals
  );
  const inlineUserStats: inlineStatInterface[] = [
    {
      img: TimeIcon,
      text: `Time played: ${secondsToHms(userStats.totalTimePlay)}`,
    },
    {
      img: CookieIcon,
      text: `Total Cookies Collected: ${numberFormatter.format(
        userStats.totalCookiesCollected
      )}`,
    },
    {
      img: CrystalsIcon,
      text: `Total Crystals Collected: ${userStats.totalCrystalsCollected}`,
    },
    {
      img: ExplosionIcon,
      text: `Total number of generated explosions: ${userStats.totalNumberOfExplosions}`,
    },
    {
      img: [ExplosionIcon, CookieIcon],
      text: `Total number of cookies gained from explosions: ${numberFormatter.format(
        userStats.cookiesGainedFromExplosion
      )}`,
    },
    {
      img: ResetGameIcon,
      text: `Number of game resets: ${numberOfGameResets}`,
    },
    {
      img: SkillPointIcon,
      text: `Skill Points gained from Holy Cross: ${holyCrossSkillPoints * 2}`,
    },
    {
      img: CrystalsIcon,
      text: `Crystals gained from Holy Cross: ${
        crystalsGainedFromHolyCross * 25
      }`,
    },
  ];

  const doubleClickShopItemState = useSelector((state: RootState) =>
    state.gameLogic.shopItems.find((x) => x.name === "doubleClick")
  ) as CookiesShopItem;

  const isClickDoubledFromShop =
    doubleClickShopItemState.wasBought && !doubleClickShopItemState.isLocked;
  // const isSkillTreeUnlocked = useSelector(
  //   (state: RootState) => state.gameLogic.skillTreeLogic.isSkillTreeUnlocked
  // );

  const isClickTripledFromSkillTreeUpgrades = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "clickingTalent"
      ) as singleSkillTreeNode
  ).wasBought;
  const isClickingWithLoveBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "clickingWithLove"
      ) as singleSkillTreeNode
  ).wasBought;
  const isChakraUpgraded = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "heartOfTheEternal"
      ) as singleSkillTreeNode
  ).wasBought;
  const isChakraActive = useSelector(
    (state: RootState) => state.chakra.isActive
  );
  const isCrystalBallBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "crystalBall"
      ) as singleSkillTreeNode
  ).wasBought;
  const bonusFromCrystalBall = useSelector(
    (state: RootState) => state.crystalBall.bonus
  );
  const isEqualibrumBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "equalibrum"
      ) as singleSkillTreeNode
  ).wasBought;
  const wheelOfFortuneBonus =
    useSelector((state: RootState) => state.wheelOfFortune.currentBonus) ===
    "CPC";
  const equalibrumState = useSelector(
    (state: RootState) => state.eqalibrum.state
  );

  const bonusFromHolyCrossCPC =
    useSelector(
      (state: RootState) => state.holyCross.currentBonuses.CPCMultiplier
    ) /
      100 +
    1;
  const bonusFromHolyCrossCPS =
    useSelector(
      (state: RootState) => state.holyCross.currentBonuses.CPSMultiplier
    ) /
      100 +
    1;
  const isHolyCrossBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "holyCross"
      ) as singleSkillTreeNode
  ).wasBought;
  const totalCollectedCrystals = useSelector(
    (state: RootState) => state.userStats.totalCrystalsCollected
  );
  const isCollectorBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "collector"
      ) as singleSkillTreeNode
  ).wasBought;
  const isIdlePlayerBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "idlePlayer"
      ) as singleSkillTreeNode
  ).wasBought;
  const isTimeMachineBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "timeMachine"
      ) as singleSkillTreeNode
  ).wasBought;
  const collectorMultiplier = useMemo(
    () => Math.floor(totalCollectedCrystals / 1000) * 1,
    [totalCollectedCrystals]
  );
  //? Use Effect that counts base rate of CPC
  useEffect(() => {
    let baseRate: number = 1;
    const steps: baseRateTableCPC[] = [
      { baseRate: "Starting Rate", number: 1 },
    ];
    if (isClickDoubled) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({ baseRate: "Lightning Click", number: previousValue + 1 });
      baseRate += 1;
    }
    if (isCollectorBought) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        baseRate: "The Collector",
        number: previousValue + collectorMultiplier,
      });

      baseRate += collectorMultiplier;
    }
    if (isClickTripledFromSkillTreeUpgrades) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        baseRate: "Clicking Talent",
        number: previousValue + 3,
      });
      baseRate += 3;
    }
    if (isChakraActive) {
      const previousValue = steps[steps.length - 1].number;
      if (!isChakraUpgraded) {
        steps.push({
          baseRate: "Chakra",
          number: previousValue + 3,
        });
        baseRate += 3;
      } else {
        steps.push({
          baseRate: "Heart Of The Eternal",
          number: previousValue + 10,
        });
        baseRate += 10;
      }
    }
    setCPCBonusesBreakdown((prev) => ({ ...prev, CPCBaseRate: steps }));
    setMultipliersBreakdown((prev) => ({ ...prev, CPCBaseRate: baseRate }));
  }, [
    isClickDoubled,
    isCollectorBought,
    isClickTripledFromSkillTreeUpgrades,
    isChakraActive,
    isChakraUpgraded,
  ]);
  //? Use Effect that counts multiplier of CPC
  useEffect(() => {
    const steps: multiplierTableCPC[] = [
      { multiplierUpgrade: "Base Multiplier", number: 1 },
    ];
    let multiplier: number = 1;
    if (isCrystalBallBought) {
      multiplier += bonusFromCrystalBall;
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * bonusFromCrystalBall,
        multiplierUpgrade: "Crystal Ball",
      });
    }
    if (isClickingWithLoveBought) {
      multiplier += 2;
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * 2,
        multiplierUpgrade: "Clicking With Love",
      });
    }

    if (wheelOfFortuneBonus) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * 3,
        multiplierUpgrade: "Wheel Of Fortune",
      });
      multiplier += 3;
    }
    if (isHolyCrossBought) {
      multiplier += bonusFromHolyCrossCPC;
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * bonusFromHolyCrossCPC,
        multiplierUpgrade: "Holy Cross",
      });
    }
    if (isEqualibrumBought && equalibrumState === "idleExhaustion") {
      multiplier += 3;
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * 3,
        multiplierUpgrade: "Equalibrum",
      });
    }
    setCPCBonusesBreakdown((prev) => ({ ...prev, CPCMultipliers: steps }));
    setMultipliersBreakdown((prev) => ({ ...prev, CPCMultiplier: multiplier }));
  }, [
    isCrystalBallBought,
    isClickingWithLoveBought,
    wheelOfFortuneBonus,
    bonusFromCrystalBall,
    wheelOfFortuneBonus,
    isHolyCrossBought,
    bonusFromHolyCrossCPC,
    isEqualibrumBought,
    equalibrumState,
  ]);
  //? Use Effect that counts base rate of CPS
  useEffect(() => {
    let baseRate: number = 1;
    const steps: baseRateTableCPS[] = [
      { baseRate: "Starting Rate", number: 1 },
    ];
    if (isIdlePlayerBought) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({ baseRate: "Idle Player", number: previousValue + 4 });
      baseRate += 4;
    }
    if (isCollectorBought) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        baseRate: "Idle Player",
        number: previousValue + collectorMultiplier,
      });
      baseRate += collectorMultiplier;
    }
    if (isChakraActive) {
      const previousValue = steps[steps.length - 1].number;
      if (!isChakraUpgraded) {
        steps.push({
          baseRate: "Chakra",
          number: previousValue + 3,
        });
        baseRate += 3;
      } else {
        steps.push({
          baseRate: "Heart Of The Eternal",
          number: previousValue + 10,
        });
        baseRate += 10;
      }
    }
    setCPSBonusesBreakdown((prev) => ({ ...prev, CPSBaseRate: steps }));

    setMultipliersBreakdown((prev) => ({
      ...prev,
      CPSBaseRate: baseRate,
    }));
  }, [isCollectorBought, isIdlePlayerBought, isChakraActive, isChakraUpgraded]);
  //? Use Effect that counts multiplier of CPS
  useEffect(() => {
    let multiplier: number = 1;
    const steps: multiplierTableCPS[] = [
      { multiplierUpgrade: "Base Multiplier", number: 1 },
    ];
    if (isCrystalBallBought) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * bonusFromCrystalBall,
        multiplierUpgrade: "Crystal Ball",
      });
      multiplier += bonusFromCrystalBall;
    }
    if (isTimeMachineBought) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * 2,
        multiplierUpgrade: "Time Machine",
      });
      multiplier += 2;
    }
    if (wheelOfFortuneBonus) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * 3,
        multiplierUpgrade: "Wheel Of Fortune",
      });
      multiplier += 3;
    }
    if (isHolyCrossBought) {
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * bonusFromHolyCrossCPS,
        multiplierUpgrade: "Holy Cross",
      });
      multiplier += bonusFromHolyCrossCPS;
    }
    if (isEqualibrumBought && equalibrumState === "clickExhaustion") {
      const previousValue = steps[steps.length - 1].number;
      steps.push({
        number: previousValue * 3,
        multiplierUpgrade: "Equalibrum",
      });
      multiplier += 3;
    }
    setCPSBonusesBreakdown((prev) => ({ ...prev, CPSMultipliers: steps }));
    setMultipliersBreakdown((prev) => ({
      ...prev,
      CPSMultiplier: multiplier,
    }));
  }, [
    isCrystalBallBought,
    bonusFromCrystalBall,
    isTimeMachineBought,
    wheelOfFortuneBonus,
    isHolyCrossBought,
    bonusFromHolyCrossCPS,
    isEqualibrumBought,
    equalibrumState,
  ]);
  return (
    <>
      <label htmlFor="StatsModal">
        <figure className={` cursor-pointer`}>
          <Image src={StatsIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="StatsModal" />

      <label htmlFor="StatsModal" className={`modal`}>
        <label className="modal-box bg-white" htmlFor="">
          <h1 className="text-2xl font-bold text-center">Stats</h1>
          <div className="flex flex-col gap-2 justify-center items-center text-center">
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
            >
              <div className="collapse-title text-xl font-medium">
                <div className="flex gap-2 justify-center items-center">
                  <Image src={ClickIcon} width={32} height={32} />
                  <span>Click Multiplier: {Math.floor(multiplier)}</span>
                </div>
              </div>
              <div className="collapse-content">
                <table>
                  {CPCBonusesBreakdown.CPCBaseRate.map((x) => (
                    <TableStat
                      key={x.baseRate}
                      bonus={x.baseRate}
                      number={x.number}
                      operator={"+"}
                    />
                  ))}
                  {CPCBonusesBreakdown.CPCMultipliers.map((x) => (
                    <TableStat
                      key={x.multiplierUpgrade}
                      bonus={x.multiplierUpgrade}
                      number={x.number}
                      operator={"*"}
                    />
                  ))}
                </table>
              </div>
            </div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
            >
              <div className="collapse-title text-xl font-medium">
                <div className="flex gap-2 justify-center items-center">
                  <Image src={IdleIcon} width={32} height={32} />
                  <span>Idle Multiplier: {Math.floor(multiplierCPS)}</span>
                </div>
              </div>
              <div className="collapse-content">
                <table>
                  {CPSBonusesBreakdown.CPSBaseRate.map((x) => (
                    <TableStat
                      key={x.baseRate}
                      bonus={x.baseRate}
                      number={x.number}
                      operator={"+"}
                    />
                  ))}
                  {CPSBonusesBreakdown.CPSMultipliers.map((x) => (
                    <TableStat
                      key={x.multiplierUpgrade}
                      bonus={x.multiplierUpgrade}
                      number={x.number}
                      operator={"*"}
                    />
                  ))}
                </table>
              </div>
            </div>
            {inlineUserStats.map((x) => (
              <InlineStat {...x} key={x.text} />
            ))}
          </div>
        </label>
      </label>
    </>
  );
};
