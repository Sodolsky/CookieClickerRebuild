import Image from "next/image";
import EternalImage from "../../public/eternalone.jpg";
import { useRef, useEffect, useState } from "react";
interface animationObject {
  fadeOutGalaxy: boolean;
  fadeInEternal: boolean;
}
const baseAnimationObject: animationObject = {
  fadeOutGalaxy: false,
  fadeInEternal: true,
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
        className={`h-full w-full opacity-100 duration-500 z-0 ${
          animationObject.fadeOutGalaxy && "opacity-0"
        } transition-opacity`}
        onEnded={() =>
          setAnimationObject((prev) => ({ ...prev, fadeOutGalaxy: true }))
        }
      >
        <source src="galaxyVideo.mp4" type="video/mp4" />
        <Image
          src={EternalImage}
          alt={"Image of The Eternal"}
          className={`opacity-0 z-10 ${
            animationObject.fadeInEternal && "opacity-100 duration-500"
          } `}
          layout={"fill"}
        />
      </video>
    </div>
  );
};
