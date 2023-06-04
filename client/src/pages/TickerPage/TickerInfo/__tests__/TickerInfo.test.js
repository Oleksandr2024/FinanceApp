import { render, screen } from "@testing-library/react";
import TickerInfo from "../TickerInfo";
import {
  getNameFromAbbreviation,
  getInfoAboutCompany,
} from "../../../../utils/tools";

describe("TickerInfo", () => {
  test("renders ticker name and company description correctly", () => {
    const ticker = "AAPL";
    const tickerName = getNameFromAbbreviation(ticker);
    const companyDescription = getInfoAboutCompany(ticker);

    render(<TickerInfo ticker={ticker} />);

    expect(screen.getByTestId("ticker-info")).toBeInTheDocument();
    expect(screen.getByText(tickerName)).toBeInTheDocument();
    expect(screen.getByText(companyDescription)).toBeInTheDocument();
  });
});
