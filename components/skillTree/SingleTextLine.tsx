import { useEffect, useState } from "react";

interface SingleTextLineInterface {
  delay: number;
  text: string;
}
export const SingleTextLine: React.FC<SingleTextLineInterface> = ({
  delay,
  text,
}) => {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setTimeout(() => setFadeIn(true), delay);
  }, []);
  return (
    <span
      className={`transition-opacity z-50 duration-200 text-center ${
        fadeIn ? " opacity-100" : "opacity-0"
      }`}
    >
      {text}
    </span>
  );
};
