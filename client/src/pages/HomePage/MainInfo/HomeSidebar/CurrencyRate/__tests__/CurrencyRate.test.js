import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import CurrencyRate from "../CurrencyRate";
import { fetchCurrencyRate } from "../currencyApi";
import { setCurrencyRate } from "../../../../../../store/toolSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../currencyApi", () => ({
  fetchCurrencyRate: jest.fn(),
}));

jest.mock("../../../../../../store/toolSlice", () => ({
  setCurrencyRate: jest.fn(),
}));

describe("CurrencyRate", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
  });

  test("renders loading message while fetching rate data", () => {
    render(<CurrencyRate />);
    const loadingMessage = screen.getByText(/loading.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test("renders currency rate data after fetching", async () => {
    const usdToUahRate = 37.5;
    fetchCurrencyRate.mockResolvedValue(usdToUahRate);
    render(<CurrencyRate />);
    const currencyRate = await screen.findByText("1 USD $ = 37.5 UAH ₴");
    expect(currencyRate).toBeInTheDocument();
  });

  test("dispatches setCurrencyRate action after fetching rate", async () => {
    const usdToUahRate = 37.5;
    fetchCurrencyRate.mockResolvedValue(usdToUahRate);
    render(<CurrencyRate darkMode={false} />);
    await screen.findByText("1 USD $ = 37.5 UAH ₴");
    expect(setCurrencyRate).toHaveBeenCalledWith(usdToUahRate);
  });
});
