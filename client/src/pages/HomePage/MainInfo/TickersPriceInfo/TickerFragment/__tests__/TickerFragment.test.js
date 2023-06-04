import { render, screen } from "@testing-library/react";
import TickerFragment from "../TickerFragment";
import { BrowserRouter } from "react-router-dom";

describe("TickerFragment", () => {
  test("displays the ticker symbol", () => {
    const ticker = {
      ticker: "AAPL",
      exchange: "NASDAQ",
      price: {
        open_price: "300.06",
        high_price: "326.38",
        low_price: "294.64",
        close_price: "307.03",
      },
      change: "6.97",
      change_percent: "2.32",
      dividend: "0.95",
      yield: "0.84",
      last_trade_time: "2023-05-30T18:38:36.000Z",
    };

    render(
      <BrowserRouter>
        <TickerFragment ticker={ticker} />
      </BrowserRouter>
    );

    const tickerSymbolElement = screen.getByText(ticker.ticker);
    expect(tickerSymbolElement).toBeInTheDocument();
  });

  test("displays the full name of the ticker", () => {
    render(
      <BrowserRouter>
        <TickerFragment
          ticker={{
            ticker: "AAPL",
            exchange: "NASDAQ",
            price: {
              open_price: "300.06",
              high_price: "326.38",
              low_price: "294.64",
              close_price: "307.03",
            },
            change: "6.97",
            change_percent: "2.32",
            dividend: "0.95",
            yield: "0.84",
            last_trade_time: "2023-05-30T18:38:36.000Z",
          }}
        />
      </BrowserRouter>
    );

    const fullNameElement = screen.getByText(/Apple/i);
    expect(fullNameElement).toBeInTheDocument();
  });

  test("displays the ticker price", () => {
    render(
      <BrowserRouter>
        <TickerFragment
          ticker={{
            ticker: "AAPL",
            exchange: "NASDAQ",
            price: {
              open_price: "300.06",
              high_price: "326.38",
              low_price: "294.64",
              close_price: "307.03",
            },
            change: "6.97",
            change_percent: "2.32",
            dividend: "0.95",
            yield: "0.84",
            last_trade_time: "2023-05-30T18:38:36.000Z",
          }}
          currency="USD"
        />
      </BrowserRouter>
    );

    const tickerPriceElement = screen.getByText("300.06");
    expect(tickerPriceElement).toBeInTheDocument();
  });

  test("displays the ticker change price", () => {
    render(
      <BrowserRouter>
        <TickerFragment
          ticker={{
            ticker: "AAPL",
            exchange: "NASDAQ",
            price: {
              open_price: "300.06",
              high_price: "326.38",
              low_price: "294.64",
              close_price: "307.03",
            },
            change: "6.97",
            change_percent: "2.32",
            dividend: "0.95",
            yield: "0.84",
            last_trade_time: "2023-05-30T18:38:36.000Z",
          }}
          currency="USD"
        />
      </BrowserRouter>
    );

    const tickerChangePriceElement = screen.getByText("6.97");
    expect(tickerChangePriceElement).toBeInTheDocument();
  });
});
