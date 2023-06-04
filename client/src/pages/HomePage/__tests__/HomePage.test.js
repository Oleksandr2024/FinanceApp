import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import { Provider } from "react-redux";
import store from "../../../store/store";

describe("HomePage", () => {
  test("renders correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const homePage = screen.getByTestId("homepage");
    expect(homePage).toBeInTheDocument();
  });

  test("renders Banner and MainInfo components", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    const bannerElement = screen.getByTestId("banner");
    const mainInfoElement = screen.getByTestId("main-info");

    expect(bannerElement).toBeInTheDocument();
    expect(mainInfoElement).toBeInTheDocument();
  });
});
