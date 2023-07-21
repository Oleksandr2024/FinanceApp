import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../store/toolSlice";
import styles from "./ThemeComponent.module.css";
import clsx from "clsx";

const ThemeComponent = ({ darkMode }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.toggler}>
      <p className={`${styles.toggler_light} ${darkMode ? styles.dark : ""}`}>
        Light
      </p>
      <div
        className={clsx(styles.toggler_slider, {
          [styles.dark]: darkMode,
        })}
        onClick={() => dispatch(toggleTheme())}
        data-testid="toggle-slider"
      >
        <div
          data-testid="toggle-circle"
          className={clsx(styles.toggler_slider_circle, {
            [styles.dark]: darkMode,
          })}
        ></div>
      </div>
      <p
        className={clsx(styles.toggler_dark, {
          [styles.dark]: darkMode,
        })}
      >
        Dark
      </p>
    </div>
  );
};

export default ThemeComponent;
