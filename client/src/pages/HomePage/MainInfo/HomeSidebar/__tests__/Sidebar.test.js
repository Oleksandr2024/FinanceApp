import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../../store/store";
import Sidebar from "../Sidebar";

describe("Sidebar", () => {
  test("renders Sidebar component correctly with starting news section", () => {
    render(
      <Provider store={store}>
        <Sidebar shouldShowTickers={false} />
      </Provider>
    );

    //At the starting point of our App, we need to see button with the text "Show tickers"
    const showButton = screen.getByText(/show tickers/i);
    expect(showButton).toBeInTheDocument();

    //If the tickers are not being shown, this text must be hided
    const watchingGroupText = screen.queryByText(/your watching group:/i);
    expect(watchingGroupText).toBeNull();
  });

  test("renders Sidebar component correctly with tracking tickers condition", () => {
    render(
      <Provider store={store}>
        <Sidebar shouldShowTickers={true} />
      </Provider>
    );

    const watchingGroupText = screen.getByText(/your watching group:/i);
    expect(watchingGroupText).toBeInTheDocument();

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const addButton = screen.getByText("Add");
    expect(addButton).toBeInTheDocument();

    const trackingIntervalText = screen.getByText(/update tracking interval:/i);
    expect(trackingIntervalText).toBeInTheDocument();

    //Alerts are not visible without "wrong" user's interaction
    const alertText = screen.queryByText(/start tracking tickers!/i);
    expect(alertText).toBeNull();

    const alertText1 = screen.queryByText(/choose ticker/i);
    expect(alertText1).toBeNull();

    const alertText2 = screen.queryByText(/item already added/i);
    expect(alertText2).toBeNull();
  });

  test("handles addTicker functionality correctly", () => {
    render(
      <Provider store={store}>
        <Sidebar shouldShowTickers={true} />
      </Provider>
    );

    const selectElement = screen.getByRole("combobox");
    const addButton = screen.getByText("Add");

    // Select the "empty" option and click "Add" button
    fireEvent.change(selectElement, { target: { value: "" } });
    fireEvent.click(addButton);

    // Assert that the "Choose ticker" alert text is displayed
    const alertText = screen.queryByTestId("alert-text");
    expect(alertText).toBeVisible();
    expect(alertText).toHaveTextContent(/choose ticker/i);

    // Select an already added ticker and click "Add" button
    fireEvent.change(selectElement, { target: { value: "**AAPL**" } });
    fireEvent.click(addButton);

    // Assert that the "Item already added" alert text is displayed
    expect(alertText).toBeVisible();
    expect(alertText).toHaveTextContent(/item already added/i);
  });

  //------------integration test (with smallTicker component)-----------------------

  test("handles remove and add functionality correctly", () => {
    render(
      <Provider store={store}>
        <Sidebar shouldShowTickers={true} />
      </Provider>
    );

    // Assert that the ticker is added to the watching group
    const tickerElement = screen.getAllByText("**AAPL**"); //[<option value="**AAPL**">**AAPL**</option>, <h4>**AAPL**</h4>]
    expect(tickerElement[1]).toBeInTheDocument();

    // Simulate user interaction: Remove the ticker
    const removeButton = screen.getAllByTestId("remove-button");
    fireEvent.click(removeButton[0]);

    // Assert that the ticker is removed from the watching group, so it was replaced with **GOOGL**
    expect(tickerElement[1]).toHaveTextContent(/googl/i);

    // Simulate user interaction: Add the ticker again
    const selectElement = screen.getByRole("combobox");
    const addButton = screen.getByText("Add");
    fireEvent.change(selectElement, { target: { value: "**AAPL**" } });
    fireEvent.click(addButton);

    // Assert that the ticker is added to the watching group
    const appleTickerElements = screen.getAllByText("**AAPL**"); //[<option value="**AAPL**">**AAPL**</option>, <h4>**AAPL**</h4>]

    expect(appleTickerElements[1]).toHaveTextContent(/aapl/i);
  });
});
