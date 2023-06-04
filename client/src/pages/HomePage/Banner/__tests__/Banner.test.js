import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../store/store";
import Banner from "../Banner";

describe("Banner", () => {
  test("should render the 'Finance App' text", () => {
    render(
      <Provider store={store}>
        <Banner />
      </Provider>
    );
    const financeAppText = screen.getByText(/finance app/i);
    expect(financeAppText).toBeInTheDocument();
  });

  test("should render the BannerCarousel component when shouldShowTickers is true", () => {
    render(
      <Provider store={store}>
        <Banner shouldShowTickers={true} />
      </Provider>
    );
    const bannerCarousel = screen.getByTestId("banner-carousel");
    expect(bannerCarousel).toBeInTheDocument();
  });

  test("should not render the BannerCarousel component when shouldShowTickers is false", () => {
    render(
      <Provider store={store}>
        <Banner shouldShowTickers={false} />
      </Provider>
    );
    const bannerCarousel = screen.queryByTestId("banner-carousel");
    expect(bannerCarousel).toBeNull();
  });
});
