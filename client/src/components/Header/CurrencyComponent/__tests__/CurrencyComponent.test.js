import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import CurrencyComponent from "../CurrencyComponent";
import { toggleCurrency } from "../../../../store/toolSlice";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("CurrencyComponent", () => {
  //setting up currency to USD and clearing before and after each test
  beforeEach(() => {
    useSelector.mockReturnValue("USD");
    useDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  test("renders select dropdown with two currency options properly", () => {
    render(<CurrencyComponent />);
    const selectElement = screen.getByRole("combobox");
    const optionElements = screen.getAllByRole("option"); //returns array of 2 options

    expect(selectElement).toBeInTheDocument();
    expect(optionElements.length).toBe(2);
    expect(optionElements[0]).toHaveValue("USD");
    expect(optionElements[1]).toHaveValue("UAH");
  });

  test("dispatches toggleCurrency action on select change", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(<CurrencyComponent />);
    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "UAH" } }); //change currency to UAH

    expect(mockDispatch).toHaveBeenCalledWith(toggleCurrency());
  });

  test("applies additional 'dark' class to component when darkMode is true", () => {
    render(<CurrencyComponent darkMode={true} />);
    const selectElement = screen.getByRole("combobox");

    expect(selectElement).toHaveClass("dark");
  });

  test("does not apply additional 'dark' class to the component when darkMode is false", () => {
    render(<CurrencyComponent darkMode={false} />);
    const selectElement = screen.getByRole("combobox");

    expect(selectElement).not.toHaveClass("dark");
  });
});
