import Tippy from "@tippyjs/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { buySkillTreeUpgrade } from "../../redux/gameLogicReducer";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../../utils/interfaces";
import { isTouchDevice } from "../../utils/utils";
interface localNodeInterface extends singleSkillTreeNode {
  showExplanations: boolean;
  buySound: HTMLAudioElement | null;
}
export const Node: React.FC<localNodeInterface> = ({
  connectedNodes,
  positionObject,
  image,
  wasBought,
  description,
  nameForPlayer,
  name,
  price,
  explanation,
  showExplanations,
  isNotable,
  buySound,
}) => {
  const isTouch = isTouchDevice();
  const dispatch = useDispatch();
  const skillPoints = useSelector(
    (state: RootState) => state.gameLogic.skillTreeLogic.skillPoints
  );
  const allPreviousNodes = useSelector((state: RootState) =>
    state.gameLogic.skillTreeLogic.skillTreeNodes.filter((x) =>
      connectedNodes.some((upgradeName) => x.name === upgradeName)
    )
  );
  const canBuy = allPreviousNodes.some((x) => x.wasBought);
  const buyNode = () => {
    if (skillPoints >= price && !wasBought && canBuy) {
      buySound?.play();
      dispatch(buySkillTreeUpgrade(name));
    }
  };
  return (
    <div>
      <Tippy
        allowHTML={true}
        interactive={true}
        content={
          name !== "starterNode" ? (
            <div className="bg-black p-2 rounded-xl text-white w-72 relative">
              <div className="flex flex-col items-center justify-center">
                <div className="w-full">
                  <div className="flex justify-center italic text-lg font-bold">
                    {nameForPlayer}
                  </div>
                  <div className="flex gap-1 items-center justify-center">
                    <Image
                      width={16}
                      height={16}
                      src={"/skillPoint16x16.png"}
                      alt={"Skill Point"}
                    />
                    <span>{price} Skill Points</span>
                  </div>

                  <figure className="absolute right-1 top-1">
                    <Image
                      src={wasBought ? "/check-mark.png" : "/x.png"}
                      className="absolute"
                      width={24}
                      height={24}
                      alt={"Buyed Status"}
                    />
                  </figure>
                </div>
                <div className="mt-1 text-center">{description}</div>
                {showExplanations && (
                  <div className="mt-1 text-center text-gray-400">
                    {explanation}
                  </div>
                )}
                {isTouch && !wasBought && (
                  <button className="btn bg-green-400 mt-1" onClick={buyNode}>
                    Buy
                  </button>
                )}
              </div>
            </div>
          ) : (
            <span className="bg-black p-2 rounded-xl text-white flex items-center justify-center">
              Starting Node
            </span>
          )
        }
      >
        <div
          id={name}
          className={`mydiv node border-2 bg-secondary ${
            isNotable ? "nodeNotable" : ""
          }   ${wasBought ? "border-green-500" : "border-red-500"}`}
          onClick={() => !isTouch && buyNode()}
          style={positionObject}
        >
          <Image
            src={`/${image}`}
            className={"rounded-image"}
            height={32}
            width={32}
            alt={name}
          />
        </div>
      </Tippy>
    </div>
  );
};
