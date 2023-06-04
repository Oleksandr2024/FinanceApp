import { render, screen } from "@testing-library/react";
import TickersPriceInfo from "../TickersPriceInfo";
import { Provider } from "react-redux";
import store from "../../../../../store/store";

describe("TickersPriceInfo", () => {
  test("renders the component", () => {
    render(
      <Provider store={store}>
        <TickersPriceInfo />
      </Provider>
    );

    const tickersPriceInfoElement = screen.getByTestId("tickers-price-info");
    expect(tickersPriceInfoElement).toBeInTheDocument();
  });

  test("displays 'Loading...' when tickers are not available", () => {
    render(
      <Provider store={store}>
        <TickersPriceInfo />
      </Provider>
    );
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });
});
