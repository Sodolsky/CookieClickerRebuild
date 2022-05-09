import { useDispatch, useSelector } from "react-redux";
import { addCookie, addCrystals } from "../../redux/gameLogicReducer";
import Image from "next/image";
import CoockieImage from "../../public/cookie.png";
import { RootState } from "../../redux/store";
import { useDoubleClickUpgrade } from "../../utils/hooks/useDoubleClickUpgrade";
import { generateRandomNumber } from "../../utils/utils";
import ShardIcon from "../../public/crystal.png";
// export interface CookieToClickProps {
//   setCookieCount: React.Dispatch<React.SetStateAction<number>>;
// }

export const CookieToClick: React.FC = () => {
  const dispatch = useDispatch();
  const CPC = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.CPC
  );

  function pop(e: React.MouseEvent) {
    let shardsGenerated: number = 0;
    for (let i = 0; i < 30; i++) {
      const generateShard = generateRandomNumber(0, 1000) > 950;
      if (generateShard) shardsGenerated += 1;
      createParticle(e.clientX, e.clientY, generateShard);
    }
    dispatch(addCrystals(shardsGenerated));
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

  const { isClickDoubled, multiplier } = useDoubleClickUpgrade();
  const handleClickIncrementation = () => {
    dispatch(addCookie(CPC * multiplier));
  };
  return (
    <Image
      src={CoockieImage}
      className={"cursor-pointer transition-all"}
      onClick={(e) => {
        handleClickIncrementation();
        pop(e);
      }}
      height={256}
      width={256}
    />
  );
};
