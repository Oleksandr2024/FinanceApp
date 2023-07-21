import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "./store/toolSlice";
import clsx from "clsx";
//components
import Layout from "./layouts/Layout";
import TickerPage from "./pages/TickerPage/TickerPage";
import HomePage from "./pages/HomePage/HomePage";
import styles from "./App.module.css";
import NotFound from "./pages/NotFoundPage/NotFound";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  const darkMode = useSelector(selectTheme);

  return (
    <BrowserRouter>
      <div className={clsx(styles.App, { [styles.dark]: darkMode })}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tickers/:id" element={<TickerPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
