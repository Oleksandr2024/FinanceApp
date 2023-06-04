import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../../store/toolSlice";
import ThemeComponent from "../ThemeComponent";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("ThemeComponent", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  test("renders the ThemeComponent", () => {
    render(<ThemeComponent />);

    // Assert that the "Light" text is rendered
    const lightText = screen.getByText(/light/i);
    expect(lightText).toBeInTheDocument();

    // Assert that the "Dark" text is rendered
    const darkText = screen.getByText(/dark/i);
    expect(darkText).toBeInTheDocument();

    // Assert that the toggle circle is rendered
    const toggleCircle = screen.getByTestId("toggle-circle");
    expect(toggleCircle).toBeInTheDocument();
  });

  test("dispatches toggleTheme action when the toggle slider is clicked", () => {
    render(<ThemeComponent />);

    // Simulate a click event on the toggle slider
    const toggleSlider = screen.getByTestId("toggle-slider");
    fireEvent.click(toggleSlider);

    // Assert that the toggleTheme action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(toggleTheme());
  });

  test('applies the "dark" class when darkMode prop is true', () => {
    render(<ThemeComponent darkMode={true} />);

    // Assert that the "dark" class is applied to the "light" text
    const lightText = screen.getByText(/light/i);
    expect(lightText).toHaveClass("dark");

    // Assert that the "dark" class is applied to the toggle slider
    const toggleSlider = screen.getByTestId("toggle-slider");
    expect(toggleSlider).toHaveClass("dark");

    // Assert that the "dark" class is applied to the toggle circle
    const toggleCircle = screen.getByTestId("toggle-circle");
    expect(toggleCircle).toHaveClass("dark");

    // Assert that the "dark" class is applied to the "dark" text
    const darkText = screen.getByText(/dark/i);
    expect(darkText).toHaveClass("dark");
  });
});
