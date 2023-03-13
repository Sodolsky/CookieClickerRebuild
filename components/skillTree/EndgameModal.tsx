import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import EternityIcon from "../../public/eternity64x64.png";
interface EndgameModalProps {
  setIsEndGameActive: Dispatch<SetStateAction<boolean>>;
}
export const EndgameModal: React.FC<EndgameModalProps> = ({
  setIsEndGameActive,
}) => {
  return (
    <>
      <label htmlFor="resetModal">
        <figure className={`cursor-pointer`}>
          <Image src={EternityIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="resetModal" />

      <label htmlFor="resetModal" className={`modal`}>
        <div className="modal-box">
          <div className="flex justify-center items-center flex-col">
            <span className="text-center text-xl text-red-500">
              Do you want to start endgame event? Starting event will stop your
              current progress and have permament consequences!
            </span>
            <button
              className="CoolButton"
              onClick={() => setIsEndGameActive(true)}
            >
              Start Endgame Event
            </button>
          </div>
        </div>
      </label>
    </>
  );
};
