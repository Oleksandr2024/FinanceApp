import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import { Provider } from "react-redux";
import store from "../../store/store";

describe("Layout", () => {
  test("renders correctly with header element", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    );

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    //Outlet is a special feature provided by react-router-dom so we can't insert testId there
  });
});
