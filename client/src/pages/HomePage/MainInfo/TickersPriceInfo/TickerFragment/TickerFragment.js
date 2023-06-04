import { NavLink } from "react-router-dom";
import {
  getNameFromAbbreviation,
  getImageSource,
  getTickerPrice,
} from "../../../../../utils/tools";
import styles from "./TickerFragment.module.css";

const TickerFragment = ({ ticker, currency, darkMode, currencyRate }) => {
  //get full name from abbreviation (AAPL => Apple)
  const name = getNameFromAbbreviation(ticker.ticker);
  //get ticker price(+tickerChange price) depending on a currency (USD/UAH)
  let tickerPrice = getTickerPrice(
    currency,
    ticker.price.open_price,
    currencyRate
  );
  let tickerChangePrice = getTickerPrice(currency, ticker.change, currencyRate);
  //get endpoint path in url with lowercase letters
  const lowerCasePath = "/tickers/" + ticker.ticker.toLowerCase();

  return (
    <section
      className={`${styles.ticker_fragment} ${darkMode ? styles.dark : ""}`}
    >
      <NavLink to={lowerCasePath}>
        <div className={styles.ticker_fragment_main}>
          <img src={getImageSource(ticker.ticker)} alt={`${ticker}`} />
          <section
            className={`${styles.ticker_fragment_name} ${
              darkMode ? styles.dark : ""
            }`}
          >
            <h3 className={styles.tickerName}>{ticker.ticker}</h3>
            <p>{name}</p>
          </section>
        </div>

        <p>{tickerPrice}</p>
        <p>{tickerChangePrice}</p>
        <p
          style={{
            color: ticker.change_percent > 0 ? "#42C102" : "red",
          }}
        >
          {ticker.change_percent + "%"}
        </p>
      </NavLink>
    </section>
  );
};

export default TickerFragment;
