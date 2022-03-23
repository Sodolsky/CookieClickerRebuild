import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
interface ImageSettings {
  pulseImage: boolean;
  showImage: boolean;
}
export const EternalTalk = () => {
  const [showAndPulseImage, setShowAndPuLseImage] = useState<ImageSettings>({
    pulseImage: false,
    showImage: false,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const shopItems = useSelector(
    (state: RootState) => state.gameLogic.shopItems
  );
  useEffect(() => {
    const skillTreeUpgrade = shopItems.find(
      (x) => x.name === "unlockSkillTree"
    );
    skillTreeUpgrade?.wasBought &&
      setShowAndPuLseImage({ pulseImage: true, showImage: true });
  }, [shopItems]);
  const showEternalTalk = () => {
    setShowModal(true);
    setShowAndPuLseImage({ pulseImage: false, showImage: true });
  };
  return (
    <>
      <figure
        className={`absolute bottom-2 left-2 md:top-4 md:left-4 cursor-pointer ${
          showAndPulseImage.pulseImage && "animate-pulse "
        } ${showAndPulseImage.showImage ? "block" : "hidden"}`}
        onClick={showEternalTalk}
      >
        <Image src={"/eternalTalk.png"} width={64} height={64} />
      </figure>
      <div className={`modal ${showModal && "modal-open"}`}>
        <div className="modal-box bg-black text-white">
          <div className="flex justify-center items-center">
            <figcaption className={`${showModal && "EternalTalk-FadeInImage"}`}>
              <Image src={"/upgrade10.png"} width={64} height={64} />
            </figcaption>
            <div className="divider"></div>
          </div>
          <p className={`${showModal && "EternalTalk-FadeInText"}`}>Chuj </p>
          <div className="divider"></div>
          <div className="modal-action"></div>
        </div>
      </div>
    </>
  );
};
