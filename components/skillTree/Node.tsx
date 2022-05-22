import { singleSkillTreeNode } from "../../utils/interfaces";

export const Node: React.FC<singleSkillTreeNode> = ({
  previousNodes,
  positionObject,
  image,
  wasBought,
  name,
  price,
}) => {
  const buyNode = () => {};
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
