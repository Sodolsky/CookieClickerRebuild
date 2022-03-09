import { useDispatch, useSelector } from "react-redux";
import { addCookie } from "../../redux/cookieReducer";
import Image from "next/image";
import CoockieImage from "../../public/cookie.png";
import { RootState } from "../../redux/store";
// export interface CookieToClickProps {
//   setCookieCount: React.Dispatch<React.SetStateAction<number>>;
// }
export const CookieToClick: React.FC = () => {
  const CPC = useSelector((state: RootState) => state.cookie.CPC);
  const dispatch = useDispatch();
  const handleClickIncrementation = () => {
    dispatch(addCookie(CPC));
  };
  return (
    <Image
      src={CoockieImage}
      className={"cursor-pointer transition-all"}
      onClick={handleClickIncrementation}
    />
  );
};
