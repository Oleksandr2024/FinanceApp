import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeTickerFromWatchingGroup } from "../../../../../store/toolSlice";
import { getImageSource } from "../../../../../utils/tools";
import styles from "./SmallTicker.module.css";

const SmallTicker = ({ darkMode, ticker, setAlertText }) => {
  const dispatch = useDispatch();

  let transformName;
  let imageSource;
  if (!ticker) {
    return null;
  } else {
    //get ticker name without ** i.e. "**AAPL**" => "AAPL"
    transformName = ticker.substring(2, ticker.length - 2);
    imageSource = getImageSource(transformName);
  }

  const handleDelete = () => {
    dispatch(removeTickerFromWatchingGroup(ticker));
    setAlertText(""); //sets parent's alert text to ""
  };

  return (
    <section
      className={`${styles.ticker_small_section} ${
        darkMode ? styles.dark : ""
      }`}
    >
      <img src={imageSource} alt=""></img>
      <h4>{ticker}</h4>

      <button
        data-testid="remove-button"
        className={`${styles.ticker_small_section_button} ${
          darkMode ? styles.dark : ""
        }`}
        onClick={() => handleDelete()}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </section>
  );
};

export default SmallTicker;
