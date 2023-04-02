import Image from "next/image";
import { useEffect, useState } from "react";
import EternalImage from "../../public/eternalone.jpg";
import { SingleTextLine } from "./SingleTextLine";
interface textBlock {
  textLines: string[];
  duration: number;
}

const text: textBlock[] = [
  {
    textLines: [
      "You have grown strong, but you are not the first to claim eternity.",
      "The path to victory is treacherous, and many have fallen before you.",
      "Do you have what it takes to surpass them?",
    ],
    duration: 4000,
  },
];
const initialDelay = 500;
export const ImageWithTextLines = () => {
  const [initialFade, setinitialFade] = useState(false);
  useEffect(() => {
    setTimeout(() => setinitialFade(true), initialDelay);
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
      <div className="text-white text-3xl font-bold flex flex-col gap-2">
        {text.map((x) => {
          return x.textLines.map((x, i) => {
            return <SingleTextLine text={x} delay={i * 500 + initialDelay} />;
          });
        })}
      </div>
    </div>
  );
};
