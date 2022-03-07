import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseCPS, removeCookies } from "../../redux/cookieReducer";
import { RootState } from "../../redux/store";
import { buyUpgrade } from "../../redux/upgradeReducer";
import { UpgradeInterface } from "../../utils/interfaces";
export const Upgrade: React.FC<UpgradeInterface> = ({
  CookiesPerClickBonus,
  CookiesPerSecondBonus,
  upgradeName,
  cost,
  feeIndex,
  numberOfUpgrades,
}) => {
  const [price, setPrice] = useState<number>(cost);
  useEffect(() => {
    if (numberOfUpgrades > 0) {
      setPrice((cost *= feeIndex * numberOfUpgrades));
    }
  }, [numberOfUpgrades]);
  console.log(price);
  const dispatch = useDispatch();
  const currentCookies = useSelector(
    (state: RootState) => state.cookie.cookieCount
  );
  const upgradeCPS = () => {
    if (currentCookies >= price) {
      dispatch(removeCookies(price));
      dispatch(increaseCPS(CookiesPerClickBonus));
      dispatch(buyUpgrade({ name: upgradeName, number: 1 }));
    } else {
      alert("Nie stac cie!");
    }
  };
  return (
    <button className="btn" onClick={upgradeCPS}>
      Increase CPS {price.toFixed(0)}
    </button>
  );
};
