import { auth } from "../../firebase";
interface LoggedInModalViewProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LoggedInModalView: React.FC<LoggedInModalViewProps> = ({
  setAuth,
}) => {
  //This component is representing the user view when he is auther
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <span>You are logged in</span>
      <button
        className="btn-square btn btn-md"
        onClick={() => {
          auth.signOut();
          setAuth(false);
        }}
      >
        Log Out
      </button>
    </div>
  );
};
