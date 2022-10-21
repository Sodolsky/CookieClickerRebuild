import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";

export type authStatusTypes = "loading" | "ready";
export const useAuthStatus = () => {
  const [authStatus, setAuthStatus] = useState<authStatusTypes>("loading");
  auth.onAuthStateChanged((userData) => {
    setAuthStatus("ready");
  });
  return { authStatus, auth };
};
