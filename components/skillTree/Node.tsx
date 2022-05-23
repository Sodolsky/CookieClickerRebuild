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
    <div
      id={name}
      className="mydiv node"
      style={positionObject}
      onClick={buyNode}
    >
      <img src={image} className="w-full h-full" alt={name} />
    </div>
  );
};
