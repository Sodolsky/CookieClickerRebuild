import { useRef, useEffect, useState, FC } from "react";
import { ImageWithTextLines } from "./ImageWithTextLines";
import { SetStateWrapper } from "../../utils/interfaces";
interface animationObject {
  fadeOutGalaxy: boolean;
  fadeInEternal: boolean;
}
const baseAnimationObject: animationObject = {
  fadeOutGalaxy: false,
  fadeInEternal: false,
};
interface EndgameViewProps {
  setRenderEndgameMinigame: SetStateWrapper<boolean>;
}
export const EndgameView: FC<EndgameViewProps> = ({
  setRenderEndgameMinigame,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const defaultFadeOutDuration = 500;
  const [animationObject, setAnimationObject] =
    useState<animationObject>(baseAnimationObject);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.playbackRate = 7;
    }
  }, [videoRef]);

  const handleGalaxyEternalTransition = () => {
    setAnimationObject((prev) => ({ ...prev, fadeOutGalaxy: true }));
    setTimeout(() => {
      setAnimationObject((prev) => ({ ...prev, fadeInEternal: true }));
    }, defaultFadeOutDuration);
  };
  return (
    <div
      className="h-screen w-screen bg-black flex justify-center overflow-hidden"
      ref={containerRef}
    >
      {animationObject.fadeInEternal ? (
        <ImageWithTextLines
          setRenderEndgameMinigame={setRenderEndgameMinigame}
        />
      ) : (
        <video
          ref={videoRef}
          className={`h-full w-full opacity-100 duration-${defaultFadeOutDuration} z-0 ${
            animationObject.fadeOutGalaxy && "opacity-0"
          }  transition-opacity ${animationObject.fadeInEternal && "hidden"}`}
          onEnded={handleGalaxyEternalTransition}
        >
          <source src="galaxyVideo.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
};
