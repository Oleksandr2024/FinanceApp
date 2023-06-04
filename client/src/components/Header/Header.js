import { useSelector } from "react-redux";
import { selectTheme } from "../../store/toolSlice";
import styles from "./Header.module.css";
//components
import CurrencyComponent from "./CurrencyComponent/CurrencyComponent";
import Navbar from "./Navbar/Navbar";
import ThemeComponent from "./ThemeComponent/ThemeComponent";

const Header = () => {
  const darkMode = useSelector(selectTheme);

  return (
    <div
      data-testid="header"
      className={`${styles.header} ${darkMode ? styles.dark : ""}`}
    >
      <Navbar darkMode={darkMode} />
      <CurrencyComponent darkMode={darkMode} />
      <ThemeComponent darkMode={darkMode} />
    </div>
  );
};

export default Header;
