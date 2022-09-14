import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../../utils/interfaces";
import { ConnectingLine } from "./ConnectingLine";
import { Node } from "./Node";
interface SkillTreeInterface {
  showExplanations: boolean;
}
export const SkillTree: React.FC<SkillTreeInterface> = ({
  showExplanations,
}) => {
  const allNodes = useSelector(
    (state: RootState) => state.gameLogic.skillTreeLogic.skillTreeNodes
  );
  const upgradeSoundRef = useRef<null | HTMLAudioElement>(null);
  return (
    <>
      <audio src="upgradeSound.mp3" ref={upgradeSoundRef}></audio>
      {allNodes.map((x) => (
        <Node
          {...x}
          key={x.name}
          showExplanations={showExplanations}
          buySound={upgradeSoundRef.current}
        />
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
