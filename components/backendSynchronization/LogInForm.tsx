import { signInWithEmailAndPassword } from "firebase/auth";
import nprogress from "nprogress";
import nProgress from "nprogress";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import {
  defaultDataValidity,
  defaultFormData,
  formDataInterface,
  formDataValidityInterface,
  SignInForm,
} from "./SignInForm";
interface LogInFormProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LogInForm: React.FC<LogInFormProps> = ({ setAuth }) => {
  const [formData, setFormData] = useState<formDataInterface>(defaultFormData);

  const [showSignIn, setShowSignIn] = useState<boolean>(false);
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
    const isPasswordValid = formData.password.length > 0;

    if (!isPasswordValid) {
      toast.error("Fill out your password field!");
      return setFormDataValidityOutline((prev) => ({
        ...prev,
        password: true,
      }));
    }
    if (!isEmailValid) {
      toast.error("Provide us with proper email!");
      return setFormDataValidityOutline((prev) => ({ ...prev, email: true }));
    }
    nProgress.start();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        setAuth(true);
        nprogress.done();
        toast.success("You have succesfuly logged in!");
      })
      .catch((error) => {
        nprogress.done();
        toast.error(error.message);
      });
  };
  return !showSignIn ? (
    <div className="flex items-center justify-center flex-col gap-2">
      <h1 className="text-2xl font-bold text-center">Log In</h1>
      <span className="text-center text-gray-500">Log In to your account!</span>
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
        Log In
      </button>
      <span
        className="text-center text-blue-500 cursor-pointer hover:animate-pulse transition-opacity"
        onClick={() => setShowSignIn(true)}
      >
        Don't have a account? Create one to synchronize your progress across all
        devices.
      </span>
    </div>
  ) : (
    <SignInForm setShowSignIn={setShowSignIn} />
  );
};
