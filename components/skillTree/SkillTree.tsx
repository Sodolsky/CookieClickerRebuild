import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ConnectingLine } from "./ConnectingLine";
import { Node } from "./Node";
export const SkillTree = () => {
  const allNodes = useSelector(
    (state: RootState) => state.gameLogic.skillTreeLogic.skillTreeNodes
  );
  return (
    <>
      {allNodes.map((x) => (
        <Node {...x} key={x.name} />
      ))}
      {allNodes
        .filter((x) => x.connectedNodes.length > 0)
        .map((item) => {
          const val = item.connectedNodes.map((node) => {
            return (
              <ConnectingLine
                from={node}
                to={item.name}
                connectionName={`${node}-${item.name}`}
                key={`${node}-${item.name}`}
              />
            );
          });
          return val;
        })}
    </>
  );
};
