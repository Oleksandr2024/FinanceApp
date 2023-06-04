import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/store"; //
import App from "./App";

describe("App", () => {
  test("renders without errors", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("renders the homepage by default", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("homepage")).toBeInTheDocument();
  });
});
