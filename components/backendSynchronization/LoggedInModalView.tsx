import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { setBaseStateOfAuthAndBackendReducer } from "../../redux/authAndBackendReducer";
import { setReducerDataFromFirebaseObject } from "../../redux/gameLogicReducer";
import { RootState } from "../../redux/store";
import { clearStats } from "../../redux/userStatsReducer";
import { baseGameLogicObject } from "../../utils/hooks/useConvertDataToFirebaseObject";
import {
  saveUserDocumentInDatabase,
  saveUserUtilsInDatabase,
} from "./SignInForm";
import { utilityObject } from "../../utils/interfaces";
interface LoggedInModalViewProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LoggedInModalView: React.FC<LoggedInModalViewProps> = ({
  setAuth,
}) => {
  const dispatch = useDispatch();
  const backendData = useSelector((state: RootState) => state.authAndBackend);
  const userStats = useSelector((state: RootState) => state.userStats);
  const holyCrossBonuses = useSelector(
    (state: RootState) => state.holyCross.currentBonuses
  );
  const wheelOfFortuneBonus = useSelector(
    (state: RootState) => state.wheelOfFortune.currentBonus
  );
  const performance = useSelector((state: RootState) => state.performance);
  //This component is representing the user view when he is auther
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <span className="text-xl text-green-400">
        Welcome {backendData.userEmail} 😊
      </span>
      <span>You are logged in</span>
      <button
        className="btn-square btn btn-md"
        onClick={async () => {
          try {
            const utilityObject: utilityObject = {
              userStats: userStats,
              holyCrossBonuses: holyCrossBonuses,
              performance: performance,
              wheelOfFortuneBonus: wheelOfFortuneBonus,
            };
            await saveUserDocumentInDatabase(
              backendData.userEmail as string,
              backendData.firebaseObject
            );
            await saveUserUtilsInDatabase(
              backendData.userEmail as string,
              utilityObject
            );
            await auth.signOut();
            dispatch(setBaseStateOfAuthAndBackendReducer());
            dispatch(setReducerDataFromFirebaseObject(baseGameLogicObject));
            setAuth(false);
            dispatch(clearStats());
            localStorage.clear();
          } catch (error) {
            toast.error("We couldn't sign you out, sorry try again later!");
          }
        }}
      >
        Log Out
      </button>
    </div>
  );
};
