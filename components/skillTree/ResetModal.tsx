import { is } from "immer/dist/internal";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import ResetIcon from "../../public/reset.png";
import { RootState } from "../../redux/store";
import { singleSkillTreeNode } from "../../utils/interfaces";
export interface ResetModalProps {
  resetGameLogic: (skillPointsCount: number) => void;
}
export const ResetModal: React.FC<ResetModalProps> = ({ resetGameLogic }) => {
  const isQPBought = useSelector(
    (state: RootState) =>
      state.gameLogic.skillTreeLogic.skillTreeNodes.find(
        (x) => x.name === "quantumPhysics"
      ) as singleSkillTreeNode
  ).wasBought;
  return (
    <>
      <label htmlFor="resetModal">
        <figure
          className={`absolute bottom-24 right-2 md:top-24 md:right-4 cursor-pointer`}
        >
          <Image src={ResetIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="resetModal" />

      <label htmlFor="resetModal" className={`modal`}>
        <div className="modal-box bg-black text-white">
          <div className="flex justify-center items-center flex-col gap-1">
            <span>Thanks For Playing The Game</span>
            <button
              className="btn"
              onClick={() => resetGameLogic(isQPBought ? 60 : 30)}
            >
              Reset
            </button>
          </div>
        </div>
      </label>
    </>
  );
};
