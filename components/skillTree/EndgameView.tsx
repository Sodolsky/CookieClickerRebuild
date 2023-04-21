import { useRef, useEffect, useState, FC } from "react";
import { ImageWithTextLines } from "./ImageWithTextLines";
import { SetStateWrapper } from "../../utils/interfaces";
import { EndgameMinigame } from "./EndgameMinigame";
interface animationObject {
  fadeOutGalaxy: boolean;
  fadeInEternal: boolean;
}
const baseAnimationObject: animationObject = {
  fadeOutGalaxy: false,
  fadeInEternal: false,
};

export const EndgameView: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [renderEndgameMinigame, setRenderEndgameMinigame] =
    useState<boolean>(false);
  const defaultFadeOutDuration = 500;
  const [animationObject, setAnimationObject] =
    useState<animationObject>(baseAnimationObject);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.playbackRate = 1;
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
      {renderEndgameMinigame ? (
        <EndgameMinigame />
      ) : animationObject.fadeInEternal ? (
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
