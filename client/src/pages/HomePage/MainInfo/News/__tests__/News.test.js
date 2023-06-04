import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import News from "../News";

describe("News", () => {
  test("renders the component properly", () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    const newsElement = screen.getByTestId("news");
    expect(newsElement).toBeInTheDocument();
  });

  test("displays the correct number of news sections according to ticker amount", () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    const newsSections = screen.getAllByRole("heading");
    expect(newsSections).toHaveLength(6);
  });

  test("renders the correct news sources and titles", () => {
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );
    const newsLinks = screen.getAllByRole("link");

    const expectedLinks = [
      {
        source: "MarketWatch",
        title:
          "Tesla's stock jumps 4% as Elon Musk makes first visit to China in about three years",
      },
      {
        source: "Bloomberg.com",
        title: "AI Could Add $30-$40 per Share to Apple's Story: Ives",
      },
      {
        source: "Business Insider",
        title:
          "Meta Platforms Inc. stock rises Tuesday, still underperforms market",
      },
      {
        source: "Seeking Alpha",
        title:
          "4 stocks to watch on Tuesday: Microsoft, Ford and more (NASDAQ:MSFT)",
      },
      {
        source: "The Motley Fool",
        title: "Amazon Stock Jumps 43% YTD; More Upside Left, Say Analysts",
      },
    ];

    expectedLinks.forEach((expectedLink, index) => {
      expect(newsLinks[index].textContent).toContain(expectedLink.source);
      expect(newsLinks[index].textContent).toContain(expectedLink.title);
    });
  });
});
