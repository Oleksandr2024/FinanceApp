import { useSelector } from "react-redux";
import { selectTheme } from "../../store/toolSlice";
import styles from "./AboutPage.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";

const AboutPage = () => {
  const darkMode = useSelector(selectTheme);

  // array to define first, second section to "show" state
  const [showContent, setShowContent] = useState([false, false]);

  // the same for 3rd, 4th sections position[0] => section, [1] - "show" state
  const [show3rdSection, setShow3rdSection] = useState([3, false]);
  const [show4thSection, setShow4thSection] = useState([4, false]);

  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const handleScroll = useCallback((thisSection) => {
    if (!thisSection[1]) {
      requestAnimationFrame(() => {
        const section =
          thisSection[0] === 3 ? section3Ref.current : section4Ref.current;
        if (!section) return;

        const { top, height } = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const sectionTop = top + window.pageYOffset;
        const sectionBottom = sectionTop + height;
        const visibleThreshold = windowHeight * 0.8;

        if (
          sectionBottom - visibleThreshold <=
          window.pageYOffset + windowHeight
        ) {
          thisSection[0] === 3
            ? setShow3rdSection((prev) => [prev[0], true])
            : setShow4thSection((prev) => [prev[0], true]);
        }
      });
    }
    if (thisSection[1]) return;
  }, []);

  //effect for first section
  useEffect(() => {
    const firstSection = setTimeout(() => {
      setShowContent((prev) => [true, ...prev]);
    }, 500);
    return () => {
      clearTimeout(firstSection);
    };
  }, []);

  //effect for second section
  useEffect(() => {
    const secondSection = setTimeout(() => {
      setShowContent((prev) => [true, true, ...prev]);
    }, 2000);
    return () => {
      clearTimeout(secondSection);
    };
  }, []);

  //effect for third section
  useEffect(() => {
    const listener = () => handleScroll(show3rdSection);
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [handleScroll, show3rdSection]);

  //effect for fourth section
  useEffect(() => {
    const listener = () => handleScroll(show4thSection);
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [handleScroll, show4thSection]);

  return (
    <div className={clsx(styles.about_page, { [styles.dark]: darkMode })}>
      <h1>About This App</h1>

      <section
        className={clsx(styles.content_section, {
          [styles.show]: showContent[0],
        })}
      >
        <h2>Overview</h2>
        <p>
          This "Finance App" was built with the purpose of completing a
          technical test for a leading tech company. The primary objective of
          the app is to generate tickers on the server-side, populate them with
          relevant data based on the app's data structure, transmit them to the
          client-side, and display them in an intuitive user interface.
        </p>
        <p>
          One of the app's key features is its real-time visualization and data
          update capability, achieved using the "socket.io" library. Users can
          observe the stock data and information in real time, making it highly
          valuable for real stock-tracking applications.
        </p>
        <p>
          Another noteworthy feature is the integration of Redux-Toolkit as the
          state manager, ensuring efficient handling of the app's state and data
          flow.
        </p>
        <p>
          Additionally, the app incorporates visually appealing effects, such as
          the use of a carousel to display ticker items, enhancing the overall
          user experience. The app offers a user-friendly interface, designed
          with ease of navigation and comprehension. It includes a dedicated
          ticker page featuring live data charts, enabling seamless tracking and
          analysis of ticker information. To cater to users from Ukraine, the
          app supports the national currency "UAH" and provides automatic
          conversion based on the current currency exchange rate provided by a
          specific API. The app can also be easily extended to include other
          currencies as per the customer's requirements.
        </p>
      </section>

      <section
        className={clsx(styles.content_section, {
          [styles.show]: showContent[1],
        })}
      >
        <h2>App Features</h2>
        <ul>
          <li>
            <u>Real-time Ticker Updates:</u> The app provides real-time updates
            of ticker data, ensuring users have access to the most current
            information on stock prices, changes, and other relevant data.
          </li>

          <li>
            <u>Interactive Data Visualization:</u> Users can visualize ticker
            data through interactive charts and graphs, allowing for better
            analysis and understanding of stock trends and patterns.
          </li>

          <li>
            <u>Customizable Watchlists:</u> The app enables users to create
            personalized watchlists, allowing them to track and monitor specific
            stocks of interest. User preferences are saved to the Local Storage,
            ensuring that the watchlist remains accessible even after socket
            connection is disconnected.
          </li>

          <li>
            <u>News and Insights:</u> Integrated news feeds and market insights
            provide users with valuable information and analysis on market
            trends, company announcements, and other relevant news affecting
            stock prices.
          </li>

          <li>
            <u>Responsive Design:</u> The app is designed to be responsive and
            optimized for various devices, including desktops, tablets, and
            mobile phones, ensuring a seamless user experience across different
            platforms.
          </li>

          <li>
            <u>Light-Dark Mode:</u> The app offers a light-dark mode feature,
            allowing users to switch between different visual themes based on
            their preferences and lighting conditions. Users can easily toggle
            between the two modes to customize their viewing experience and
            enhance usability.
          </li>
          <li>
            <u>Multi-Currency Support:</u> The app provides support for multiple
            currencies, including the national currency of Ukraine "UAH" and the
            United States dollar "USD". Users have the flexibility to switch
            between these currencies, allowing them to view stock prices,
            changes, and other financial data in their preferred currency.
          </li>
          <li>
            <u> Integration with Real Currency Exchange API:</u> By connecting
            the app to a real currency exchange API, users can track tickers
            with real-time currency exchange rates. This addition would provide
            more accurate and up-to-date information.
          </li>
        </ul>
      </section>

      <section
        ref={section3Ref}
        className={clsx(styles.content_section, {
          [styles.show]: show3rdSection[1],
        })}
      >
        <h2>Key Technologies and Development Practices</h2>
        <ul>
          <li>
            <u>React:</u> The app is built using the React framework, taking
            advantage of its component-based architecture and declarative nature
            to create a dynamic and interactive user interface.
          </li>

          <li>
            <u>Redux-Toolkit:</u> Redux-Toolkit is used as the state management
            library, providing a convenient and efficient way to manage the
            app's state, handle data flow, and ensure a consistent user
            experience throughout the application.
          </li>

          <li>
            <u>Socket.io:</u> The app utilizes the Socket.io library to
            establish real-time communication between the server and client,
            enabling the seamless updating and visualization of stock data. This
            enhances the user experience by providing live data updates without
            the need for manual refreshing.
          </li>

          <li>
            <u>Responsive Design:</u> The app follows responsive design
            principles, ensuring that it is accessible and optimized for various
            devices and screen sizes. It provides a consistent and user-friendly
            experience across desktop, tablet, and mobile devices.
          </li>

          <li>
            <u>CSS Modules:</u> CSS Modules are employed to encapsulate styles
            and prevent class name clashes, offering a modular and maintainable
            approach to styling components. This enhances code readability,
            reusability, and avoids potential conflicts in larger codebases.
          </li>

          <li>
            <u>Testing:</u> The app incorporates testing methodologies, such as
            unit testing and integration testing, to ensure the reliability and
            stability of its features. Testing frameworks like Jest and React
            Testing Library have been used to write and execute tests.
          </li>

          <li>
            <u>Code Quality:</u> The effort was made on adhere to best coding
            practices, including writing clean, modular, understandable and
            maintainable code. It is far not perfect for now, but I believe that
            the bigger amount of experience developer gain, the cleaner his code
            becomes. The app was developed with linting tool ESLint and code
            formatter Prettier to ensure consistency. Additionally, some inline
            comments were provided to enhance code readability and facilitate
            future maintenance.
          </li>

          <li>
            <u>Browser Router:</u> The app utilizes the React Router's Browser
            Router to enable smooth client-side routing, providing users with a
            seamless navigation experience within the application.
          </li>

          <li>
            <u>Node.js (Express):</u> The server-side of the app is built with
            Node.js and the Express framework, allowing for efficient handling
            of server requests and customization to meet the specific needs of
            the application.
          </li>

          <li>
            <u>Nodemon:</u> During the development process, Nodemon was employed
            to enhance productivity by automatically restarting the server
            whenever changes were made to the server-side code, ensuring a
            smooth and streamlined development experience.
          </li>
        </ul>
      </section>

      <section
        ref={section4Ref}
        className={clsx(styles.content_section, {
          [styles.show]: show4thSection[1],
        })}
      >
        <h2>Potential Future Improvements</h2>
        <p>
          In the future, there are several exciting enhancements that can be
          implemented in the app to further elevate the user experience and
          functionality. While these features may extend beyond the scope of the
          current test task, I found myself deeply intrigued and passionate
          about their implementation during the development process. These
          envisioned additions hold great potential to enrich the app's
          capabilities and provide users with an even more immersive and
          comprehensive stock-tracking experience. So, these ideas are:
        </p>
        <br></br>
        <ul>
          <li>
            🔥<u> User Authorization and Account Management:</u> Introducing
            user authorization functionality would enable users to create
            accounts, save preferences, and personalize their experience. This
            feature would allow users to track their watched tickers and
            maintain a history of their activities within the app.
          </li>

          <li>
            🔥<u> User Wallet and Trading Capabilities:</u> Implementing a user
            wallet system would empower users to buy and sell tickers within the
            app. Users can monitor their portfolio, track profits and losses,
            and review the performance of their investments. This feature would
            provide a comprehensive trading experience within the app.
          </li>

          <li>
            🔥<u> Automated Buy-Sell Options:</u> Offering automated buy-sell
            options based on predefined criteria would allow users to set
            desired price thresholds for specific tickers. When the ticker
            reaches the desired price, the app can automatically execute the buy
            or sell order, saving time and effort for users.
          </li>

          <li>
            🔥<u> Advanced Search and Filtering:</u> Enhancing the search
            functionality with advanced filters based on criteria such as
            industry, market capitalization, or price range would enable users
            to quickly find specific stocks of interest. This feature would
            streamline the stock discovery process and provide a more tailored
            experience. For these needs we generally need to expand list of our
            ticker options.
          </li>

          <li>
            🔥<u> Enhanced Charting Capabilities:</u> Expanding the charting
            feature to support different time measures, such as day, week,
            month, or year, would provide users with a comprehensive view of the
            ticker's historical data. This enhancement would enable users to
            analyze trends and patterns over different timeframes for better
            decision-making.
          </li>

          <li>
            🔥<u> Performance Optimization:</u> Continual optimization of the
            app's performance would ensure smooth and responsive user
            interactions, even with large datasets or complex operations.
            Implementing performance enhancements would contribute to an overall
            seamless user experience.
          </li>

          <li>
            🔥<u> Increased Testing Coverage:</u> To ensure robustness and
            reliability, expanding the testing coverage for various components
            of the app would be beneficial. Comprehensive testing methodologies,
            including unit tests, integration tests, and end-to-end tests, can
            be employed to identify and address any potential issues or bugs.
          </li>

          <li>
            🔥<u> Migrate the codebase from JavaScript to TypeScript.</u> By
            doing that, we can leverage powerful type system to catch errors
            during development, improve code documentation, and enable better
            IDE support. This transition will not only enhance the overall code
            quality but also pave the way for future scalability and
            extensibility.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
