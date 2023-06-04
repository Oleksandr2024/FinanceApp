import { render, screen, fireEvent } from "@testing-library/react";
import IntervalSection from "../IntervalSection";
import { Provider } from "react-redux";
import store from "../../../../../../store/store";

describe("IntervalSection", () => {
  test("renders IntervalSection component correctly", () => {
    render(
      <Provider store={store}>
        <IntervalSection />
      </Provider>
    );

    // Check if the component renders without errors
    const trackingIntervalText = screen.getByText(/update tracking interval:/i);
    expect(trackingIntervalText).toBeInTheDocument();

    // Check if the initial interval value is displayed
    const intervalValue = screen.getByText("5");
    expect(intervalValue).toBeInTheDocument();

    // Check if the interval input is rendered
    const intervalInput = screen.getByRole("spinbutton", { name: "" });
    expect(intervalInput).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByRole("button", { name: "Set" });
    expect(submitButton).toBeInTheDocument();
  });

  test("handles interval submission correctly", () => {
    render(
      <Provider store={store}>
        <IntervalSection />
      </Provider>
    );

    // Select an interval value
    const intervalInput = screen.getByRole("spinbutton", { name: "" });
    fireEvent.change(intervalInput, { target: { value: "3" } });

    // Click the submit button
    const submitButton = screen.getByRole("button", { name: "Set" });
    fireEvent.click(submitButton);

    // Check if the interval value is updated
    const intervalValue = screen.getByText("3");
    expect(intervalValue).toBeInTheDocument();
  });

  test("shows alert when interval is not selected", () => {
    render(
      <Provider store={store}>
        <IntervalSection darkMode={false} isConnectedState={true} />
      </Provider>
    );

    // Click the submit button without selecting an interval
    const submitButton = screen.getByRole("button", { name: "Set" });
    fireEvent.click(submitButton);

    // Check if the alert text is displayed
    const alertText = screen.queryByText(/select interval !/i);
    expect(alertText).toBeVisible();
    expect(alertText).toBeInTheDocument();
  });
});
