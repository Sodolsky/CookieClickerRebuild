import React, { useState } from "react";

interface formDataInterface {
  email: string;
  password: string;
}
const defaultFormData: formDataInterface = {
  email: "",
  password: "",
};
interface SignInFormProps {
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SignInForm: React.FC<SignInFormProps> = ({
  setIsUserLoggedIn,
}) => {
  const [formData, setFormData] = useState<formDataInterface>(defaultFormData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleFormSubmiton = () => {};
  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      <span className="text-center text-gray-500">
        Sign In to synchronize your progress across all devices!
      </span>
      <div className="form-control">
        <input
          type="text"
          name="email"
          className="input input-bordered"
          placeholder="Email"
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <input
          type="password"
          name="password"
          className="input input-bordered"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <button className="btn" onClick={() => handleFormSubmiton()}>
        Submit
      </button>
    </div>
  );
};
