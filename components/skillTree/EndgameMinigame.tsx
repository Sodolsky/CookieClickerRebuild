import { useEffect, useRef } from "react";

export const EndgameMinigame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const context = canvas.getContext("2d");
      if (context) {
        // Draw something on the canvas
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [canvasRef]);

  return (
    <canvas ref={canvasRef} className="w-screen h-screen">
      Your browser does not support the HTML canvas element.
    </canvas>
  );
};
