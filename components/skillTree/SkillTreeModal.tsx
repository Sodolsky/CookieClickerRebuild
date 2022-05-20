import Image from "next/image";
import { SkillTree } from "./SkillTree";
export const SkillTreeModal = () => {
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
          <h2 className="text-xl text-center">SkillTree</h2>
          <div className="container w-full aspect-square bg-primary rounded-2xl relative">
            <SkillTree />
          </div>
        </label>
      </label>
    </>
  );
};
