import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { setBaseStateOfAuthAndBackendReducer } from "../../redux/authAndBackendReducer";
import { setReducerDataFromFirebaseObject } from "../../redux/gameLogicReducer";
import { RootState } from "../../redux/store";
import { baseGameLogicObject } from "../../utils/hooks/useConvertDataToFirebaseObject";
import { saveUserDocumentInDatabase } from "./SignInForm";
interface LoggedInModalViewProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LoggedInModalView: React.FC<LoggedInModalViewProps> = ({
  setAuth,
}) => {
  const dispatch = useDispatch();
  const backendData = useSelector((state: RootState) => state.authAndBackend);
  //This component is representing the user view when he is auther
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <span>You are logged in</span>
      <button
        className="btn-square btn btn-md"
        onClick={async () => {
          try {
            await saveUserDocumentInDatabase(
              backendData.userEmail as string,
              backendData.firebaseObject
            );
            await auth.signOut();
            dispatch(setBaseStateOfAuthAndBackendReducer());
            dispatch(setReducerDataFromFirebaseObject(baseGameLogicObject));
            setAuth(false);
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
