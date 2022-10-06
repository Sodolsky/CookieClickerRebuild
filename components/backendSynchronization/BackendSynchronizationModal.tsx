import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import SynchronizeIcon from "../../public/synchronize.png";
import { LoggedInModalView } from "./LoggedInModalView";
import { LogInForm } from "./LogInForm";
export const BackendSynchronizationModal = () => {
  //? Syncronizing with backend should work like this, if user doesn't have an account his progress will be stored in localStorage if he craetes one firebase document is created with his current progress that will be updated every 1 minute and pulled every time he visits the webpage and is authed. When he decides to log out tho progress will be resetted until he auths again.
  const dispatch = useDispatch();
  const [userDataIsReady, setUserDataIsReady] = useState<boolean>(true);
  const [isUserAuthed, setIsUserAuthed] = useState<boolean>(false);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUserAuthed(true);
    } else {
      setIsUserAuthed(false);
    }
    setUserDataIsReady(true);
  });
  return (
    <>
      <label htmlFor="BackendModal">
        <figure
          className={`absolute bottom-24 right-20 md:top-24 md:right-40 cursor-pointer`}
        >
          <Image src={SynchronizeIcon.src} width={64} height={64} />
        </figure>
      </label>
      <input type="checkbox" className="modal-toggle" id="BackendModal" />
      <label htmlFor="BackendModal" className={`modal`}>
        <label className="modal-box relative bg-white">
          {userDataIsReady ? (
            isUserAuthed ? (
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
