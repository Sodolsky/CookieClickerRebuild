import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { nodeNames, singleSkillTreeNode } from "../../utils/interfaces";

interface ConnectingLineProps {
  from: nodeNames;
  to: nodeNames;
  connectionName: string;
}
export const ConnectingLine: React.FC<ConnectingLineProps> = ({
  from,
  to,
  connectionName,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const targetNode = useSelector((state: RootState) =>
    state.gameLogic.skillTreeLogic.skillTreeNodes.find((x) => x.name === to)
  ) as singleSkillTreeNode;
  const fromNode = useSelector((state: RootState) =>
    state.gameLogic.skillTreeLogic.skillTreeNodes.find((x) => x.name === from)
  ) as singleSkillTreeNode;
  useEffect(() => {
    targetNode.wasBought && fromNode.wasBought
      ? setIsActive(true)
      : setIsActive(false);
  }, [targetNode.wasBought, fromNode.wasBought]);
  const adjustLine = (
    from: HTMLDivElement,
    to: HTMLDivElement,
    line: HTMLDivElement
  ) => {
    var fT = from.offsetTop + from.offsetHeight / 2;
    var tT = to.offsetTop + to.offsetHeight / 2;
    var fL = from.offsetLeft + from.offsetWidth / 2;
    var tL = to.offsetLeft + to.offsetWidth / 2;
    var CA = Math.abs(tT - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = (180 / Math.PI) * Math.acos(CA / H);

    if (tT > fT) {
      var top = (tT - fT) / 2 + fT;
    } else {
      var top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
      var left = (tL - fL) / 2 + fL;
    } else {
      var left = (fL - tL) / 2 + tL;
    }

    if (
      (fT < tT && fL < tL) ||
      (tT < fT && tL < fL) ||
      (fT > tT && fL > tL) ||
      (tT > fT && tL > fL)
    ) {
      ANG *= -1;
    }
    top -= H / 2;

    line.style.transform = "rotate(" + ANG + "deg)";
    line.style.top = top + "px";
    line.style.left = left + "px";
    line.style.height = H + "px";
  };
  useEffect(() => {
    adjustLine(
      document.getElementById(from) as HTMLDivElement,
      document.getElementById(to) as HTMLDivElement,
      document.getElementById(connectionName) as HTMLDivElement
    );
  }, []);
  return (
    <div
      id={connectionName}
      className={`absolute z-0 w-[4px] border border-black shadow-2xl transition-colors duration-500  rounded-lg ${
        isActive ? "bg-green-500" : "bg-red-500"
      }`}
    ></div>
  );
};
