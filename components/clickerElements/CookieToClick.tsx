import { useDispatch, useSelector } from "react-redux";
import { addCookie, addCrystals } from "../../redux/gameLogicReducer";
import Image from "next/image";
import CoockieImage from "../../public/cookie.png";
import { RootState } from "../../redux/store";
import { useClickMultiplier } from "../../utils/hooks/useClickMultiplier";
import { generateRandomNumber } from "../../utils/utils";
import ShardIcon from "../../public/crystal.png";
import { singleSkillTreeNode } from "../../utils/interfaces";
import { useState } from "react";
import { addExplosionCookiesCount } from "../../redux/explosionCookiesReducer";
import { useCPSMultiplier } from "../../utils/hooks/useCPSMultiplier";
// export interface CookieToClickProps {
//   setCookieCount: React.Dispatch<React.SetStateAction<number>>;
// }

export const CookieToClick: React.FC = () => {
  const [explosionAnimationPlayState, setExplosionAnimationPlayState] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const CPC = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.CPC
  );
  const isPickaxeBought = useSelector(
    (state: RootState) =>
      state.gameLogic.shopItems.find((x) => x.name === "doubleCrystals")
        ?.wasBought
  );
  const crystalMineMultiplier = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "crystalMine"
      ) as singleSkillTreeNode
  ).wasBought
    ? 1
    : 0;
  const cookiesExplosionBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "cookieExplosion"
      ) as singleSkillTreeNode
  ).wasBought;
  const nuclearBombBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "nuclearBomb"
      ) as singleSkillTreeNode
  ).wasBought;
  const wasCarpetBombingBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "carpetBombing"
      ) as singleSkillTreeNode
  ).wasBought;
  const isTimeBombBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "timeBomb"
      ) as singleSkillTreeNode
  ).wasBought;
  function pop(e: React.MouseEvent) {
    let shardsGenerated: number = 0;
    let didExplosionHappen: boolean = false;
    for (let i = 0; i < 30; i++) {
      const generateShard =
        generateRandomNumber(0, 10000) >
        (!isPickaxeBought ? 9700 : 9600) - 200 * crystalMineMultiplier;
      if (generateShard) {
        shardsGenerated += 1;
        if (cookiesExplosionBought) {
          if (
            generateRandomNumber(0, 100) > (wasCarpetBombingBought ? 97 : 99)
          ) {
            didExplosionHappen = true;
          }
        }
      }
      createParticle(e.clientX, e.clientY, generateShard);
    }
    if (didExplosionHappen) {
      const timeBombMultiplier = isTimeBombBought ? multiplierCPS : 1;
      console.log(timeBombMultiplier);
      const cookiesGainedFromExplosion =
        (nuclearBombBought ? 60 : 20) *
        CPC *
        multiplier *
        timeBombMultiplier *
        ((100 - generateRandomNumber(0, 30)) / 100);
      setExplosionAnimationPlayState(true);
      dispatch(addCookie(cookiesGainedFromExplosion));
      dispatch(addExplosionCookiesCount(cookiesGainedFromExplosion));
    }
    dispatch(addCrystals(shardsGenerated));
    dispatch(addCookie(Math.floor(shardsGenerated / 2) * CPC));
  }

  function createParticle(x: number, y: number, generateShard: boolean) {
    const particle = document.createElement("particle");
    document.body.appendChild(particle);
    const size = Math.floor(Math.random() * 35 + 10);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    if (!generateShard) {
      particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
      particle.style.borderRadius = `50%`;
    } else {
      particle.style.backgroundImage = `url(${ShardIcon.src})`;
    }

    const destinationX =
      x + (Math.random() - 0.5) * 2 * (!generateShard ? 75 : 200);
    const destinationY =
      y + (Math.random() - 0.5) * 2 * (!generateShard ? 75 : 200);

    const animation = particle.animate(
      [
        {
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 1000 + (!generateShard ? 500 : 1500),
        easing: "cubic-bezier(0, .9, .57, 1)",
        // Delay every particle with a random value of 200ms
        delay: Math.random() * 200,
      }
    );

    animation.onfinish = () => {
      particle.remove();
    };
  }

  const { isClickDoubled, multiplier } = useClickMultiplier();
  const { multiplierCPS } = useCPSMultiplier();
  const handleClickIncrementation = () => {
    dispatch(addCookie(CPC * multiplier));
  };
  return (
    <Image
      src={CoockieImage}
      priority={true}
      className={`cursor-pointer transition-all ${
        explosionAnimationPlayState ? "ShakeAnimationXL" : ""
      }`}
      onAnimationEnd={() => setExplosionAnimationPlayState(false)}
      onClick={(e) => {
        handleClickIncrementation();
        pop(e);
      }}
      height={256}
      width={256}
    />
  );
};
