import { useSelector } from "react-redux";
import { selectTheme } from "../../store/toolSlice";
import styles from "./Header.module.css";
import clsx from "clsx";
//components
import CurrencyComponent from "./CurrencyComponent/CurrencyComponent";
import Navbar from "./Navbar/Navbar";
import ThemeComponent from "./ThemeComponent/ThemeComponent";

const Header = () => {
  const darkMode = useSelector(selectTheme);

  return (
    <div
      data-testid="header"
      className={clsx(styles.header, { [styles.dark]: darkMode })}
    >
      <Navbar darkMode={darkMode} />
      <CurrencyComponent darkMode={darkMode} />
      <ThemeComponent darkMode={darkMode} />
    </div>
  );
};

export default Header;
