import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../Navbar";

describe("Navbar", () => {
  test("renders the Navbar component", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // assert that the "Home" link is rendered
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    // assert that the "About" link is rendered
    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  test('applies the "dark" class when darkMode prop is true', () => {
    render(
      <Router>
        <Navbar darkMode={true} />
      </Router>
    );

    // assert that the "dark" class is applied to the nav element
    const navElement = screen.getByRole("navigation");
    expect(navElement).toHaveClass("dark");
  });
});
