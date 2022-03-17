import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { StoreItem } from "./StoreItem";
export const Store = () => {
  const cookieCount = useSelector(
    (state: RootState) => state.gameLogic.cookiesLogic.cookieCount
  );
  const shopItems = useSelector(
    (state: RootState) => state.gameLogic.shopItems
  );
  const [fadeInStore, setFadeInStore] = useState<boolean>(false);
  const [showStore, setShowStore] = useState<boolean>(false);

  useEffect(() => {
    const wasStoreDiscovered = localStorage.getItem("storeDiscovered");
    if (wasStoreDiscovered === "true") return setShowStore(true);
    if (!wasStoreDiscovered) localStorage.setItem("storeDiscovered", "false");
    if (cookieCount >= 500) {
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
          <h2 className="text-xl text-center">SHOP</h2>
          <div className="divider"></div>
          <div className="flex flex-col">
            {shopItems.map((x) => (
              <StoreItem {...x} key={x.name} />
            ))}
          </div>
        </label>
      </label>
    </>
  );
};
