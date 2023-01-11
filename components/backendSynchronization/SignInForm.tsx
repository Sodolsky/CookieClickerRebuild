import React, { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import Image from "next/image";
import BackArrowImage from "../../public/back.png";
import Nprogress from "nprogress";
import { doc, setDoc } from "firebase/firestore";
import { firebaseObjectInterface, utilityObject } from "../../utils/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { useConvertDataToFirebaseObject } from "../../utils/hooks/useConvertDataToFirebaseObject";
import { setUserEmail } from "../../redux/authAndBackendReducer";
export interface formDataInterface {
  email: string;
  password: string;
}
export interface formDataValidityInterface {
  email: boolean;
  password: boolean;
}
export const defaultFormData: formDataInterface = {
  email: "",
  password: "",
};
export const defaultDataValidity: formDataValidityInterface = {
  email: false,
  password: false,
};
interface SignInFormInterface {
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}
export const saveUserDocumentInDatabase = async (
  email: string,
  firebaseObj: firebaseObjectInterface
) => {
  const ref = doc(db, "Users", email);
  await setDoc(ref, firebaseObj, { merge: true });
};
//Todo Add saving user utilities in database
export const saveUserUtilsInDatabase = async (
  email: string,
  utilityObject: utilityObject
) => {
  const ref = doc(db, "UsersUtils", email);
  await setDoc(ref, utilityObject, { merge: true });
};
export const SignInForm: React.FC<SignInFormInterface> = ({
  setShowSignIn,
}) => {
  const { firebaseObject } = useConvertDataToFirebaseObject();
  const [formData, setFormData] = useState<formDataInterface>(defaultFormData);
  const dispatch = useDispatch();
  const [formDataValidityOutline, setFormDataValidityOutline] =
    useState<formDataValidityInterface>(defaultDataValidity);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleFormSubmiton = () => {
    const pattern =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const isEmailValid = pattern.test(formData.email);
    const isPasswordValid = formData.password.length >= 8;
    if (!isEmailValid) {
      toast("Provide us with proper email");
      return setFormDataValidityOutline((prev) => ({ ...prev, email: true }));
    }
    if (!isPasswordValid) {
      toast("Your Password need to have at least 8 characters");
      return setFormDataValidityOutline((prev) => ({
        ...prev,
        password: true,
      }));
    }
    Nprogress.start();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        saveUserDocumentInDatabase(
          userCredential.user.email as string,
          firebaseObject
        );
        dispatch(setUserEmail(userCredential.user.email as string));
        Nprogress.done();
        toast.success(
          "Your account has been created from now on your progress will be saved across all devices!"
        );
      })
      .catch((error) => {
        Nprogress.done();
        toast.error(error.message);
      });
  };
  return (
    <div className="flex items-center justify-center flex-col gap-2 relative">
      <figure
        className="absolute left-2 top-1 cursor-pointer hover:animate-spin transition-all"
        onClick={() => setShowSignIn(false)}
      >
        <Image height={24} width={24} src={BackArrowImage.src} />
      </figure>
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      <span className="text-center text-gray-500">
        Create your account to synchronize your progress across all devices!
      </span>
      <div className="form-control w-3/4">
        <input
          type="text"
          name="email"
          className={`input input-bordered ${
            formDataValidityOutline.email && "input-error"
          }`}
          placeholder="Email"
          onChange={handleChange}
        />
      </div>
      <div className="form-control  w-3/4">
        <input
          type="password"
          name="password"
          className={`input input-bordered ${
            formDataValidityOutline.password && "input-error"
          } `}
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={() => handleFormSubmiton()}>
        Create Account
      </button>
    </div>
  );
};
