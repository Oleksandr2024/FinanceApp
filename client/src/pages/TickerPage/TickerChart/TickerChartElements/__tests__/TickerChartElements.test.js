import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TickerChartElements from "../TickerChartElements";

describe("TickerChartElements", () => {
  test("renders component correctly", () => {
    render(
      <BrowserRouter>
        <TickerChartElements
          changePercent={10}
          price={100}
          change={20}
          currency="USD"
        />
      </BrowserRouter>
    );

    // Check if the "Go back to list" link is present
    expect(screen.getByText(/go back to list/i)).toBeInTheDocument();

    // Check if the price is rendered correctly
    expect(screen.getByText("$ 100")).toBeInTheDocument();

    // Check if the change percent is rendered correctly
    expect(screen.getByText("10% 📉")).toBeInTheDocument();

    // Check if the change is rendered correctly
    const changeElement = screen.queryByText(/change:\s*\$\s*20/i);
    expect(changeElement).toBeInTheDocument();

    // Check if the chart date is rendered correctly
    const date = new Date();
    const currentDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    expect(
      screen.getByText(`${currentDate} UTC-2 USD NASDAQ`)
    ).toBeInTheDocument();
  });

  test("renders 'loading' text two times when tickers in not tracking", () => {
    render(
      <BrowserRouter>
        <TickerChartElements change={null} currency="USD" />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/loading/i)).toHaveLength(2);
  });

  test("shows text 'to start again' if ticker tracking is off", () => {
    render(
      <BrowserRouter>
        <TickerChartElements price={null} currency="USD" />
      </BrowserRouter>
    );

    // Check if the "Start tracking tickers again!" link is present
    expect(
      screen.getByText(/start tracking tickers again!/i)
    ).toBeInTheDocument();
  });
});
