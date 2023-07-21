import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleShowTickers,
  addTickerToWatchingGroup,
  selectedTickers,
  setWatchingGroup,
} from "../../../../store/toolSlice";
import { connectSocket, disconnectServer } from "../../../../store/dataSlice";
import SmallTicker from "./SmallTicker/SmallTicker";
import IntervalSection from "./IntervalSection/IntervalSection";
import CurrencyRate from "./CurrencyRate/CurrencyRate";
import styles from "./Sidebar.module.css";
import clsx from "clsx";

const Sidebar = ({ darkMode, shouldShowTickers }) => {
  const dispatch = useDispatch();
  const userSelectedTickers = useSelector(selectedTickers);
  const [selectedTicker, setSelectedTicker] = useState("");
  const [alertText, setAlertText] = useState("");
  const buttonShowRef = useRef(null);
  const buttonAddRef = useRef(null);

  // Update local storage when userSelectedTickers changes
  useEffect(() => {
    localStorage.setItem(
      "usersWatchingGroup",
      JSON.stringify(userSelectedTickers)
    );
  }, [userSelectedTickers]);

  // Load initial watching group data from local storage on component mount
  useEffect(() => {
    const storedWatchingGroup = localStorage.getItem("usersWatchingGroup");
    if (storedWatchingGroup) {
      dispatch(setWatchingGroup(JSON.parse(storedWatchingGroup)));
    }
  }, [dispatch]);

  //toogle show tickers/show news button&function
  const startOrStopTracklingTickers = (trackingState) => {
    //initial state when user sees news but pushes the button to trackle tickers
    if (!trackingState) {
      dispatch(toggleShowTickers()); //becomes true
      dispatch(connectSocket()); //connect to server and start trackle tickers' prices
      buttonShowRef.current.blur(); // to remove focus from the button
      //to stop trackling tickers and move to the news page
    } else if (trackingState) {
      dispatch(toggleShowTickers()); //becomes false
      dispatch(disconnectServer()); //stop socket connection and tickers trackle
      buttonShowRef.current.blur(); // to remove focus from the button
    }
  };

  const tickerOptions = [
    "**AAPL**",
    "**GOOGL**",
    "**MSFT**",
    "**AMZN**",
    "**FB**",
    "**TSLA**",
  ];

  const optionValues = tickerOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  //here we need to sort existing tracking tickers to be in order like in table section (TickersPriceInfo) and also for testing needs
  const desiredOrder = [
    "**AAPL**",
    "**GOOGL**",
    "**MSFT**",
    "**AMZN**",
    "**FB**",
    "**TSLA**",
  ];
  //create new array in a way of copying userSelectedTickers
  const orderedTickersInList = [...userSelectedTickers];

  // Sort the orderedTickersInList based on the desiredOrder
  orderedTickersInList.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a);
    const indexB = desiredOrder.indexOf(b);
    return indexA - indexB;
  });

  let smallTickerElements;
  if (!Array.isArray(userSelectedTickers)) {
    // Handle the case when userSelectedTickers is not an array
    return null;
  } else {
    smallTickerElements = orderedTickersInList.map((elem, index) => (
      <SmallTicker
        key={index}
        darkMode={darkMode}
        ticker={elem}
        setAlertText={setAlertText}
      />
    ));
  }

  const addTicker = (ticker) => {
    const isExist = userSelectedTickers.includes(ticker);
    if (!ticker) {
      setAlertText("Choose ticker");
    } else if (isExist) {
      setAlertText("Item already added");
    } else {
      dispatch(addTickerToWatchingGroup(ticker));
      setSelectedTicker("");
      setAlertText("");
      buttonAddRef.current.blur(); // to remove focus from the button
    }
  };

  return (
    <div
      data-testid="sidebar"
      className={clsx(styles.sidebar, { [styles.dark]: darkMode })}
    >
      <CurrencyRate darkMode={darkMode} />
      <button
        ref={buttonShowRef}
        className={clsx(styles.sidebar_show_button, {
          [styles.dark]: darkMode,
        })}
        onClick={() => startOrStopTracklingTickers(shouldShowTickers)}
      >
        {shouldShowTickers ? "Show news" : "Show tickers"}
      </button>
      {shouldShowTickers && (
        <section>
          <h6>Your watching group:</h6>
          <form onSubmit={(e) => e.preventDefault()}>
            <select
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value)}
            >
              <option></option>
              {optionValues}
            </select>
            <button
              ref={buttonAddRef}
              className={clsx(styles.sidebar_add_button, {
                [styles.dark]: darkMode,
              })}
              onClick={() => addTicker(selectedTicker)}
            >
              Add
            </button>
            <p data-testid="alert-text" className={styles.sidebar_alert}>
              {alertText && alertText}
            </p>
          </form>
          <section className={styles.small_elements}>
            {smallTickerElements}
          </section>
          <IntervalSection darkMode={darkMode} />
        </section>
      )}
    </div>
  );
};

export default Sidebar;
