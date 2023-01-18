import Image from "next/image";
import EternityIcon from "../../public/eternity64x64.png";
export const EndgameModal: React.FC = () => {
  return (
    <>
      <label htmlFor="resetModal">
        <figure className={`cursor-pointer`}>
          <Image src={EternityIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="resetModal" />

      <label htmlFor="resetModal" className={`modal`}>
        <div className="modal-box">ENDGAME</div>
      </label>
    </>
  );
};
