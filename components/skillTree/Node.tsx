import Tippy from "@tippyjs/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { buySkillTreeUpgrade } from "../../redux/gameLogicReducer";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../../utils/interfaces";
export const Node: React.FC<singleSkillTreeNode> = ({
  connectedNodes,
  positionObject,
  image,
  wasBought,
  name,
  price,
}) => {
  const dispatch = useDispatch();
  const skillPoints = useSelector(
    (state: RootState) => state.gameLogic.skillTreeLogic.skillPoints
  );
  const allPreviousNodes = useSelector((state: RootState) =>
    state.gameLogic.skillTreeLogic.skillTreeNodes.filter((x) =>
      connectedNodes.some((upgradeName) => x.name === upgradeName)
    )
  );
  const canBuy = allPreviousNodes.every((x) => x.wasBought);
  const buyNode = () => {
    if (skillPoints >= price && !wasBought && canBuy) {
      dispatch(buySkillTreeUpgrade(name));
    }
  };
  return (
    <Tippy
      allowHTML={true}
      content={
        <caption className="bg-black p-2 rounded-xl text-white w-64 relative">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full">
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
            <div className="divider"></div>
            <div className="w-1 bg-white"></div>
            <div className=""></div>
          </div>
        </caption>
      }
    >
      <div
        id={name}
        className={`mydiv node border-2 bg-secondary   ${
          wasBought ? "border-green-500" : "border-red-500"
        }`}
        style={positionObject}
        onClick={buyNode}
      >
        <Image
          src={`/${image}`}
          layout={"fill"}
          className="w-full h-full"
          alt={name}
        />
      </div>
    </Tippy>
  );
};
