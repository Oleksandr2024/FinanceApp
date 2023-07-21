import { NavLink } from "react-router-dom";
import styles from "./TickerChartElements.module.css";
import { selectCurrencyRate } from "../../../../store/toolSlice";
import { useSelector } from "react-redux";
import clsx from "clsx";

const TickerChartElements = ({
  changePercent,
  price,
  change,
  currency,
  darkMode,
}) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let currentDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  const currentRate = useSelector(selectCurrencyRate);

  return (
    <div>
      <section
        className={clsx(styles.back_button, { [styles.dark]: darkMode })}
      >
        <NavLink to="/">
          <span>Go back to list</span>
        </NavLink>
      </section>
      <section
        className={clsx(styles.chart_elements, { [styles.dark]: darkMode })}
      >
        <h3>
          {currency === "USD" ? (
            !price ? (
              <p
                className={clsx(styles.alert_paragraph, {
                  [styles.dark]: darkMode,
                })}
              >
                "Start tracking tickers again!"
              </p>
            ) : (
              `$ ${price}`
            )
          ) : (
            "₴ " + (price * currentRate).toFixed(0)
          )}
        </h3>
        <span
          style={{
            color: !changePercent
              ? darkMode
                ? "rgb(237, 137, 61)"
                : "rgb(174, 97, 76)"
              : changePercent > 0
              ? "#01950d"
              : "red",
            fontWeight: "bold",
          }}
        >
          {!changePercent
            ? "loading..."
            : changePercent && changePercent > 0
            ? changePercent + "% 📉"
            : changePercent + "% 📈"}
        </span>
        <span>
          change:{" "}
          {currency === "USD"
            ? !change
              ? "loading"
              : "$ " + change
            : "₴ " + Math.floor(change * 37)}
        </span>
      </section>
      <p className={clsx(styles.chart_date, { [styles.dark]: darkMode })}>
        {currentDate} UTC-2 {currency} NASDAQ
      </p>
    </div>
  );
};

export default TickerChartElements;
