import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import C1 from "../../public/c1.jpg";
import C2 from "../../public/c2.jpg";
import { SkillTreeImagesCarousel } from "./SkillTreeImagesCarousel";
interface ImageSettings {
  pulseImage: boolean;
  showImage: boolean;
}
interface EternalTalkProps {
  resetGameLogic: () => void;
}
export const EternalTalk: React.FC<EternalTalkProps> = ({ resetGameLogic }) => {
  const [showAndPulseImage, setShowAndPuLseImage] = useState<ImageSettings>({
    pulseImage: false,
    showImage: false,
  });
  const [currentStep, setCurrentStep] = useState<1 | 2>(2);
  const [dealOutcome, setDealOutcome] = useState<
    null | "accepted" | "declined"
  >(null);
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
  useEffect(() => {
    if (!dealOutcome) return;
    setShowModal(false);
    setCurrentStep(1);
    setShowAndPuLseImage({ showImage: true, pulseImage: false });
    if (dealOutcome === "accepted") {
      resetGameLogic();
    } else {
      console.log("Declined");
    }
  }, [dealOutcome]);
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
            <figure className={`${showModal && "EternalTalk-FadeInImage"}`}>
              <Image src={"/upgrade10.png"} width={64} height={64} />
            </figure>
            <div className="divider"></div>
          </div>

          {currentStep === 1 && (
            <>
              <p className={`${showModal && "EternalTalk-FadeInText"}`}>
                Thats intresting i did not expect someone to reach this level of
                Power. Let me show you something, just a small fraction of what
                you can become.
              </p>
              <div className="divider"></div>
              <div className="modal-action">
                <button
                  className={`mt-4 CoolButton ${
                    showModal && "EternalTalk-FadeInButton"
                  }`}
                  onClick={() => setCurrentStep(2)}
                >
                  Next
                </button>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <p className={`${showModal && "EternalTalk-FadeInImage"}`}>
                I offer you a deal. I will let you borrow some of my Power in
                exchange for your Cookies.
              </p>
              <div className="divider"></div>
              <div className="EternalTalk-FadeInSkillTreeImage ">
                <SkillTreeImagesCarousel
                  imagesArray={[C1, C2]}
                  altTexts={
                    Array.from({ length: 2 }).fill("Skill Tree") as string[]
                  }
                />
              </div>
              <div className="divider"></div>
              <div className="flex justify-around EternalTalk-FadeInButtons">
                <button
                  className="mt-4 CoolButton bg-red-500"
                  onClick={() => setDealOutcome("declined")}
                >
                  Not yet
                </button>
                <button
                  className="mt-4 CoolButton bg-green-500"
                  onClick={() => setDealOutcome("accepted")}
                >
                  Accept
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
