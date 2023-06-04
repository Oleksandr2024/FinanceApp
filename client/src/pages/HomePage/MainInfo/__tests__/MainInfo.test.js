import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../store/store";
import MainInfo from "../MainInfo";
import { BrowserRouter } from "react-router-dom";

describe("MainInfo", () => {
  test("renders main information correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainInfo shouldShowTickers={true} />
        </BrowserRouter>
      </Provider>
    );

    // here we assert that the text data is rendered correctly
    const text = screen.getByText(/your watching group/i);
    expect(text).toBeInTheDocument();
  });

  test("renders Sidebar and TickersPriceInfo when shouldShowTickers is true", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainInfo shouldShowTickers={true} />
        </BrowserRouter>
      </Provider>
    );

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();

    const tickersPriceInfo = screen.getByTestId("tickers-price-info");
    expect(tickersPriceInfo).toBeInTheDocument();

    const news = screen.queryByTestId("news");
    expect(news).not.toBeInTheDocument();
  });

  test("renders Sidebar and News when shouldShowTickers is false", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainInfo shouldShowTickers={false} />
        </BrowserRouter>
      </Provider>
    );

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();

    const news = screen.getByTestId("news");
    expect(news).toBeInTheDocument();

    const tickersPriceInfo = screen.queryByTestId("tickers-price-info");
    expect(tickersPriceInfo).not.toBeInTheDocument();
  });
});
