import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PerformanceIcon from "../../public/performance.png";
import {
  changeVolume,
  switchAnimatedBackground,
  switchClickParticles,
} from "../../redux/performanceReducer";
import { RootState } from "../../redux/store";
import { RangeSlider } from "./RangeSlider";
export const PerformanceModal = () => {
  const performanceState = useSelector((state: RootState) => state.performance);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!performanceState.disableAnimatedBackground) {
      document.body.classList.add("animatedBodyBG");
    } else {
      document.body.classList.remove("animatedBodyBG");
    }
  }, [performanceState]);

  return (
    <>
      <label htmlFor="PerformanceModal">
        <figure
          className={`absolute bottom-24 right-20 md:top-24 md:right-20 cursor-pointer`}
        >
          <Image src={PerformanceIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="PerformanceModal" />

      <label htmlFor="PerformanceModal" className={`modal`}>
        <div className="modal-box bg-white">
          <h1 className="text-2xl font-bold text-center">
            Performance Options
          </h1>
          <div className="form-control items-center">
            <label htmlFor="" className="label">
              <span>Disable Animated Background</span>
            </label>
            <input
              type="checkbox"
              className="toggle"
              checked={performanceState.disableAnimatedBackground}
              onChange={() => dispatch(switchAnimatedBackground())}
            />
          </div>
          <div className="divider"></div>
          <div className="form-control items-center">
            <label htmlFor="" className="label">
              <span>Disable Click Particles</span>
            </label>
            <input
              type="checkbox"
              className="toggle"
              checked={performanceState.disableParticlesFromClicking}
              onChange={() => dispatch(switchClickParticles())}
            />
          </div>
          <div className="divider"></div>
          <RangeSlider
            text="Sound Volume"
            onChangeFunc={(e) => {
              dispatch(
                changeVolume({
                  type: "sound",
                  newValue: parseInt(e.currentTarget.value),
                })
              );
            }}
            value={performanceState.soundVolume}
          />
          <div className="divider"></div>
          <RangeSlider
            text="Music Volume"
            onChangeFunc={(e) => {
              dispatch(
                changeVolume({
                  type: "music",
                  newValue: parseInt(e.currentTarget.value),
                })
              );
            }}
            value={performanceState.musicVolume}
          />
        </div>
      </label>
    </>
  );
};
