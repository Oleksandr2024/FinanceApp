import BannerCarousel from "./BannerCarousel/BannerCarousel";
import styles from "./Banner.module.css";

const Banner = ({ shouldShowTickers }) => {
  return (
    <div data-testid="banner" className={styles.banner}>
      <div className={styles.banner_top_space}>Finance App</div>
      {shouldShowTickers && <BannerCarousel />}
    </div>
  );
};

export default Banner;
