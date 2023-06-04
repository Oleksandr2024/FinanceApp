import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrency, toggleCurrency } from "../../../store/toolSlice";
import styles from "./CurrencyComponent.module.css";

const CurrencyComponent = ({ darkMode }) => {
  const currency = useSelector(selectCurrency);
  const dispatch = useDispatch();
  const selectRef = useRef(null);

  //to hide a focus ("light border") from a select form after selection is being made by user
  const changeCurrency = () => {
    dispatch(toggleCurrency());
    selectRef.current.blur();
  };

  return (
    <select
      ref={selectRef}
      className={`${styles.header_select} ${darkMode ? styles.dark : ""}`}
      value={currency}
      onChange={() => changeCurrency()}
    >
      <option value={"USD"}>USD</option>
      <option value={"UAH"}>UAH</option>
    </select>
  );
};

export default CurrencyComponent;
