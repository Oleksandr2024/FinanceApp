import {
  getNameFromAbbreviation,
  getInfoAboutCompany,
} from "../../../utils/tools";
import styles from "./TickerInfo.module.css";

const TickerInfo = ({ darkMode, ticker }) => {
  const tickerName = getNameFromAbbreviation(ticker);

  return (
    <section
      data-testid="ticker-info"
      className={`${styles.ticker_page_info} ${darkMode ? styles.dark : ""}`}
    >
      <h1>{tickerName}</h1>
      <p
        className={`${styles.ticker_page_company_description} ${
          darkMode ? styles.dark : ""
        }`}
      >
        {getInfoAboutCompany(ticker)}
      </p>
    </section>
  );
};

export default TickerInfo;
