import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(), // Mock the useDispatch function
}));

describe("Header", () => {
  test("renders header component with dark mode", () => {
    useSelector.mockReturnValue(true); // Mock the value of `darkMode` from the store because we have useSelector
    useDispatch.mockReturnValue(jest.fn());

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toHaveClass("dark");
  });

  test("renders header component without dark mode", () => {
    useSelector.mockReturnValue(false); //false here =>
    useDispatch.mockReturnValue(jest.fn());

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const headerElement = screen.getByTestId("header");
    expect(headerElement).not.toHaveClass("dark");
  });
});
