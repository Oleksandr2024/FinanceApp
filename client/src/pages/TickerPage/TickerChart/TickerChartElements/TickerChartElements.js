import { NavLink } from "react-router-dom";
import styles from "./TickerChartElements.module.css";

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

  return (
    <div>
      <section
        className={`${styles.back_button} ${darkMode ? styles.dark : ""} `}
      >
        <NavLink to="/">
          <span>Go back to list</span>
        </NavLink>
      </section>
      <section
        className={`${styles.chart_elements} ${darkMode ? styles.dark : ""}`}
      >
        <h3>
          {currency === "USD" ? (
            !price ? (
              <p
                className={`${styles.alert_paragraph} ${
                  darkMode ? styles.dark : ""
                }`}
              >
                "Start tracking tickers again!"
              </p>
            ) : (
              `$ ${price}`
            )
          ) : (
            "₴ " + (price * 37).toFixed(0)
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
      <p className={`${styles.chart_date} ${darkMode ? styles.dark : ""}`}>
        {currentDate} UTC-2 {currency} NASDAQ
      </p>
    </div>
  );
};

export default TickerChartElements;
