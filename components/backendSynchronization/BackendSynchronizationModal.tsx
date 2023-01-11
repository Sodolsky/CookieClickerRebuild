import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import SynchronizeIcon from "../../public/synchronize.png";
import { setAuthStatus } from "../../redux/authAndBackendReducer";
import { RootState } from "../../redux/store";
import { LoggedInModalView } from "./LoggedInModalView";
import { LogInForm } from "./LogInForm";
export const BackendSynchronizationModal = () => {
  //? Syncronizing with backend should work like this, if user doesn't have an account his progress will be stored in localStorage if he craetes one firebase document is created with his current progress that will be updated every 1 minute and pulled every time he visits the webpage and is authed. When he decides to log out tho progress will be resetted until he auths again.
  const dispatch = useDispatch();
  const [userDataIsReady, setUserDataIsReady] = useState<boolean>(true);
  const [isUserAuthed, setIsUserAuthed] = useState<boolean>(false);
  const backendData = useSelector((state: RootState) => state.authAndBackend);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUserAuthed(true);
      dispatch(setAuthStatus(true));
    } else {
      setIsUserAuthed(false);
      dispatch(setAuthStatus(false));
    }
    setUserDataIsReady(true);
  });
  return (
    <>
      <label htmlFor="BackendModal">
        <figure className={` cursor-pointer`}>
          <Image src={SynchronizeIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="BackendModal" />
      <label htmlFor="BackendModal" className={`modal`}>
        <label className="modal-box relative bg-white">
          {userDataIsReady ? (
            isUserAuthed && backendData.userEmail ? (
              <LoggedInModalView setAuth={setIsUserAuthed} />
            ) : (
              <LogInForm setAuth={setIsUserAuthed} />
            )
          ) : (
            <span>Loading ...</span>
          )}
        </label>
      </label>
    </>
  );
};
