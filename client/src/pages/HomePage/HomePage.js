import { useSelector } from "react-redux";
import { showTickers } from "../../store/toolSlice";
import styles from "./HomePage.module.css";
//components
import Banner from "../HomePage/Banner/Banner";
import MainInfo from "../HomePage/MainInfo/MainInfo";

const HomePage = () => {
  const shouldShowTickers = useSelector(showTickers);

  return (
    <div data-testid="homepage" className={styles.home_page}>
      <Banner shouldShowTickers={shouldShowTickers} />
      <MainInfo shouldShowTickers={shouldShowTickers} />
    </div>
  );
};

export default HomePage;
