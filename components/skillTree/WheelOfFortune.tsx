import React from "react";
const colorsArray: string[] = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-orange-400",
  "bg-yellow-400",
];
interface wheelOfFortuneInterface {
  arrayOfOptions: string[];
}
export const WheelOfFortune: React.FC<wheelOfFortuneInterface> = ({
  arrayOfOptions,
}) => {
  return (
    <div className="">
      <div className="z-10 bg-black h-32 w-60 flex justify-center items-center overflow-auto">
        {arrayOfOptions.map((x, i) => {
          const divColor = `${colorsArray[i]}`;
          return <div className={`${divColor} z-0 h-28`} key={x}></div>;
        })}
      </div>
    </div>
  );
};
