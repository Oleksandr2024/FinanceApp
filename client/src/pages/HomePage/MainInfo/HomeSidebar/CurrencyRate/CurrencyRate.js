import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrencyRate } from "../../../../../store/toolSlice";
import { fetchCurrencyRate } from "./currencyApi";
import styles from "./CurrencyRate.module.css";

const CurrencyRate = ({ darkMode }) => {
  const [conversionRate, setConversionRate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const usdToUahRate = await fetchCurrencyRate();

      if (usdToUahRate) {
        setConversionRate(usdToUahRate);
        dispatch(setCurrencyRate(usdToUahRate));
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {conversionRate ? (
        <p className={`${styles.currency_rate} ${darkMode ? styles.dark : ""}`}>
          1 USD $ = {conversionRate} UAH ₴
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CurrencyRate;
