import { useRef, useEffect } from "react";

export const EndgameView = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef]);
  return (
    <div className="h-screen w-screen bg-black">
      <video
        ref={videoRef}
        className="h-full w-full"
        onEnded={() => console.log("video ended")}
      >
        <source src="galaxyVideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
