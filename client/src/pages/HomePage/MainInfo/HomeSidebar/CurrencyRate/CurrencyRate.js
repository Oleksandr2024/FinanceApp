import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrencyRate } from "../../../../../store/toolSlice";
import { fetchCurrencyRate } from "./currencyApi";
import styles from "./CurrencyRate.module.css";
import clsx from "clsx";

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
  }, [dispatch]);

  return (
    <>
      {conversionRate ? (
        <p className={clsx(styles.currency_rate, { [styles.dark]: darkMode })}>
          1 USD $ = {conversionRate} UAH ₴
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CurrencyRate;
