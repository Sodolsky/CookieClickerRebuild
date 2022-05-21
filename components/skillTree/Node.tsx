import { CSSProperties } from "react";
import { nodeNames } from "../../utils/interfaces";

interface NodeProps {
  id: nodeNames;
  image: string;
  previousNodes: nodeNames[];
  positionObject: CSSProperties;
}
export const Node: React.FC<NodeProps> = ({
  id,
  previousNodes,
  positionObject,
  image,
}) => {
  return (
    <div id={id} className="mydiv node" style={positionObject}>
      <img src={image} className="w-full h-full" alt={id} />
    </div>
  );
};
