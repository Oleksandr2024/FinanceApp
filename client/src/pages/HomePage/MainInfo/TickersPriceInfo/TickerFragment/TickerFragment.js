import { NavLink } from "react-router-dom";
import {
  getNameFromAbbreviation,
  getImageSource,
  getTickerPrice,
} from "../../../../../utils/tools";
import styles from "./TickerFragment.module.css";
import clsx from "clsx";

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
      className={clsx(styles.ticker_fragment, { [styles.dark]: darkMode })}
    >
      <NavLink to={lowerCasePath}>
        <div className={styles.ticker_fragment_main}>
          <img src={getImageSource(ticker.ticker)} alt={`${ticker}`} />
          <section
            className={clsx(styles.ticker_fragment_name, {
              [styles.dark]: darkMode,
            })}
          >
            <h3 className={styles.tickerName}>{ticker.ticker}</h3>
            <p>{name}</p>
          </section>
        </div>

        <p>{tickerPrice}</p>
        <p>{tickerChangePrice}</p>
        <p
          style={{
            color: ticker.change_percent > 0 ? "#42C102" : "#FF0000",
          }}
        >
          {ticker.change_percent + "%"}
        </p>
      </NavLink>
    </section>
  );
};

export default TickerFragment;
