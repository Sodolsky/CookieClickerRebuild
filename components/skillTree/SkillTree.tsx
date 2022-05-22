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
        <Node {...x} />
      ))}
      <ConnectingLine
        node1="starterNode"
        node2="clickingTalent"
        connectionName="fc"
      />
      <ConnectingLine
        node1="clickingTalent"
        node2="gemMaestry"
        connectionName="sc"
      />
    </>
  );
};
