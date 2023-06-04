import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";

describe("NotFound component", () => {
  test("renders the correct message", () => {
    render(<NotFound />);
    const messageElement = screen.getByText(
      /sorry, but requested page is not found/i
    );
    expect(messageElement).toBeInTheDocument();
  });
});
