import { useSelector } from "react-redux";
import { selectTheme } from "../../../store/toolSlice";
import styles from "./MainInfo.module.css";
import clsx from "clsx";

import Sidebar from "./HomeSidebar/Sidebar";
import TickersPriceInfo from "./TickersPriceInfo/TickersPriceInfo";
import News from "./News/News";

const MainInfo = ({ shouldShowTickers }) => {
  const darkMode = useSelector(selectTheme);

  return (
    <div
      data-testid="main-info"
      className={clsx(styles.main_info, { [styles.dark]: darkMode })}
    >
      <Sidebar darkMode={darkMode} shouldShowTickers={shouldShowTickers} />
      {shouldShowTickers ? (
        <TickersPriceInfo darkMode={darkMode} />
      ) : (
        <News darkMode={darkMode} />
      )}
    </div>
  );
};

export default MainInfo;
