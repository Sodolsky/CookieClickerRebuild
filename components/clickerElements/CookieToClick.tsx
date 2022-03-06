import { useDispatch } from "react-redux";
import { addCookie } from "../../redux/cookieReducer";
import Image from "next/image";
import CoockieImage from "../../public/cookie.png";
// export interface CookieToClickProps {
//   setCookieCount: React.Dispatch<React.SetStateAction<number>>;
// }
export const CookieToClick: React.FC = () => {
  const dispatch = useDispatch();
  const handleClickIncrementation = () => {
    dispatch(addCookie(1));
  };
  return (
    <Image
      src={CoockieImage}
      className={"cursor-pointer transition-all"}
      onClick={handleClickIncrementation}
    />
  );
};
