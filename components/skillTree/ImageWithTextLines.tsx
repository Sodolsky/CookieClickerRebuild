import Image from "next/image";
import { FC, useEffect, useState } from "react";
import EternalImage from "../../public/eternalone.jpg";
import { SingleTextLine } from "./SingleTextLine";
import { SetStateWrapper } from "../../utils/interfaces";
interface textBlock {
  textLines: string[];
}

const text: textBlock[] = [
  {
    textLines: [
      "You have grown strong, but you are not the first to claim eternity.",
      "The path to victory is treacherous, and many have fallen before you.",
      "Do you have what it takes to surpass them?",
    ],
  },
];
interface ImageWithTextLinesProps {
  setRenderEndgameMinigame: SetStateWrapper<boolean>;
}
const initialDelay = 500;
export const ImageWithTextLines: FC<ImageWithTextLinesProps> = ({
  setRenderEndgameMinigame,
}) => {
  const [initialFade, setinitialFade] = useState(false);
  useEffect(() => {
    setTimeout(() => setinitialFade(true), initialDelay);
    setTimeout(() => setRenderEndgameMinigame(true), 10000);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <figure
        className={`duration-500 transition-opacity ${
          initialFade ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={EternalImage}
          alt={"Image of The Eternal"}
          width={640}
          height={650}
        />
      </figure>
      <div className="text-white text-3xl font-bold">
        {text.map((x) => {
          return (
            <div className={`flex flex-col gap-2`} key={"First Dialogue"}>
              {x.textLines.map((x, i) => {
                return (
                  <SingleTextLine
                    key={x}
                    text={x}
                    delay={i * 2000 + initialDelay}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
