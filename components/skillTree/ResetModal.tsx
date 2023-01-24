import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResetIcon from "../../public/reset.png";
import { RootState } from "../../redux/store";
import {
  singleSkillTreeNode,
  wheelOfFortuneBonuses,
} from "../../utils/interfaces";
import { generateRandomNumber } from "../../utils/utils";
import skillPointIcon from "../../public/skillPoint16x16.png";
import { changeWheelOfFortuneBonus } from "../../redux/wheelOfFortuneReducer";
interface resetGameQuote {
  quote: string;
  resetsRequired: number;
}
const loreQuotes: resetGameQuote[] = [
  {
    quote:
      "Your only starting to gather some of my POWER! Do you feel it? Do you feel the pain? You made an sacrifice you won't last long...",
    resetsRequired: 1,
  },
];
export interface ResetModalProps {
  resetGameLogic: (skillPointsCount: number) => void;
}
export const ResetModal: React.FC<ResetModalProps> = ({ resetGameLogic }) => {
  const isQPBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "quantumPhysics"
      ) as singleSkillTreeNode
  ).wasBought;
  const isWheelOfFortuneBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "wheelOfFortune"
      ) as singleSkillTreeNode
  ).wasBought;
  const [wasWheelOfFortuneRolled, setWasWheelOfFortuneRolled] = useState(false);
  const [wheelOfFortuneText, setWheelOfFortuneText] = useState<string>("");
  const numberOfResets = useSelector(
    (state: RootState) => state.gameLogic.numberOfResets
  );
  const dispatch = useDispatch();
  const wheelOfFortuneBonuses: wheelOfFortuneBonuses[] = [
    "CPC",
    "CPS",
    "cheaperUpgrades",
    "moreCrystals",
    "moreFrequentExplosions",
    "moreSkillPointsNextRestart",
  ];
  const rollWheelOfFortune = () => {
    const rolledBonus =
      wheelOfFortuneBonuses[
        generateRandomNumber(0, wheelOfFortuneBonuses.length - 1)
      ];
    dispatch(changeWheelOfFortuneBonus(rolledBonus));
    setWheelOfFortuneText(
      convertWheelOfFortuneBonusToUserFriendlyText(rolledBonus)
    );
    setWasWheelOfFortuneRolled(true);
  };
  const wheelOfFortuneBonusSkillPoints =
    useSelector((state: RootState) => state.wheelOfFortune.currentBonus) ===
    "moreSkillPointsNextRestart";
  const wheelOfFortuneBonus = useRef<number>(1);
  const resetGamePoints = (isQPBought ? 60 : 30) * wheelOfFortuneBonus.current;
  return (
    <>
      <label htmlFor="resetModal">
        <figure className={`cursor-pointer`}>
          <Image src={ResetIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="resetModal" />

      <label htmlFor="resetModal" className={`modal`}>
        <div className="modal-box">
          <div className="flex gap-2 justify-center items-center flex-col">
            <q className="text-xl text-center">
              {loreQuotes.find((x) => x.resetsRequired === numberOfResets)
                ?.quote ?? "Soon it will be over! You will get consumed"}
            </q>
            {isWheelOfFortuneBought && (
              <button
                className="btn"
                onClick={rollWheelOfFortune}
                disabled={wasWheelOfFortuneRolled}
              >
                Roll Wheel Of Fortune
              </button>
            )}
            <span className="text-green-400 font-bold text-xl text-center">
              {wasWheelOfFortuneRolled && wheelOfFortuneText}
            </span>
            <div className="flex justify-center items-center flex-col gap-1">
              <div className="flex gap-1 justify-center items-center">
                <span>
                  Restart the game to gain {resetGamePoints} Skill Points
                </span>
                <Image
                  width={16}
                  height={16}
                  src={skillPointIcon.src}
                  alt="Skill Points icon"
                />
              </div>
              <button
                className="btn "
                disabled={isWheelOfFortuneBought && !wasWheelOfFortuneRolled}
                onClick={() => {
                  resetGameLogic(resetGamePoints);
                  if (wheelOfFortuneBonusSkillPoints) {
                    wheelOfFortuneBonus.current = 3;
                  } else if (
                    wheelOfFortuneBonus.current === 3 &&
                    !wheelOfFortuneBonusSkillPoints
                  ) {
                    wheelOfFortuneBonus.current = 1;
                  }
                  setWasWheelOfFortuneRolled(false);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </label>
    </>
  );
};
const convertWheelOfFortuneBonusToUserFriendlyText = (
  rolledBonus: wheelOfFortuneBonuses
): string => {
  switch (rolledBonus) {
    case "CPC":
      return "Your CPC multiplier will be tripled for the next game.";
    case "CPS":
      return "Your CPS multiplier will be tripled for the next game.";
    case "cheaperUpgrades":
      return "Your Upgrades will cost halve the price for the next game.";
    case "moreCrystals":
      return "You will gain significantly more crystals next game.";
    case "moreFrequentExplosions":
      return "Your explosion chance will be significantly increased.";
    case "moreSkillPointsNextRestart":
      return "Next game restart will earn you 3x more Skill Points.";
  }
};
