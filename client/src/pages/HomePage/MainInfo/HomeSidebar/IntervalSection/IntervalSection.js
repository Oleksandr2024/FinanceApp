import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInterval,
  intervalTimeFromStore,
} from "../../../../../store/toolSlice";
import styles from "./IntervalSection.module.css";

const IntervalSection = ({ darkMode }) => {
  const [intervalTime, setIntervalTime] = useState(null);
  const [isIntervalAlertText, setIsIntervalAlertText] = useState(false);
  const dispatch = useDispatch();
  const storeInterval = useSelector(intervalTimeFromStore);

  useEffect(() => {}, [storeInterval]); //? to show actual interval time

  const handleInterval = (e) => {
    e.preventDefault();
    if (!isIntervalAlertText) {
      setIsIntervalAlertText(false);
    }
    //if user doesn't select interval, we show an alert
    if (!intervalTime) {
      setIsIntervalAlertText(true);
      return;
    } else {
      setIsIntervalAlertText(false);
      dispatch(setInterval(intervalTime));
      setIntervalTime(null);
    }
  };

  return (
    <section
      className={`${styles.interval_section} ${darkMode ? styles.dark : ""}`}
    >
      <form onSubmit={handleInterval}>
        <h6>Update tracking interval:</h6>
        {isIntervalAlertText && (
          <p className={styles.sidebar_interval_alert}>Select interval !</p>
        )}
        <span
          className={`${styles.interval_value_span} ${
            darkMode ? styles.dark : ""
          }`}
        >
          {storeInterval}
        </span>
        <input
          type="number"
          name="interval"
          min={1}
          max={50}
          step={1}
          value={intervalTime !== null ? intervalTime : ""}
          onChange={(e) => setIntervalTime(parseInt(e.target.value, 10))}
        />

        <input type="submit" value=" Set " onClick={handleInterval} />
      </form>
    </section>
  );
};

export default IntervalSection;
