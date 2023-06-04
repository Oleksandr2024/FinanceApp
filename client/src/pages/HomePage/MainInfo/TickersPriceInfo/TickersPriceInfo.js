import {
  generateRandomKey,
  getTickersToDisplay,
} from "../../../../utils/tools";
import { useSelector } from "react-redux";
import { selectAllTickers } from "../../../../store/dataSlice";
import {
  selectCurrency,
  selectedTickers,
  selectCurrencyRate,
} from "../../../../store/toolSlice";
import styles from "./TickersPriceInfo.module.css";

//components
import TickerFragment from "./TickerFragment/TickerFragment";

const TickersPriceInfo = ({ darkMode }) => {
  const tickers = useSelector(selectAllTickers);
  const watchingList = useSelector(selectedTickers);
  const currencyRate = useSelector(selectCurrencyRate);

  const currency = useSelector(selectCurrency);

  let tickersToDisplay;
  if (tickers[0]?.length) {
    tickersToDisplay = getTickersToDisplay(
      tickers[tickers.length - 1],
      watchingList
    ).map((ticker) => (
      <TickerFragment
        key={generateRandomKey()}
        ticker={ticker}
        currency={currency}
        darkMode={darkMode}
        currencyRate={currencyRate}
      />
    ));
  }

  //if user removes all tickers from a watching group, we need to show this paragraph
  const paragraph = (
    <p
      className={`${styles.no_tickers_paragraph} ${
        darkMode ? styles.dark : ""
      }`}
    >
      Oops, looks like you need to add some tickers to your watching group to
      see the info
    </p>
  );

  return (
    <div
      data-testid="tickers-price-info"
      className={`${styles.tickers_price_info} ${darkMode ? styles.dark : ""}`}
    >
      <section
        className={`${styles.tickers_price_info_headings} ${
          darkMode ? styles.dark : ""
        }`}
      >
        <p className={styles.first_p}>&nbsp;&nbsp;&nbsp; Item</p>
        <p className={styles.next_p}>
          Current price {currency === "USD" ? "$" : "₴"}
        </p>
        <p className={styles.next_p}>Change</p>
        <p className={styles.next_p}>Change persent</p>
      </section>
      {tickersToDisplay
        ? tickersToDisplay.length
          ? tickersToDisplay
          : paragraph
        : "Loading..."}
    </div>
  );
};

export default TickersPriceInfo;
