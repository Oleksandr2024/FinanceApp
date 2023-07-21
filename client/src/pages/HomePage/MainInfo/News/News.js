import { NavLink } from "react-router-dom";
import styles from "./News.module.css";
import clsx from "clsx";

const News = ({ darkMode }) => {
  return (
    <div
      data-testid="news"
      className={clsx(styles.news, { [styles.dark]: darkMode })}
    >
      <h1>News</h1>
      <section className={styles.news_section}>
        <NavLink
          to={
            "https://www.marketwatch.com/story/tesla-stock-jumps-3-premarket-as-wedbush-says-musk-visit-to-china-comes-at-key-time-for-company-95434dd6"
          }
          target="_blank"
        >
          <div
            className={clsx(styles.news_section_div_1, {
              [styles.dark]: darkMode,
            })}
          >
            <h4>MarketWatch</h4>
            <i>8 hours ago</i>
          </div>
          <div
            className={clsx(styles.news_section_div_2, {
              [styles.dark]: darkMode,
            })}
          >
            <p>
              <strong>Tesla's</strong> stock jumps 4% as Elon Musk makes first
              visit to China in about three years
            </p>
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR8RD5Veia5V6sUPWy6olApCN_c-BpijTzp_oRqEwolcv5bxcjVQv22UAy1yag"
              alt="Tesla news img"
            />
          </div>
        </NavLink>
      </section>

      <section className={styles.news_section}>
        <NavLink
          to={
            "https://www.bloomberg.com/news/videos/2023-05-26/-bloomberg-surveillance-simulcast-05-26-23"
          }
          target="_blank"
        >
          <div
            className={clsx(styles.news_section_div_1, {
              [styles.dark]: darkMode,
            })}
          >
            <h4>Bloomberg.com</h4>
            <i>1 day ago</i>
          </div>
          <div
            className={clsx(styles.news_section_div_2, {
              [styles.dark]: darkMode,
            })}
          >
            <p>
              AI Could Add $30-$40 per Share to <strong>Apple's</strong> Story:
              Ives
            </p>
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQXkH4A4JBR8vIy3ilEZrrroZLdx-eemas3VLiR4wi7PpSsiEc_fbRxETNcZVo"
              alt="Apple pic"
            />
          </div>
        </NavLink>
      </section>

      <section className={styles.news_section}>
        <NavLink
          to={
            "https://www.marketwatch.com/data-news/meta-platforms-inc-stock-rises-tuesday-still-underperforms-market-5fa6e09c-410e125fbfe9"
          }
          target="_blank"
        >
          <div
            className={clsx(styles.news_section_div_1, {
              [styles.dark]: darkMode,
            })}
          >
            <h4>Business Insider</h4>
            <i>1 hour ago</i>
          </div>
          <div
            className={clsx(styles.news_section_div_2, {
              [styles.dark]: darkMode,
            })}
          >
            <p>
              <strong>Meta</strong> Platforms Inc. stock rises Tuesday, still
              underperforms market
            </p>
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8mb7ghEfXynNYMOuyNuJA6xMW0Hsa2n3Y01TRy7_ho5ri-77O_QI_W9_SfoE"
              alt="Meta stock info"
            />
          </div>
        </NavLink>
      </section>

      <section className={styles.news_section}>
        <NavLink
          to={
            "https://seekingalpha.com/news/3975777-4-stocks-to-watch-on-tuesday-microsoft-ford-and-more"
          }
          target="_blank"
        >
          <div
            className={clsx(styles.news_section_div_1, {
              [styles.dark]: darkMode,
            })}
          >
            <h4>Seeking Alpha</h4>
            <i>2 days ago</i>
          </div>
          <div
            className={clsx(styles.news_section_div_2, {
              [styles.dark]: darkMode,
            })}
          >
            <p>
              4 stocks to watch on Tuesday: <strong>Microsoft</strong>, Ford and
              more (NASDAQ:MSFT)
            </p>
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR6uC1DM19T_3KFNcluPwvtfWX3yi3dDCQjIznrTw-k3C5wfLbb3n7lRij3zus"
              alt="Microsoft pic"
            />
          </div>
        </NavLink>
      </section>

      <section className={styles.news_section}>
        <NavLink
          to={
            "https://www.tipranks.com/news/article/amazon-stock-jumps-43-ytd-more-upside-left-say-analysts"
          }
          target="_blank"
        >
          <div
            className={clsx(styles.news_section_div_1, {
              [styles.dark]: darkMode,
            })}
          >
            <h4>The Motley Fool</h4>
            <i>3 days ago</i>
          </div>
          <div
            className={clsx(styles.news_section_div_2, {
              [styles.dark]: darkMode,
            })}
          >
            <p>
              <strong>Amazon</strong> Stock Jumps 43% YTD; More Upside Left, Say
              Analysts
            </p>
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQXJwitZO1CuLtGsyMGcS12yzVfHJVQoOCn5lK-RkIqZqB1LpECdx6wnmRBo3A"
              alt="AWS pic"
            />
          </div>
        </NavLink>
      </section>
    </div>
  );
};

export default News;
