import { useEffect } from "react";
import { nodeNames } from "../../utils/interfaces";

interface ConnectingLineProps {
  node1: nodeNames;
  node2: nodeNames;
  connectionName: string;
}
export const ConnectingLine: React.FC<ConnectingLineProps> = ({
  node1,
  node2,
  connectionName,
}) => {
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
      document.getElementById(node1) as HTMLDivElement,
      document.getElementById(node2) as HTMLDivElement,
      document.getElementById(connectionName) as HTMLDivElement
    );
  }, []);
  return (
    <div
      id={connectionName}
      className="absolute w-[3px] rounded-lg bg-red-500"
    ></div>
  );
};
