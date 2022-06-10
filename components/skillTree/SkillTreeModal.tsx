import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SkillTree } from "./SkillTree";
import SettingsIcon from "../../public/settings.png";
import Tippy from "@tippyjs/react";
export const SkillTreeModal = () => {
  const skillPointsCount = useSelector(
    (state: RootState) => state.gameLogic.skillTreeLogic.skillPoints
  );
  const [showExplanations, setShowExplanations] = useState<boolean>(false);
  return (
    <>
      <label htmlFor="skillTreeModal">
        <figure className="absolute bottom-2 left-2 md:top-4 md:left-4 cursor-pointer">
          <Image
            className="absolute t-2 l-2"
            src={"/skillTree.png"}
            height={64}
            width={64}
          />
        </figure>
      </label>
      <input type="checkbox" id="skillTreeModal" className="modal-toggle" />
      <label htmlFor="skillTreeModal" className={`modal cursor-pointer`}>
        <label className="modal-box relative" htmlFor="">
          <div className="flex justify-center items-center relative">
            <h2 className="text-xl text-center">Skill Tree</h2>
            <Tippy
              interactive={true}
              allowHTML={true}
              content={
                <div className="rounded-xl bg-accent text-accent-content p-1 flex flex-col items-center justify-center">
                  <div className="form-control items-center">
                    <label htmlFor="" className="label">
                      <span>Show Advanced Descriptions</span>
                    </label>
                    <input
                      type="checkbox"
                      className="toggle"
                      checked={showExplanations}
                      onChange={() => setShowExplanations(!showExplanations)}
                    />
                  </div>
                </div>
              }
            >
              <figure className="self-end absolute right-0">
                <Image
                  src={SettingsIcon.src}
                  alt={"Skill Tree Settings"}
                  height={32}
                  width={32}
                />
              </figure>
            </Tippy>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center items-center  gap-2">
              <Image width={32} height={32} src={"/skillPoint32x32.png"} />
              <span>{skillPointsCount} Skill Points</span>
            </div>
            <h4 className="text-lg text-gray-500 text-center">
              To gain more skill points buy every upgrade 10 times
            </h4>
          </div>
          <div className="container w-full aspect-square bg-primary rounded-2xl relative">
            <SkillTree showExplanations={showExplanations} />
          </div>
        </label>
      </label>
    </>
  );
};
