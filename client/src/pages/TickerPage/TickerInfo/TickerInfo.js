import {
  getNameFromAbbreviation,
  getInfoAboutCompany,
} from "../../../utils/tools";
import styles from "./TickerInfo.module.css";
import clsx from "clsx";

const TickerInfo = ({ darkMode, ticker }) => {
  const tickerName = getNameFromAbbreviation(ticker);

  return (
    <section
      data-testid="ticker-info"
      className={clsx(styles.ticker_page_info, { [styles.dark]: darkMode })}
    >
      <h1>{tickerName}</h1>
      <p
        className={clsx(styles.ticker_page_company_description, {
          [styles.dark]: darkMode,
        })}
      >
        {getInfoAboutCompany(ticker)}
      </p>
    </section>
  );
};

export default TickerInfo;
