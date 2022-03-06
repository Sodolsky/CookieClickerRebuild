import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCookie,
  increaseCPS,
  setInitialCookieCount,
  setInitialCPS,
} from "../redux/cookieReducer";
import { RootState } from "../redux/store";
import { CookieToClick } from "./clickerElements/CookieToClick";
import { CookiesDisplay } from "./layout/CookiesDisplay";
import { Header } from "./layout/Header";

export const MainPage = () => {
  const cookieCount = useSelector(
    (state: RootState) => state.cookie.cookieCount
  );
  const CPS = useSelector((state: RootState) => state.cookie.CPS);
  const dispatch = useDispatch();
  const upgradeCPS = () => {
    dispatch(increaseCPS(0.1));
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageCookieCount =
        Number(localStorage.getItem("cookieCount")) ?? 0;
      const localStorageCPSCount = Number(localStorage.getItem("CPS")) ?? 0;
      dispatch(setInitialCookieCount(localStorageCookieCount));
      dispatch(setInitialCPS(localStorageCPSCount));
    }
  }, []);
  useEffect(() => {
    const gameLoopInterval = setInterval(() => dispatch(addCookie(CPS)), 1000);
    return () => clearInterval(gameLoopInterval);
  }, [CPS]);
  return (
    <main className="w-screen">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Header />
        <CookiesDisplay
          cookieCount={Number(cookieCount.toFixed(2))}
          CPS={Number(CPS.toFixed(2))}
        />
        <CookieToClick />
        <button className="btn" onClick={upgradeCPS}>
          Increase CPS
        </button>
      </div>
    </main>
  );
};
