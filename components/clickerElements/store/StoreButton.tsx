import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
export const StoreButton = () => {
  const cookieCount = useSelector(
    (state: RootState) => state.cookie.cookieCount
  );
  const [fadeInStore, setFadeInStore] = useState<boolean>(false);
  const [showStore, setShowStore] = useState<boolean>(false);
  useEffect(() => {
    const wasStoreDiscovered = localStorage.getItem("storeDiscovered");
    if (wasStoreDiscovered === "true") return setShowStore(true);
    if (!wasStoreDiscovered) localStorage.setItem("storeDiscovered", "false");
    if (cookieCount >= 200) {
      setFadeInStore(true);
      localStorage.setItem("storeDiscovered", "true");
      setShowStore(true);
    }
  }, [cookieCount]);
  return (
    <>
      <label htmlFor="my-modal">
        <figure
          className={`${
            fadeInStore && "animate-pulse"
          } absolute  bottom-2 right-2 md:top-4 md:right-4 cursor-pointer transition-opacity ${
            showStore ? "block" : "hidden"
          } duration-1000`}
          onClick={() => setFadeInStore(false)}
        >
          <Image src={"/store.png"} width={64} height={64} alt="Store" />
        </figure>
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className={`modal cursor-pointer`}>
        <label className="modal-box relative" htmlFor="">
          Tu będzie sklep
        </label>
      </label>
    </>
  );
};
