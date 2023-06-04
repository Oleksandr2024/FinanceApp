import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../store/toolSlice";
import styles from "./ThemeComponent.module.css";

const ThemeComponent = ({ darkMode }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.toggler}>
      <p className={`${styles.toggler_light} ${darkMode ? styles.dark : ""}`}>
        Light
      </p>
      <div
        className={`${styles.toggler_slider} ${darkMode ? styles.dark : ""}`}
        onClick={() => dispatch(toggleTheme())}
        data-testid="toggle-slider"
      >
        <div
          data-testid="toggle-circle"
          className={`${styles.toggler_slider_circle} ${
            darkMode ? styles.dark : ""
          }`}
        ></div>
      </div>
      <p className={`${styles.toggler_dark} ${darkMode ? styles.dark : ""}`}>
        Dark
      </p>
    </div>
  );
};

export default ThemeComponent;
