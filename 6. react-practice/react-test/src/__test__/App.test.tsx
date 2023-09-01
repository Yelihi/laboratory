import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

describe("App Counter", () => {
  it("렌더링 확인", () => {
    render(<App />);
    const paragraph = screen.getByTestId("paragraph");
    expect(paragraph).toBeInTheDocument();
  });

  it("counter 버튼을 클릭하면 1이 증가하여 화면에 출력된다.", () => {
    render(<App />);
    const button = screen.getByRole("button");
    const paragraph = screen.getByTestId("paragraph");

    fireEvent.click(button);

    expect(paragraph).toHaveTextContent("You Clicked 1 times");
  });
});
