import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ClickIcon from "../../public/clickeq.png";
import IdleIcon from "../../public/idleeq.png";
import Tippy from "@tippyjs/react";
import { useEffect, useRef } from "react";
export const EqualibrumStacksDisplay = () => {
  const equalibrum = useSelector((state: RootState) => state.eqalibrum);
  const circleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (circleRef.current) {
      if (equalibrum.state === "clickExhaustion") {
        circleRef.current.style.background = `linear-gradient(90deg, #2a2a72 0%,  #009ffd 74%)`;
      }
      if (equalibrum.state === "idleExhaustion") {
        circleRef.current.style.background = `linear-gradient(90deg, #ff4e00 0%,  #ec9f05 74%)`;
      }
      if (equalibrum.state === "idle") {
        circleRef.current.style.background = `linear-gradient(90deg, red ${50}%, blue ${50}%)`;
      }
    }
  }, [equalibrum]);
  return (
    <Tippy
      content={
        <div className="bg-black text-white w-16 h-16 rounded-xl flex justify-center gap-2 items-center border-purple-400">
          <div className="flex flex-col items-center gap-[1px]">
            <Image
              src={ClickIcon}
              alt={"Click Icon"}
              width={16}
              height={16}
              className={"border-b border-white"}
            />
            <span>{equalibrum.clickStacks}</span>
          </div>
          <div className="flex flex-col items-center gap-[2px]">
            <Image src={IdleIcon} alt={"Idle Icon"} width={16} height={16} />
            <span>{equalibrum.idleStacks}</span>
          </div>
        </div>
      }
    >
      <div
        className={`w-16 h-16 relative rounded-full border border-black  ${
          equalibrum.state !== "idle" && "animate-pulse animate-spin"
        } halveCircleBG text-white text-[1rem] flex items-center justify-center`}
        ref={circleRef}
      >
        {equalibrum.state === "idle" ? (
          <>
            <div className="absolute left-[3px] top-[1px] flex justify-center items-center flex-col w-8 h-16">
              {equalibrum.clickStacks}
            </div>
            <div className="absolute left-[33px] top-[1px] flex justify-center items-center flex-col w-8 h-16">
              {equalibrum.idleStacks}
            </div>
          </>
        ) : (
          <span>
            {equalibrum.state === "clickExhaustion" ? "IDLE" : "CLICK"}
          </span>
        )}
      </div>
    </Tippy>
  );
};
