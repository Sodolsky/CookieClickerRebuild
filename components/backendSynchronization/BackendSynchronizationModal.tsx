import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SynchronizeIcon from "../../public/synchronize.png";
import { SignInForm } from "./SignInForm";
export const BackendSynchronizationModal = () => {
  const dispatch = useDispatch();
  const [isUserLoggedIn, setisUserLoggedIn] = useState<boolean>(false);
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
          {!isUserLoggedIn ? (
            <SignInForm setIsUserLoggedIn={setisUserLoggedIn} />
          ) : (
            <div>You are logged in</div>
          )}
        </label>
      </label>
    </>
  );
};
