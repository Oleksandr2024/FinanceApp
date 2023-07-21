import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllTickers } from "../../store/dataSlice";
import {
  findTickerForPage,
  getLatestGeneratedTickers,
} from "../../utils/tools";
import { selectTheme } from "../../store/toolSlice";
import styles from "./TickerPage.module.css";
import TickerInfo from "./TickerInfo/TickerInfo";
import TickerApexChart from "./TickerChart/TickerApexChart";
import clsx from "clsx";

const TickerPage = () => {
  const tickers = useSelector(selectAllTickers);
  const darkMode = useSelector(selectTheme);
  const { id } = useParams();

  let thisTicker;
  if (tickers.length !== 0) {
    const lastTickerSet = getLatestGeneratedTickers(tickers);
    thisTicker = findTickerForPage(id, lastTickerSet);
  }

  return (
    <div className={clsx(styles.ticker_page, { [styles.dark]: darkMode })}>
      <TickerInfo darkMode={darkMode} ticker={thisTicker?.ticker} />
      <TickerApexChart
        darkMode={darkMode}
        price={thisTicker?.price?.open_price}
        changePercent={thisTicker?.change_percent}
        change={thisTicker?.change}
        ticker={thisTicker?.ticker}
      />
    </div>
  );
};

export default TickerPage;
