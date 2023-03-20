import { useRef, useEffect, useState } from "react";
interface animationObject {
  fadeOutGalaxy: boolean;
}
const baseAnimationObject: animationObject = {
  fadeOutGalaxy: false,
};
export const EndgameView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animationObject, setAnimationObject] =
    useState<animationObject>(baseAnimationObject);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef]);
  return (
    <div className="h-screen w-screen bg-black">
      <video
        ref={videoRef}
        className={`h-full w-full opacity-100 duration-500 ${
          animationObject.fadeOutGalaxy && "opacity-0"
        } transition-opacity`}
        onEnded={() =>
          setAnimationObject((prev) => ({ ...prev, fadeOutGalaxy: true }))
        }
      >
        <source src="galaxyVideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
