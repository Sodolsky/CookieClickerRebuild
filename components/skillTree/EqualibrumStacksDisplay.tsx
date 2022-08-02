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
      if (equalibrum.state === "idle") {
        circleRef.current.style.background = `linear-gradient(90deg, red ${equalibrum.clickStacks}%, blue ${equalibrum.idleStacks}%)`;
      } else if (equalibrum.state === "clickExhaustion") {
      } else {
      }
    }
  }, [equalibrum]);
  return (
    <Tippy
      content={
        <div className="bg-black text-white w-16 h-16 rounded-xl flex justify-center gap-2 items-center border-purple-400">
          <div className="flex flex-col items-center gap-[2px]">
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
        className="w-16 h-16 relative rounded-full border border-black halveCircleBG text-white text-[1rem] flex justify-center items-center"
        ref={circleRef}
      >
        {/* <div className="absolute left-[3px] top-[1px] flex justify-center items-center flex-col w-8 h-16"></div>
        <div className="absolute left-[33px] top-[1px] flex justify-center items-center flex-col w-8 h-16">
          <figure className="grow-[2]"></figure>
        </div> */}
      </div>
    </Tippy>
  );
};
