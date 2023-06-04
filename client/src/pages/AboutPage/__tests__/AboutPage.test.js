/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import AboutPage from "../AboutPage";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../store/store";

describe("AboutPage", () => {
  test("displays correct section headings", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AboutPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("App Features")).toBeInTheDocument();
    expect(
      screen.getByText("Key Technologies and Development Practices")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Potential Future Improvements")
    ).toBeInTheDocument();
  });

  test("initial state of sections is set correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AboutPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Overview").parentNode).not.toHaveClass("show");
    expect(screen.getByText("App Features").parentNode).not.toHaveClass("show");
    expect(
      screen.getByText("Key Technologies and Development Practices").parentNode
    ).not.toHaveClass("show");
    expect(
      screen.getByText("Potential Future Improvements").parentNode
    ).not.toHaveClass("show");
  });

  test("every section has its className", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AboutPage />
        </BrowserRouter>
      </Provider>
    );

    const firstSection = screen.getByText("Overview").parentNode;
    const secondSection = screen.getByText("App Features").parentNode;
    const thirdSection = screen.getByText(
      "Key Technologies and Development Practices"
    ).parentNode;
    const fourthSection = screen.getByText(
      "Potential Future Improvements"
    ).parentNode;

    expect(firstSection).toHaveClass("content_section");
    expect(secondSection).toHaveClass("content_section");
    expect(thirdSection).toHaveClass("content_section");
    expect(fourthSection).toHaveClass("content_section");
  });
});
