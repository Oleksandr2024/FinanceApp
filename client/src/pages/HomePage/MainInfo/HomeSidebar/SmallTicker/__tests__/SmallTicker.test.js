import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../../../store/store";
import SmallTicker from "../SmallTicker";

describe("SmallTicker", () => {
  test("component renders correctly", async () => {
    render(
      <Provider store={store}>
        <SmallTicker ticker="**AAPL**" />
        <SmallTicker ticker="**GOOGl**" />
        <SmallTicker ticker="**FB**" />
        <SmallTicker ticker="**MSFT**" />
        <SmallTicker ticker="**AMZN**" />
        <SmallTicker ticker="**TSLA**" />
      </Provider>
    );

    // Assert that the ticker is added to the watching group
    const appleTickerElement = screen.getByText("**AAPL**");
    const googleTickerElement = screen.getByText("**GOOGl**");
    const facebookTickerElement = screen.getByText("**FB**");
    const microsoftTickerElement = screen.getByText("**MSFT**");
    const amazonTickerElement = screen.getByText("**AMZN**");
    const teslaTickerElement = screen.getByText("**TSLA**");

    expect(appleTickerElement).toBeInTheDocument();
    expect(googleTickerElement).toBeInTheDocument();
    expect(facebookTickerElement).toBeInTheDocument();
    expect(microsoftTickerElement).toBeInTheDocument();
    expect(amazonTickerElement).toBeInTheDocument();
    expect(teslaTickerElement).toBeInTheDocument();

    const removeButtons = screen.getAllByTestId("remove-button");
    expect(removeButtons).toHaveLength(6);
  });
});
