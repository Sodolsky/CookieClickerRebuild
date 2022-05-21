import { ConnectingLine } from "./ConnectingLine";
import { Node } from "./Node";
export const SkillTree = () => {
  return (
    <>
      <Node
        id="starterNode"
        positionObject={{ left: "50%", bottom: "2%" }}
        previousNodes={[]}
        image="letter-s.png"
      />
      <Node
        id="clickingTalent"
        positionObject={{ left: "50%", bottom: "12%" }}
        previousNodes={["starterNode"]}
        image="letter-s.png"
      />
      <ConnectingLine
        node1="starterNode"
        node2="clickingTalent"
        connectionName="fc"
      />
      <Node
        id="gemMaestry"
        positionObject={{ left: "25%", bottom: "12%" }}
        previousNodes={["starterNode", "clickingTalent"]}
        image="letter-s.png"
      />
      <ConnectingLine
        node1="clickingTalent"
        node2="gemMaestry"
        connectionName="sc"
      />
    </>
  );
};
