import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import store from "../../../../store/store";
import { selectAllTickers } from "../../../../store/dataSlice";
import { getImageSource } from "../../../../utils/tools";
import { Link } from "react-router-dom";
import styles from "./BannerCarousel.module.css";
import { selectCurrency } from "../../../../store/toolSlice";

const getLatestGeneratedTickers = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe(() => {
      const tickers = store.getState().data.tickers;
      if (tickers !== undefined) {
        resolve(tickers[tickers.length - 1]);
        unsubscribe();
      }
    });
  });
};

const BannerCarousel = () => {
  const tickers = useSelector(selectAllTickers);
  const currency = useSelector(selectCurrency);

  const [temporaryTickers, setTemporaryTickers] = useState([]);

  // const getLatestGeneratedTickers = async () => {
  //   return new Promise((resolve, reject) => {
  //     const unsubscribe = store.subscribe(() => {
  //       const tickers = store.getState().data.tickers;
  //       if (tickers !== undefined) {
  //         resolve(tickers[tickers.length - 1]);
  //         unsubscribe();
  //       }
  //     });
  //   });
  // };

  const getLatestGeneratedTickersCallback = useCallback(
    getLatestGeneratedTickers,
    []
  );

  useEffect(() => {
    console.log("effect worked");
    const fetchLatestTickers = async () => {
      const latestTickersPromise = getLatestGeneratedTickersCallback();
      const latestTickers = await latestTickersPromise;
      setTemporaryTickers(latestTickers);
    };
    fetchLatestTickers();
  }, [tickers, getLatestGeneratedTickersCallback]);

  let lastTickers;
  if (temporaryTickers[0] !== undefined) {
    lastTickers = temporaryTickers.map((ticker) => {
      return (
        <Link
          data-testid="carousel-item"
          className={styles.carousel_item}
          to={"/tickers/" + ticker.ticker.toString().toLowerCase()}
        >
          <img
            src={getImageSource(ticker.ticker)}
            alt={ticker.ticker}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span className={styles.carousel_item_ticker}>{ticker.ticker}</span>

          <span
            className={styles.carousel_item_change_persent}
            style={{
              color: ticker.change_percent >= 0 ? "limegreen" : "red",
              paddingTop: 10,
              paddingBottom: 5,
              fontSize: "100%",
            }}
          >
            {ticker?.change_percent}%
          </span>
          <span className={styles.carousel_item_open_price}>
            {currency === "USD"
              ? ticker.price.open_price
              : (ticker.price.open_price * 37).toFixed(0)}
          </span>
        </Link>
      );
    });
  }

  const responsive = {
    300: {
      items: 2,
    },
    512: {
      items: 3,
    },
    900: {
      items: 5,
    },
  };

  return (
    <div className={styles.carousel} data-testid="banner-carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={700}
        animationDuration={2000}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={lastTickers}
      />
    </div>
  );
};

export default BannerCarousel;
